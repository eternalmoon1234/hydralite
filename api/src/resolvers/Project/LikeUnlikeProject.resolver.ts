import { User } from "@prisma/client";
import { isAuthenticated } from "src/middleware/IsAuthenticated.middleware";
import {
    Arg,
    Ctx,
    Field,
    InputType,
    Mutation,
    UseMiddleware,
} from "type-graphql";
import ContextType from "~/types/Context.type";
import executeOrFail from "~/util/executeOrFail";

@InputType()
export class LikeUnlikeProjectInput {
    @Field()
    projectId: string;
}

export default class LikeUnlikeProjectResolver {
    @UseMiddleware(isAuthenticated)
    @Mutation(() => String)
    async likeProject(
        @Arg("input") { projectId }: LikeUnlikeProjectInput,
        @Ctx() { req, prisma }: ContextType
    ): Promise<string> {
        return executeOrFail(async () => {
            // retrieve the currently logged in user
            const user: User = (req as any).user;

            await prisma.project.update({
                where: {
                    id: projectId,
                },
                data: {
                    likers: {
                        connect: {
                            id: user.id,
                        },
                    },
                },
            });

            return "Liked project.";
        });
    }

    @UseMiddleware(isAuthenticated)
    @Mutation(() => String)
    async unlikeProject(
        @Arg("input") { projectId }: LikeUnlikeProjectInput,
        @Ctx() { req, prisma }: ContextType
    ): Promise<string> {
        return executeOrFail(async () => {
            // retrieve the currently logged in user
            const user: User = (req as any).user;

            await prisma.project.update({
                where: {
                    id: projectId,
                },
                data: {
                    likers: {
                        disconnect: {
                            id: user.id,
                        },
                    },
                },
            });

            return "Unliked project.";
        });
    }
}
