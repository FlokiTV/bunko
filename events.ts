export const events = (ws: any) => {
  ws.on("hi", (socket: any, data: any) => {
    console.log(data);
  });
  ws.on("ping", (socket: any, data: any) => {
    console.log(data);
  });
};
