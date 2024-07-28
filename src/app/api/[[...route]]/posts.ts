import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { CreatePostSchema, PostsTableSchema } from "@/db/schema";
import { db } from "@/db/database";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { HTTPException } from "hono/http-exception";

const app = new Hono()
  .get("/", clerkMiddleware(), async (c) => {
    const auth = getAuth(c);

    console.log({ auth, c });

    if (!auth?.userId) {
      throw new HTTPException(401, {
        res: c.json({ error: "Unauthorized" }, 401),
      });
    }

    const posts = await db.query.PostsTableSchema.findMany();

    console.log({ posts });

    return c.json({ posts });
  })
  .post(
    "/",
    clerkMiddleware(),
    zValidator("json", CreatePostSchema),
    async (c) => {
      const auth = getAuth(c);

      if (!auth?.userId) {
        throw new HTTPException(401, {
          res: c.json({ error: "Unauthorized" }, 401),
        });
      }

      const json = c.req.valid("json");

      await db.insert(PostsTableSchema).values(json);

      return c.json({
        message: "Post added!",
        userId: auth.userId,
      });
    }
  );

export default app;
