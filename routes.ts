import type { Hono } from "hono";
import { insertUser, readUser } from "./src/db";

export const routes = (app: Hono) => {
  app.get("/", (c) => {
    // end the timer
    let result = readUser();
    return c.json(result);
  });
  app.get("/s", async (c) => {
    let result = await insertUser({ fullName: "Flokete" });
    console.log(result);
    return c.json(result);
  });
};
