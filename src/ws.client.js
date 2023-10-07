const bunko = async (
  BASE_URL = "vekyo.vps-kinghost.net",
  DEFAULT_PORT = 3000
) => {
  let socket;
  let { port } = await (
    await fetch(`http://${BASE_URL}:${DEFAULT_PORT}/ws`)
  ).json();
  socket = new WebSocket(`ws://${BASE_URL}:${port}`);
  return {
    ws: socket,
    open(cb) {
      socket.addEventListener("open", (event) => cb(event));
    },
    close(cb) {
      socket.addEventListener("close", (event) => cb(event));
    },
    error(cb) {
      socket.addEventListener("error", (event) => cb(event));
    },
    send(type = "event", data = {}) {
      socket.send(
        JSON.stringify({
          type,
          data,
        })
      );
    },
    on(type, cb) {
      socket.addEventListener("message", (event) => {
        console.log(event);
        if (type === "*") {
          cb(event.type, event.data);
        } else {
          cb(event.data);
        }
      });
    },
  };
};

window.bunko = bunko;
