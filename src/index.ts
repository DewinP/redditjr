import "reflect-metadata";
import express from "express";
import { COOKIE_NAME, __PROD__ } from "./constants";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";
import { UserResolver } from "./resolvers/user";
import connectRedis from "connect-redis";
import cors from "cors";
import Redis from "ioredis";
import session from "express-session";
import { createConnection } from "typeorm";
import { Post } from "./entities/Post";
import { User } from "./entities/user";

const main = async () => {
  const conn = await createConnection({
    type: "postgres",
    database: "wabbit",
    username: "postgres",
    password: "postgres",
    logging: true,
    synchronize: true,
    entities: [Post, User],
  });

  const app = express();

  const RedisStore = connectRedis(session);
  const redis = new Redis();
  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );

  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({
        client: redis,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, //10 years
        httpOnly: true,
        secure: __PROD__, //cookie only work in https
        sameSite: "lax", //csrf
      },
      saveUninitialized: false,
      secret: "98e9wur29ur92utt2t",
      resave: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver, UserResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({ req, res, redis }),
  });
  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(4000, () => {
    console.log("server is running on http://localhost:4000");
  });
};

main().catch((err) => {
  console.log(err);
});
