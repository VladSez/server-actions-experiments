import { env } from "@/env";
import { drizzle, type PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

// https://youtu.be/xF2WvGuI5Ww?si=NOD1-RQYcIvjMlD8&t=842
const pg = postgres(env.POSTGRES_URL);
const db = drizzle(pg, { schema });

export { db, pg };

// VERCEL SDK (Edge-friendly)
// import { sql } from "@vercel/postgres";
// import { drizzle } from "drizzle-orm/vercel-postgres";

// import * as schema from "./schema";

// export { schema };

// export * from "drizzle-orm";

// export const db = drizzle(sql, { schema });

// TODO: not sure if we need this setup
// Check: https://github.com/orgs/supabase/discussions/18986

// const globalForDrizzle = global as unknown as {
//   db: PostgresJsDatabase<typeof schema> | undefined;
// };

// // https://youtu.be/xF2WvGuI5Ww?si=NOD1-RQYcIvjMlD8&t=842
// let db: PostgresJsDatabase<typeof schema>;
// let pg: ReturnType<typeof postgres>;

// if (env.NODE_ENV === "production") {
//   pg = postgres(env.DATABASE_URL);
//   db = drizzle(pg, { schema });
// } else {
//   if (!globalForDrizzle.db) {
//     pg = postgres(env.DATABASE_URL);
//     globalForDrizzle.db = drizzle(pg, { schema });
//   }
//   db = globalForDrizzle.db;
// }

// export { db, pg };
