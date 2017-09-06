import {
  TOGGLE_ROOM_LIST,
  TOGGLE_CURRENT_ROOM_MSG,
  TOGGLE_MY_INFO,
  TOGGLE_MY_INFO_FORM,
  TOGGLE_ROOM_MSG_FORM,
} from "../action-types";

export const toggleRoomList = payload => ({
  type: TOGGLE_ROOM_LIST,
  payload,
});

export const toggleCurrentRoomMsg = payload => ({
  type: TOGGLE_CURRENT_ROOM_MSG,
  payload,
});

export const toggleMyInfo = payload => ({
  type: TOGGLE_MY_INFO,
  payload,
});

export const toggleMyInfoForm = payload => ({
  type: TOGGLE_MY_INFO_FORM,
  payload,
});

export const toggleRoomMsgForm = payload => ({
  type: TOGGLE_ROOM_MSG_FORM,
  payload,
});
