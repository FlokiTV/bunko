import app from "./src/api";
const port = parseInt(process.env.PORT!) || 3000;
// Setup ws response
const wsServer = ws(port + 1);
import ws from "./src/ws";
app.get("/ws", (c) => {
  return c.json({
    port: `${wsServer.port}`,
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

console.log(`rest \thttp://localhost:${port}`);

const server: any = {
  port,
  fetch: app.fetch,
};

export default server;
