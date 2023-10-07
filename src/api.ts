import { Hono } from "hono";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import { etag } from "hono/etag";
// import { endTime, setMetric, startTime, timing } from "hono/timing";

const app = new Hono();
app.use("*", logger());
app.use("*", cors());
app.use("*", etag());
// app.use("*", timing());
// app.use("*", async (_, next) => {
//   setMetric(_, "custom", 23.8, "My custom Metric");
//   startTime(_, "hono");
//   await next();
//   endTime(_, "hono");
// });

export default app;
