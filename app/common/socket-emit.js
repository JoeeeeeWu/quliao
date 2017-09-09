import socket from "../io";
import logout from "./logout";

const socketEmit = (event, arg) => {
  return new Promise((resolve, reject) => {
    socket.emit(event, arg, (res) => {
      if (res.error) {
        if (res.status === 2) {
          logout();
        }
        reject(res);
      } else {
        resolve(res);
      }
    });
  });
};

export default socketEmit;
