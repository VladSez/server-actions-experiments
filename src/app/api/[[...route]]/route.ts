import { Hono } from "hono";
import { handle } from "hono/vercel";
import posts from "./posts";
import { HTTPException } from "hono/http-exception";

const app = new Hono().basePath("/api");

app.onError((err, c) => {
  if (err instanceof HTTPException) {
    return err.getResponse();
  }
  return c.json({ error: "Internal Server Error" }, 500);
});

const routes = app.route("/posts", posts);

export const GET = handle(app);
export const POST = handle(app);

export type AppType = typeof routes;
