import {
  INIT_MESSAGES,
  ADD_MESSAGE,
} from "../action-types";

export const initMessages = payload => ({
  type: INIT_MESSAGES,
  payload,
});

export const addMessage = payload => ({
  type: ADD_MESSAGE,
  payload,
});
