import io from "socket.io-client";

const socket = io("http://192.168.31.127:1337");

export default socket;
