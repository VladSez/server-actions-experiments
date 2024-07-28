import { AddPostFormZSA } from "./add-post-form-client";
import { getPostsZSA } from "@/app/_actions/zsa/get-posts";
import { DeletePostButton } from "./delete-post-button";
import ZSAPostsClient from "./client";

export default async function ZSA() {
  const t1 = performance.now();
  const [data, err] = await getPostsZSA();

  const t2 = performance.now();

  console.log(
    `Drizzle: "db.query.PostsTableSchema.findMany()" took ${
      t2 - t1
    } milliseconds.`
  );

  return (
    <main className="m-7 p-4">
      <h1 className="font-bold text-lg">
        Server page with{" "}
        <a
          href="https://zsa.vercel.app/docs/introduction"
          className="
      text-blue-600 underline"
        >
          ZSA
        </a>
      </h1>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <ZSAPostsClient posts={data ?? []} />
          {/* {data?.map((post) => {
            return (
              <div key={post.id} className="my-5 border-2 p-4 ">
                <h2 className="text-2xl font-semibold">Title: {post.title}</h2>
                <p>Content: {post.content}</p>
                <p>Updated at: {post?.updatedAt?.toISOString() ?? "No date"}</p>
                <DeletePostButton id={post.id} />
              </div>
            );
          })} */}
        </div>
        <div>
          <pre>
            {JSON.stringify({ drizzleTime: t2 - t1, data, err }, null, 2)}
          </pre>
        </div>
      </div>
    </main>
  );
}
