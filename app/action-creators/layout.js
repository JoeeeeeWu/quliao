import {
  TOGGLE_ROOM_LIST,
  TOGGLE_CURRENT_ROOM_MSG,
  TOGGLE_MY_INFO,
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
