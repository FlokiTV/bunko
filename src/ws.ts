const callbacks = {
  beforeFetch: (req: Request, server: any) => {
    if (server.upgrade(req)) console.log("ws");
  },
  afterFetch: (req: Request, server: any) => {
    return new Response(null, { status: 404 });
  },
};

export const beforeFetch = (cb: any) => (callbacks.beforeFetch = cb);
export const afterFetch = (cb: any) => (callbacks.afterFetch = cb);

const ws = (port = 3000) => {
  const server = Bun.serve({
    websocket: {
      message(ws, msg) {
        console.log("Echoing: %s", msg);
        ws.send(msg);
      },
      close(ws) {
        console.log("Client has disconnected");
      },
    },
    fetch(req, server) {
      callbacks.beforeFetch(req, server);
      return callbacks.afterFetch(req, server);
    },
    port,
  });
  console.log(`ws \tws://${server.hostname}:${server.port}`);
  return server;
};

export default ws;
