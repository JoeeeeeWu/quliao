import { fromJS } from "immutable";
import {
  WINDOW_RESIZE,
} from "../action_types";

const INITIAL_STATE = fromJS({
  isMobile: false,
});

const layout = (state = INITIAL_STATE, action) => {
  const innerWidth = window.innerWidth;
  const isMobile = innerWidth <= 768;
  switch (action.type) {
    case WINDOW_RESIZE:
      return {
        ...state,
        isMobile,
      };
    default:
      return state;
  }
};

export default layout;
