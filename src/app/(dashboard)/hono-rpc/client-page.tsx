"use client";

import { useGetPosts } from "@/features/posts/api/get-posts";

export function HonoClientPosts() {
  // const t1 = performance.now();
  const { data, isLoading, error } = useGetPosts();
  // const t2 = performance.now();

  return (
    <div className="m-7 p-4">
      <h1 className="font-bold text-lg">Client Hono RPC</h1>

      <pre>
        Posts Hono RPC: {JSON.stringify({ isLoading, error, data }, null, 2)}
      </pre>
    </div>
  );
}
