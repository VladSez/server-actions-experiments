"use client";

import type { getPostsZSAReturnData } from "@/app/_actions/zsa/get-posts";
import { DeletePostButton } from "./delete-post-button";
import { useOptimistic } from "react";
import { AddPostFormZSA } from "./add-post-form-client";
import { cn } from "@/lib/utils";

type OptimisticPost = getPostsZSAReturnData[0] & { pending?: boolean };

export default function ZSAPostsClient({
  posts = [],
}: {
  posts: getPostsZSAReturnData;
}) {
  const [optimisticPosts, addOptimisticPost] = useOptimistic<
    OptimisticPost[],
    {
      title: getPostsZSAReturnData[0]["title"];
      content: getPostsZSAReturnData[0]["content"];
    }
  >(posts, (currentState, optimisticValue) => {
    // merge and return new state
    // with optimistic value
    return [
      ...currentState,
      {
        title: optimisticValue.title,
        content: optimisticValue.content,
        id: new Date().toISOString(),
        createdAt: new Date(),
        updatedAt: new Date(),
        pending: true,
      },
    ];
  });

  return (
    <div>
      {optimisticPosts?.map((post) => {
        const isPending = post?.pending ?? false;

        return (
          <div
            key={post.id}
            className={cn("my-5 border-2 p-4", {
              "opacity-50": post?.pending ?? false,
            })}
          >
            <h2 className="text-2xl font-semibold">
              Title: {post.title} {isPending ? "Saving..." : null}
            </h2>
            <p>Content: {post.content}</p>
            <p>Updated at: {post?.updatedAt?.toISOString() ?? "No date"}</p>
            <DeletePostButton id={post.id} isOptimisticUpdate={isPending} />
          </div>
        );
      })}
      <AddPostFormZSA addOptimisticPost={addOptimisticPost} />
    </div>
  );
}
