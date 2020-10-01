import { MyContext } from "../types";
import { MiddlewareFn } from "type-graphql/dist/interfaces/Middleware";

//middle ware just runs before resolver
export const isAuth: MiddlewareFn<MyContext> = ({ context }, next) => {
  if (!context.req.session.userId) {
    throw new Error("User is not authenticated");
  }
  return next();
};
