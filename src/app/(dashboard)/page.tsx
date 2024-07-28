import { db } from "@/db/database";
import { AddPostServerActionForm } from "./add-post-server-action-form";

export default async function Home() {
  const t1 = performance.now();
  const posts = await db.query.PostsTableSchema.findMany();

  const t2 = performance.now();

  console.log(
    `Drizzle: "db.query.PostsTableSchema.findMany()" took ${
      t2 - t1
    } milliseconds.`
  );

  return (
    <main className="m-7 p-4">
      {/* <SignOutButton /> */}
      <h1 className="font-bold text-lg">Protected route Server Action</h1>

      <pre>
        Posts RSC: {JSON.stringify({ drizzleTime: t2 - t1, posts }, null, 2)}
      </pre>

      <AddPostServerActionForm />
    </main>
  );
}
