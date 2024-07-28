"use server";

import z from "zod";
import { db } from "@/db/database";
import { PostsTableSchema } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { protectedProcedure } from "./_common";

export const addPostZSA = protectedProcedure
  .createServerAction()
  .input(
    z.object({
      title: z.string().trim().min(1),
      content: z.string().trim().min(1),
    })
  )
  .handler(async ({ input }) => {
    const t1 = performance.now();

    const res = await db
      .insert(PostsTableSchema)
      .values({
        title: input.title,
        content: input.content,
      })
      .returning({
        title: PostsTableSchema.title,
        content: PostsTableSchema.content,
        updatedAt: PostsTableSchema.updatedAt,
      });

    const t2 = performance.now();

    revalidatePath("/zsa");

    console.log(`Drizzle: addPost server action took ${t2 - t1} milliseconds.`);

    return res;
  });
