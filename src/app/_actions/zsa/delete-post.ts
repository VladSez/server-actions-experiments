"use server";

import z from "zod";
import { db } from "@/db/database";
import { PostsTableSchema } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { protectedProcedure } from "./_common";
import { eq } from "drizzle-orm";

export const deletePostZSA = protectedProcedure
  .createServerAction()
  .input(
    z.object({
      id: z.string().trim().min(1),
    })
  )
  .handler(async ({ input }) => {
    const t1 = performance.now();

    const res = await db
      .delete(PostsTableSchema)
      .where(eq(PostsTableSchema.id, input.id))
      .returning({
        title: PostsTableSchema.title,
        content: PostsTableSchema.content,
        deletedId: PostsTableSchema.id,
      });

    const t2 = performance.now();

    revalidatePath("/zsa");

    console.log(
      `Drizzle: deletePostZSA server action took ${t2 - t1} milliseconds.`
    );

    return res;
  });
