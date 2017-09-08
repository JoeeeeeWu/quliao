import {
  INIT_JOINED_ROOMS,
  SWITCH_ROOM,
  REPLACE_ROOM_MSG,
  ADD_ROOM_MSG,
  ADD_ROOM_MEMBER,
  REMOVE_ROOM,
  REMOVE_MEMBER,
} from "../action-types";

export const initJoinedRooms = payload => ({
  type: INIT_JOINED_ROOMS,
  payload,
});

export const switchRoom = payload => ({
  type: SWITCH_ROOM,
  payload,
});

export const replaceRoomMsg = payload => ({
  type: REPLACE_ROOM_MSG,
  payload,
});

export const addRoomMsg = payload => ({
  type: ADD_ROOM_MSG,
  payload,
});

export const addRoomMember = payload => ({
  type: ADD_ROOM_MEMBER,
  payload,
});

export const removeRoom = payload => ({
  type: REMOVE_ROOM,
  payload,
});

export const leaveRoom = payload => ({
  type: REMOVE_MEMBER,
  payload,
});
