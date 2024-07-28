import { env } from "@/env";
import type { Config } from "drizzle-kit";

import * as dotenv from "dotenv";

// TODO: should we use .env.local or .env?
dotenv.config({ path: ".env.local" });

export default {
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: { url: env.POSTGRES_URL },
  verbose: true,
  strict: true,
} satisfies Config;
