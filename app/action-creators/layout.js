import {
  TOGGLE_ROOM_LIST,
  TOGGLE_CURRENT_ROOM_MSG,
  TOGGLE_MY_INFO,
  TOGGLE_MY_INFO_FORM,
  TOGGLE_ROOM_MSG_FORM,
  TOGGLE_CTEATE_ROOM_FORM,
  TOGGLE_SEARCH_ROOM,
  INIT_STATE,
  TOGGLE_ONLINE,
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

export const toggleCreateRoomForm = payload => ({
  type: TOGGLE_CTEATE_ROOM_FORM,
  payload,
});

export const toggleSearchRoom = payload => ({
  type: TOGGLE_SEARCH_ROOM,
  payload,
});

export const initState = payload => ({
  type: INIT_STATE,
  payload,
});

export const toggleOnline = payload => ({
  type: TOGGLE_ONLINE,
  payload,
});
