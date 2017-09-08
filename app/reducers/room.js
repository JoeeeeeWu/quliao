import immutable from "immutable";
import {
  INIT_JOINED_ROOMS,
  SWITCH_ROOM,
  REPLACE_ROOM_MSG,
  ADD_ROOM_MSG,
  ADD_ROOM_MEMBER,
  REMOVE_ROOM,
  REMOVE_MEMBER,
} from "../action-types";

const INITIAL_STATE = immutable.Map({
  currentRoom: immutable.Map(),
  joinedRooms: immutable.List(),
});

const room = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case INIT_JOINED_ROOMS:
      return state.update("joinedRooms", list => list.concat(action.payload));
    case SWITCH_ROOM:
      return state.set("currentRoom", action.payload);
    case REPLACE_ROOM_MSG:
      const replaceRoomMsgIndex = state.get("joinedRooms").findIndex(joinedRoom => joinedRoom.get("_id") === action.payload.get("_id"));
      return state.setIn(["joinedRooms", replaceRoomMsgIndex], action.payload);
    case ADD_ROOM_MSG:
      return state.update("joinedRooms", list => list.push(action.payload));
    case ADD_ROOM_MEMBER:
      const addRoomMemberIndex = state.get("joinedRooms").findIndex(joinedRoom => joinedRoom.get("_id") === action.payload.get("roomId"));
      return state.updateIn(["joinedRooms", addRoomMemberIndex, "members"], list => list.push(action.payload.get("user")));
    case REMOVE_ROOM:
      const removeRoomIndex = state.get("joinedRooms").findIndex(joinedRoom => joinedRoom.get("_id") === action.payload);
      return state.update("joinedRooms", list => list.splice(removeRoomIndex, 1));
    case REMOVE_MEMBER:
      const joinedRoomIndex = state.get("joinedRooms").findIndex(joinedRoom => joinedRoom.get("_id") === action.payload.get("roomId"));
      const removeMemberIndex = state.getIn(["joinedRooms", joinedRoomIndex, "members"]).findIndex(member => member.get("_id") === action.payload.get("userId"));
      return state.updateIn(["joinedRooms", joinedRoomIndex, "members"], list => list.splice(removeMemberIndex, 1));
    default:
      return state;
  }
};

export default room;
