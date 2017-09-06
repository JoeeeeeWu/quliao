import userSocket from "./user";
import messageSocket from "./message";
import roomSocket from "./room";

function listenSocket(socket) {
  userSocket(socket);
  messageSocket(socket);
  roomSocket(socket);
}

export default listenSocket;
