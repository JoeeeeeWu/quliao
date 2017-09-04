import immutable from "immutable";
import {
  INIT_MESSAGES,
  ADD_MESSAGE,
} from "../action-types";

const INITIAL_STATE = immutable.Map();

const message = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case INIT_MESSAGES:
      return state.merge(action.payload);
    case ADD_MESSAGE:
      return state.update(action.payload.get("room"), messages => messages.push(action.payload));
    default:
      return state;
  }
};

export default message;
