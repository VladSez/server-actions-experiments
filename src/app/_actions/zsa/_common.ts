import { auth } from "@clerk/nextjs/server";
import { createServerActionProcedure } from "zsa";

/**
 * This is a basic procedure that checks if the user is authenticated.
 * https://zsa.vercel.app/docs/procedures#creating-a-basic-procedure
 */
export const protectedProcedure = createServerActionProcedure().handler(
  async () => {
    try {
      const { userId } = auth();

      if (!userId) {
        throw new Error("Unauthorized");
      }
    } catch {
      throw new Error("User not authenticated");
    }
  }
);
