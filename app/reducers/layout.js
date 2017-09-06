import immutable from "immutable";
import {
  TOGGLE_ROOM_LIST,
  TOGGLE_CURRENT_ROOM_MSG,
  TOGGLE_MY_INFO,
  TOGGLE_MY_INFO_FORM,
  TOGGLE_ROOM_MSG_FORM,
} from "../action-types";

const INITIAL_STATE = immutable.Map({
  showRoomList: false,
  showCurrentRoomMsg: false,
  showMyInfo: false,
  showMyInfoForm: false,
  showRoomMsgForm: false,
});

const layout = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TOGGLE_ROOM_LIST:
      return state.update("showRoomList", status => !status);
    case TOGGLE_CURRENT_ROOM_MSG:
      return state.update("showCurrentRoomMsg", status => !status);
    case TOGGLE_MY_INFO:
      return state.update("showMyInfo", status => !status);
    case TOGGLE_MY_INFO_FORM:
      return state.update("showMyInfoForm", status => !status);
    case TOGGLE_ROOM_MSG_FORM:
      return state.update("showRoomMsgForm", status => !status);
    default:
      return state;
  }
};

export default layout;
