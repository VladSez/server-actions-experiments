"use server";

import { db } from "@/db/database";
import { CreatePostSchema, PostsTableSchema } from "@/db/schema";
import { revalidatePath } from "next/cache";

export const addPost = async (title: string, content: string) => {
  try {
    const t1 = performance.now();
    const { title: parsedTitle, content: parsedContent } =
      CreatePostSchema.parse({ title, content });

    await db.insert(PostsTableSchema).values({
      title: parsedTitle,
      content: parsedContent,
    });

    const t2 = performance.now();

    console.log(`Drizzle: addPost server action took ${t2 - t1} milliseconds.`);

    revalidatePath("/");
  } catch (e) {
    console.log("Error in server action");
    console.error(e);
  }
};
