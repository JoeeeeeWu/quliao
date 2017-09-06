import immutable from "immutable";
import {
  INIT_JOINED_ROOMS,
  SWITCH_ROOM,
  REPLACE_ROOM_MSG,
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
      const index = state.get("joinedRooms").findIndex(joinedRoom => joinedRoom.get("_id") === action.payload.get("_id"));
      return state.setIn(["joinedRooms", index], action.payload);
    default:
      return state;
  }
};

export default room;
