import socket from "../io";

const socketEmit = (event, arg) => {
  return new Promise((resolve, reject) => {
    socket.emit(event, arg, res => {
      resolve(res);
    });
  });
};

export default socketEmit;
