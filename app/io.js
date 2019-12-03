import io from "socket.io-client";

const socket = io("http://10.10.3.81:1335");

export default socket;
