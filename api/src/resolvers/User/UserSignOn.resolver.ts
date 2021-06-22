// dependencies
import { Arg, Ctx, Field, InputType, Mutation, Resolver } from "type-graphql";
import ContextType from "~/types/Context.type";
import DiscordUser from "~/types/DiscordUser.type";
import GithubUser from "~/types/GithubUser.type";
import executeOrFail from "~/util/executeOrFail";
import { fetchDiscordUser, fetchGithubUser } from "~/util/fetchOauthUser";
import { User } from "~/typegql-types/User";
import UserRepo from "~/db/UserRepo";

const userRepo = new UserRepo();

@InputType()
class UserSignOnInput {
    @Field()
    provider: "github" | "twitter" | "discord" | "google";

    @Field()
    accessToken: string;
}

@Resolver()
export default class UserSignOnResolver {
    @Mutation(() => User)
    async userSignOn(
        @Arg("input") input: UserSignOnInput,
        @Ctx() { req, prisma }: ContextType
    ): Promise<User> {
        return executeOrFail(async () => {
            let user;
            let userId;
            let existingUser;
            let savedUser;
            let userCreationFunction: (
                oauthUser: GithubUser | DiscordUser | any
            ) => Promise<User>;

            switch (input.provider) {
                case "github":
                    user = await fetchGithubUser(input.accessToken);
                    userId = user.id;
                    userCreationFunction = userRepo.createGithubUser;
                    break;
                case "discord":
                    user = await fetchDiscordUser(input.accessToken);
                    userId = user.id;
                    userCreationFunction = userRepo.createDiscordUser;
                    break;
                default:
                    throw new Error("Invalid provider.");
            }

            // try to query oauth connections to see if a user exists
            existingUser = (
                await prisma.oauthConnection.findFirst({
                    where: {
                        oauthService: input.provider,
                        oauthServiceUserId: String(userId),
                    },
                    include: {
                        user: true,
                    },
                })
            )?.user;

            console.log(existingUser);

            // user doesnt exist
            if (!existingUser)
                savedUser = await userCreationFunction(user as any);

            console.log(savedUser);

            // set user to return
            const userToReturn = existingUser || savedUser;

            // set session
            (req.session as any).userId = userToReturn!.id;

            return userToReturn;
        }, "Error fetching/creating user.");
    }
}
