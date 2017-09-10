import immutable from "immutable";
import {
  INIT_MESSAGES,
  ADD_MESSAGE,
  ADD_MESSAGE_LIST,
  ADD_MISSING_MESSAGE_LIST,
  INIT_STATE,
} from "../action-types";

const INITIAL_STATE = immutable.Map();

const message = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case INIT_MESSAGES:
      return state.set(action.payload, immutable.List());
    case ADD_MESSAGE:
      return state.update(action.payload.get("room"), messages => messages.push(action.payload));
    case ADD_MISSING_MESSAGE_LIST:
      return state.update(action.payload.get("roomId"), list => list.concat(action.payload.get("messageList")));
    case ADD_MESSAGE_LIST:
      return state.update(action.payload.get("roomId"), list => action.payload.get("messageList").concat(list));
    case INIT_STATE:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default message;
