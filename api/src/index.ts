import "reflect-metadata";
import { PrismaClient } from "@prisma/client";
import express from "express";
import cors from "cors";
import {
    fieldExtensionsEstimator,
    getComplexity,
    simpleEstimator,
} from "graphql-query-complexity";
import dotenv from "dotenv";
import session from "express-session";
import connectRedis from "connect-redis";
import Redis from "ioredis";
import createSchema from "./util/CreateSchema";
import ContextType from "./types/Context.type";
import { ApolloServer } from "apollo-server-express";
import { isProd, projectName } from "./constants";

async function main() {
    // initialize dontenv
    dotenv.config();

    // Initialize Redis
    const RedisStore = connectRedis(session);
    const redis = new Redis();

    // Initialize Apollo Server
    const schema = await createSchema();
    const gqlServer = new ApolloServer({
        schema,
        context: ({ req, res }: ContextType) => ({
            req,
            res,
            prisma: new PrismaClient(),
        }),
        plugins: [
            {
                requestDidStart: () => ({
                    didResolveOperation({ request, document }) {
                        const complexity = getComplexity({
                            schema,
                            operationName: request.operationName,
                            query: document,
                            variables: request.variables,
                            estimators: [
                                fieldExtensionsEstimator(),
                                simpleEstimator({ defaultComplexity: 1 }),
                            ],
                        });

                        const maximumQueryComplexity = 30;

                        if (complexity > maximumQueryComplexity) {
                            console.log(complexity);

                            throw new Error(
                                `Maximum query complexity of ${maximumQueryComplexity} has been reached.`
                            );
                        }
                    },
                }),
            },
        ],
    });

    // Create Express Server
    const expressServer = express();

    // Express Middleware
    expressServer.use(
        cors({
            origin: process.env.CLIENT_URL,
            credentials: true,
        })
    );
    expressServer.use(
        session({
            name: `${projectName}_accto`,
            store: new RedisStore({
                client: redis,
            }),
            secret: process.env.sessionSecret || "pog",
            resave: false,
            saveUninitialized: false,
            cookie: {
                httpOnly: true,
                secure: isProd,
                maxAge: 1000 * 60 * 60 * 24 * 365,
            },
        })
    );

    // Enable express to be used with gql
    gqlServer.applyMiddleware({ app: expressServer });

    // Start Server
    const port = process.env.PORT || 8000;
    expressServer.listen({ port }, () => {
        console.log(
            `Navigate to http://localhost:${port}${gqlServer.graphqlPath}`
        );
    });
}

main().catch((err) => console.error(err));
