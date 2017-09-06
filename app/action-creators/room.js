import {
  INIT_JOINED_ROOMS,
  SWITCH_ROOM,
  REPLACE_ROOM_MSG,
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
