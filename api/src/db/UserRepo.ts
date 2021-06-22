import { PrismaClient } from "@prisma/client";
import { User } from "~/typegql-types/User";
import DiscordUser from "~/types/DiscordUser.type";
import GithubUser from "~/types/GithubUser.type";
import executeOrFail from "~/util/executeOrFail";

export default class UserRepo extends PrismaClient {
    createDiscordUser = async (oauthUser: DiscordUser): Promise<User> => {
        return executeOrFail(async () => {
            const user = this.user.create({
                data: {
                    email: oauthUser.email || "",
                    joinDate: new Date(),
                    profile: {
                        create: {
                            avatarURL: `https://cdn.discordapp.com/avatars/${process.env.DISCORD_OAUTH_CLIENT_ID}/${oauthUser.avatar}.webp`,
                            bio: "gg",
                        },
                    },
                    username: `${oauthUser.username}#${oauthUser.discriminator}`,
                    hydra: 0,
                    oauthConnections: {
                        create: [
                            {
                                oauthService: "discord",
                                email: oauthUser.email || "",
                                username: `${oauthUser.username}#${oauthUser.discriminator}`,
                                oauthServiceUserId: String(oauthUser.id),
                                isPrimary: true,
                            },
                        ],
                    },
                },
                include: {
                    oauthConnections: true,
                    profile: true,
                },
            });
            return user;
        }, "Error creating user");
    };

    createGithubUser = async (oauthUser: GithubUser): Promise<User> => {
        return executeOrFail(async () => {
            const user = this.user.create({
                data: {
                    email: oauthUser.email || "",
                    profile: {
                        create: {
                            avatarURL: `https://avatars.githubusercontent.com/u/${oauthUser.id}`,
                            bio: oauthUser.bio,
                        },
                    },
                    username: oauthUser.login,
                    hydra: 0,
                    oauthConnections: {
                        create: [
                            {
                                oauthService: "github",
                                email: oauthUser.email || "",
                                username: oauthUser.login,
                                oauthServiceUserId: String(oauthUser.id),
                                isPrimary: true,
                            },
                        ],
                    },
                },
                include: {
                    oauthConnections: true,
                    profile: true,
                },
            });
            return user;
        }, "Error creating user");
    };
}
