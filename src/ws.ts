const middleware = {
  beforeFetch: (req: Request, server: any) => {
    if (server.upgrade(req)) console.log("ws");
  },
  afterFetch: (req: Request, server: any) => {
    return new Response(null, { status: 404 });
  },
};

export const beforeFetch = (cb: any) => (middleware.beforeFetch = cb);
export const afterFetch = (cb: any) => (middleware.afterFetch = cb);

interface wsMessage {
  type: string;
  cb: any;
}

const ws = (port = 3000) => {
  const callbacks: wsMessage[] = [];
  const server = Bun.serve({
    websocket: {
      message(ws, msg: string) {
        try {
          const { type, data } = JSON.parse(msg);
          for (const cb of callbacks) {
            if (type == cb.type) {
              console.log(cb.type);
              cb.cb(ws, data);
            }
          }
          // ws.send(msg);
        } catch (error) {
          console.log("is not a json");
        }
      },
      close(ws) {
        console.log("Client has disconnected");
      },
    },
    fetch(req, server) {
      middleware.beforeFetch(req, server);
      return middleware.afterFetch(req, server);
    },
    port,
  });
  console.log(`ws \tws://${server.hostname}:${server.port}`);
  return {
    server,
    port: server.port,
    on(type: string, cb: object) {
      callbacks.push({
        type,
        cb,
      });
    },
  };
};

export default ws;
