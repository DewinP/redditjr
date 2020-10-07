import { Comment } from "../entities/Comment";
import {
  Resolver,
  Arg,
  Int,
  Query,
  Ctx,
  Mutation,
  UseMiddleware,
} from "type-graphql";
import { MyContext } from "../types";
import { isAuth } from "../middleware/isAuth";

@Resolver()
export class CommentResolver {
  @Query(() => [Comment])
  comments(): Promise<Comment[]> {
    return Comment.find();
  }

  @Query(() => [Comment])
  getCommentsByPostId(@Arg("postId", () => Int) postId: number) {
    return Comment.find({
      where: {
        postId: postId,
      },
    });
  }

  @Mutation(() => Comment)
  @UseMiddleware(isAuth)
  async createComment(
    @Arg("body") body: string,
    @Arg("postId") postId: number,
    @Ctx() { req }: MyContext
  ): Promise<Comment> {
    return Comment.create({
      body,
      creatorId: req.session.userId,
      postId,
    }).save();
  }

  @Mutation(() => Comment)
  async updateComment(
    @Arg("id") id: number,
    @Arg("body", () => String) body: string
  ): Promise<Comment | undefined> {
    const comment = await Comment.findOne(id);
    if (!comment) {
      return undefined;
      //this is not working for some reason
    }
    if (typeof body !== "undefined") {
      await Comment.update({ id }, { body, wasUpdated: true });
    }
    return comment;
  }
}
