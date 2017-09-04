import immutable from "immutable";
import { INIT_MY_INFO } from "../action-types";

const INITIAL_STATE = immutable.Map();

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case INIT_MY_INFO:
      return state.merge(action.payload);
    default:
      return state;
  }
};

export default user;
