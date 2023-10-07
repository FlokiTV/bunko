import app from "./src/api";
const port = parseInt(process.env.PORT!) || 3000;
// Setup ws response
import wsServer from "./src/ws";
const ws = wsServer(port + 1);
app.get("/ws", (c) => {
  return c.json({
    port: `${ws.port}`,
  });
});
// Client script
import { script, type } from "./src/client";
app.get(
  "/ws/client.js",
  async (c) => (c.header("Content-Type", type), c.text(script))
);
// Setup routes
import { routes } from "./routes";
routes(app);

ws.on("hi", (socket: any, data: any) => {
  console.log(socket, data);
});

console.log(`rest \thttp://localhost:${port}`);

const server: any = {
  port,
  fetch: app.fetch,
};

export default server;
