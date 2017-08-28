import io from "socket.io-client";
import listenSocket from "./sockets";

function connectSocket() {
  const socket = io("http://localhost:1337", {
    query: {
      token: localStorage.getItem("token"),
    },
  });

  listenSocket(socket);

  socket.on("error", error => {
    console.log("error", error);
  });

  socket.on('reconnect_attempt', () => {
    socket.io.opts.query = {
      token: localStorage.getItem("token")
    };
  });

  socket.on("disconnect", msg => console.log("disconnect", msg));
}

export default connectSocket;
