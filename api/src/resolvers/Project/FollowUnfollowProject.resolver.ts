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
export class FollowUnfollowProjectInput {
    @Field()
    projectId: string;
}

export default class FollowUnfollowProjectResolver {
    @UseMiddleware(isAuthenticated)
    @Mutation(() => String)
    async followProject(
        @Arg("input") { projectId }: FollowUnfollowProjectInput,
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
                    followers: {
                        connect: {
                            id: user.id,
                        },
                    },
                },
            });

            return "Followed project.";
        });
    }

    @UseMiddleware(isAuthenticated)
    @Mutation(() => String)
    async unfollowProject(
        @Arg("input") { projectId }: FollowUnfollowProjectInput,
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
                    followers: {
                        disconnect: {
                            id: user.id,
                        },
                    },
                },
            });

            return "Unfollowed project.";
        });
    }
}
