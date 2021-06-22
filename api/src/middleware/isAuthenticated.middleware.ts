import { MiddlewareFn } from "type-graphql";
import ContextType from "~/types/Context.type";

export const isAuthenticated: MiddlewareFn<ContextType> = async (
    { context: { req, prisma } },
    next
) => {
    if (!(req.session! as any).userId) throw new Error("Not Authenticated.");

    const user = await prisma.user.findUnique({
        where: {
            id: (req.session! as any).userId,
        },
        include: {
            allProjects: true,
            followedProjects: true,
            likedProjects: true,
            oauthConnections: true,
            ownedProjects: true,
            profile: true,
        },
    });
    if (!user) throw new Error("Invalid User");

    (req as any).user = user;

    return next();
};
