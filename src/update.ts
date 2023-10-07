const middleware = async (c: any, next: any) => {
  const { upgrade } = c.req.header();
  await next();
  if (upgrade !== "websocket") return;
  // for (const key in c.req.header()) {
  //     const element = c.req.header()[key];
  //     c.res.headers.append(key, element)
  // }
  // c.header("Location", "ws://vekyo.vps-kinghost.net:3001/") //("Location", "ws://vekyo.vps-kinghost.net:3001/")
  // c.status(301)
  // c.redirect('ws://vekyo.vps-kinghost.net:3001/', 301)
  // if (server.upgrade(c.req))
  //     console.log("ws")
  return;
};

export default middleware;
