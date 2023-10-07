import { Hono } from "hono";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import { etag } from "hono/etag";
import { lstat } from "fs/promises";
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
app.get("/api/:schema/schema", async (c) => {
  let schema = c.req.param("schema");
  let file = root + "/" + schema + ".ts";
  let response: any = "not found";
  try {
    const info = await lstat(file);
    if (info.isFile()) {
      let s = (await import(file)).default;
      response = {};
      for (const key in s) {
        response[key] = s[key].config;
      }
    }
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
