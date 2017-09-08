import immutable from "immutable";
import store from "../store";

import {
  replaceRoomMsg,
  switchRoom,
  addRoomMember,
  removeRoom,
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

  socket.on("add room member", (msg) => {
    store.dispatch(addRoomMember(immutable.fromJS(msg)));
  });

  socket.on("remove room", (msg) => {
    const {
      data: {
        roomId,
      },
    } = msg;
    const state = store.getState();
    const currentRoomId = state.room.getIn(["currentRoom", "_id"]);
    const publicRoomIndex = state.room.get("joinedRooms").findIndex(joinedRoom => joinedRoom.get("name") === "公共聊天室");
    const publicRoom = state.room.getIn(["joinedRooms", publicRoomIndex]);
    if (currentRoomId === roomId) {
      store.dispatch(switchRoom(publicRoom));
    }
    store.dispatch(removeRoom(roomId));
  });

  socket.on("leave room", (msg) => {
    const {
      data: {
        userId,
        roomId,
      }
    } = msg;
    const state = store.getState();
    const myId = state.user.get("_id");
    const publicRoomIndex = state.room.get("joinedRooms").findIndex(joinedRoom => joinedRoom.get("name") === "公共聊天室");
    const publicRoom = state.room.getIn(["joinedRooms", publicRoomIndex]);
    if (userId === myId) {
      store.dispatch(switchRoom(publicRoom));
      store.dispatch(removeRoom(roomId));
    } else {
      
    }
  });
}

export default roomSocket;
