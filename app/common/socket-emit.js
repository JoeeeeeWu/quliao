import socket from "../io";
import logout from "./logout";

const socketEmit = (event, arg) => {
  return new Promise((resolve, reject) => {
    socket.emit(event, arg, (res) => {
      switch (res.status) {
        case 0:
          resolve(res.data);
          break;
        case 2:
          logout();
          reject(res);
          break;
        case 3:
          reject(res);
      }
    });
  });
};

export default socketEmit;
