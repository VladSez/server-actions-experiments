"use server";

import { db } from "@/db/database";
import { protectedProcedure } from "./_common";
import type { inferServerActionReturnData } from "zsa";

export const getPostsZSA = protectedProcedure
  .createServerAction()
  .handler(async () => {
    const posts = await db.query.PostsTableSchema.findMany({
      orderBy: (posts, { asc }) => [asc(posts.updatedAt)],
    });

    return posts;
  });

export type getPostsZSAReturnData = inferServerActionReturnData<
  typeof getPostsZSA
>;
