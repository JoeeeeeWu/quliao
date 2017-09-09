import immutable from "immutable";
import {
  INIT_MY_INFO,
  INIT_STATE,
} from "../action-types";

const INITIAL_STATE = immutable.Map();

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case INIT_MY_INFO:
      return state.merge(action.payload);
    case INIT_STATE:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default user;
