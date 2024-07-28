import { honoClient } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";

export const useGetPosts = () => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await honoClient.api.posts.$get();

      if (!res.ok) {
        throw new Error("Failed to fetch posts");
      }

      const { posts } = await res.json();

      return posts;
    },
  });
};
