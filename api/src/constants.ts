import { NonEmptyArray } from "type-graphql";

export const projectName = "hydralite";
export const pathsToResolvers = [
    __dirname + "\\resolvers\\**\\*.resolver.js",
    __dirname + "\\resolvers\\**\\*.resolver.ts",
] as NonEmptyArray<string>;
export const isProd = process.env.NODE_ENV === "production";
