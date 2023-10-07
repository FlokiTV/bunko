import app from "./src/api";
const port = parseInt(process.env.PORT!) || 3000;
/*
  Setup ws
*/
import wsServer from "./src/ws";
import { events } from "./events";
const ws = wsServer(port + 1);
events(ws);
app.get("/ws", (c) => {
  return c.json({
    port: `${ws.port}`,
  });
});
/*
  Client ws script
*/
import { script, type } from "./src/client";
app.get(
  "/ws/client.js",
  async (c) => (c.header("Content-Type", type), c.text(script))
);
/*
  Setup routes
*/
import { routes } from "./routes";
routes(app);

const server: any = {
  port,
  fetch: app.fetch,
};

console.log(`rest \thttp://localhost:${port}`);

export default server;
