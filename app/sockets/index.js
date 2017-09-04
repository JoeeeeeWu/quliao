import userSocket from "./user";
import messageSocket from "./message";

function listenSocket(socket) {
  userSocket(socket);
  messageSocket(socket);
}

export default listenSocket;
