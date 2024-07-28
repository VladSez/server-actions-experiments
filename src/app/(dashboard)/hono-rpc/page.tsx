import { honoClient } from "@/lib/hono";
import { auth } from "@clerk/nextjs/server";
import { unstable_noStore as noStore } from "next/cache";
import { HonoClientPosts } from "./client-page";

export default async function Home() {
  noStore();

  // const res = await honoClient.api.posts.$get();

  // if (res?.status !== 200) {
  //   return "Error fetching posts.";
  // }

  // const data = await res.json();

  // console.log("Here", { res, data });

  return (
    <main className="m-7 p-4">
      <h1 className="font-bold text-lg">Server Hono RPC</h1>

      {/* <pre>{JSON.stringify({ data }, null, 2)}</pre> */}
      <HonoClientPosts />
    </main>
  );
}
