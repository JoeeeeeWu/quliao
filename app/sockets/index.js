import userSocket from "./user";
import messageSocket from "./message";
import roomSocket from "./room";
import connectSocket from "./connect";

function listenSocket(socket) {
  userSocket(socket);
  messageSocket(socket);
  roomSocket(socket);
  connectSocket(socket);
}

export default listenSocket;
