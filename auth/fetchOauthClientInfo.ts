export default function fetchOauthClientInfo(
    provider: "github" | "discord" | "google" | "twitter"
) {
    switch (provider) {
        case "github":
            return {
                clientId: process.env.GITHUB_CLIENT_ID,
                clientSecret: process.env.GITHUB_CLIENT_SECRET,
                cbUrl: `${
                    process.env.SERVER_URL || "http://localhost:3000"
                }/auth/github/cb`,
            };
        case "discord":
            return {
                clientId: process.env.DISCORD_CLIENT_ID,
                clientSecret: process.env.DISCORD_CLIENT_SECRET,
                cbUrl: `${
                    process.env.SERVER_URL || "http://localhost:3000"
                }/auth/discord/cb`,
            };
        case "google":
            return {
                clientId: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                cbUrl: `${
                    process.env.SERVER_URL || "http://localhost:3000"
                }/auth/google/cb`,
            };
        case "twitter":
            return {
                clientId: process.env.TWITTER_CLIENT_ID,
                clientSecret: process.env.TWITTER_CLIENT_SECRET,
                cbUrl: `${
                    process.env.SERVER_URL || "http://localhost:3000"
                }/auth/twitter/cb`,
            };
    }
}
