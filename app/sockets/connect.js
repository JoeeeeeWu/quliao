import immutable from "immutable";
import store from "../store";
import socketEmit from "../common/socket-emit";
import { initJoinedRooms } from "../action-creators/room";
import { toggleOnline } from "../action-creators/layout";
import {
  addMissingMessageList,
} from "../action-creators/message";
let disconnectTime;

function connectSocket(socket) {
  socket.on("connect", () => {
    store.dispatch(toggleOnline(true));
    console.log("connect");
  });

  socket.on("disconnect", () => {
    console.log("disconnect");
    store.dispatch(toggleOnline(false));
    disconnectTime = Date.now();
  });

  socket.on("reconnect", (msg) => {
    console.log("reconnect");
    const token = localStorage.getItem("token");
    store.dispatch(toggleOnline(true));
    socketEmit("myInfo", {
      token,
    })
      .then((res) => {
        const { joinedRooms } = res;
        initJoinedRooms(immutable.fromJS(joinedRooms));
        joinedRooms.forEach(({ _id: roomId }) => {
          socketEmit("get missing messages", {
            token,
            data: {
              roomId,
              disconnectTime,
            },
          })
            .then((response) => {
              store.dispatch(addMissingMessageList(immutable.fromJS({
                roomId,
                messageList: response,
              })));
            })
            .catch(error => console.log(error));
        });
      })
      .catch(error => console.log(error));
  });
}

export default connectSocket;