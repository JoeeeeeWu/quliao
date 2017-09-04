import immutable from "immutable";
import {
  INIT_JOINED_ROOMS,
  SWITCH_ROOM,
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
      return state.update("currentRoom", () => action.payload);
    default:
      return state;
  }
};

export default room;
