import immutable from "immutable";
import store from "../store";

import {
  replaceRoomMsg,
  switchRoom,
} from "../action-creators/room";

function roomSocket(socket) {
  socket.on("change room msg", (msg) => {
    const state = store.getState();
    const currentRoomId = state.room.getIn(["currentRoom", "_id"]);
    if (currentRoomId === msg._id) {
      store.dispatch(switchRoom(immutable.fromJS(msg)));
    }
    store.dispatch(replaceRoomMsg(immutable.fromJS(msg)));
  });
}

export default roomSocket;
