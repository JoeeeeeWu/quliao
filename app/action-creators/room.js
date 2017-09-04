import {
  INIT_JOINED_ROOMS,
  SWITCH_ROOM,
} from "../action-types";

export const initJoinedRooms = payload => ({
  type: INIT_JOINED_ROOMS,
  payload,
});

export const switchRoom = payload => ({
  type: SWITCH_ROOM,
  payload,
});
