import { Hono } from "hono";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import { etag } from "hono/etag";
import { lstat } from "fs/promises";
import { db } from "./db";
// import { endTime, setMetric, startTime, timing } from "hono/timing";

const app = new Hono();
app.use("*", logger());
app.use("*", cors());
app.use("*", etag());

const root = process.cwd() + "/schemas";
// let dir = await readdir(root);
// for (const name of dir) {
//   const file = Bun.file(name);
//   const info = await lstat(root + "/" + name);
//   if (info.isFile()) {
//     console.log("file");
//   }
// }
app.use("/api/:schema/*", async (c, next) => {
  let schema = c.req.param("schema");
  let file = root + "/" + schema + ".ts";
  try {
    const info = await lstat(file);
    if (!info.isFile()) {
      c.status(404);
      return c.text("not found");
    }
  } catch (error) {
    c.status(404);
    return c.json(error);
  }
  await next();
});
app.get("/api/:schema/schema", async (c) => {
  let schema = c.req.param("schema");
  let file = root + "/" + schema + ".ts";
  let response: any = "not found";
  try {
    let loadedSchema = (await import(file)).default;
    response = {};
    for (const key in loadedSchema) {
      response[key] = loadedSchema[key].config;
    }
  } catch (error) {
    c.status(404);
  }
  return c.json(response);
});
app.get("/api/:schema", async (c) => {
  let schema = c.req.param("schema");
  let file = root + "/" + schema + ".ts";
  let response: any = "not found";
  try {
    let loadedSchema = (await import(file)).default;
    const result = db.select().from(loadedSchema).all();
    response = result;
  } catch (error) {
    c.status(404);
  }
  return c.json(response);
});
// app.use("*", timing());
// app.use("*", async (_, next) => {
//   setMetric(_, "custom", 23.8, "My custom Metric");
//   startTime(_, "hono");
//   await next();
//   endTime(_, "hono");
// });

export default app;
