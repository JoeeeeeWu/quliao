import {
  INIT_MESSAGES,
  ADD_MESSAGE,
  ADD_MISSING_MESSAGE_LIST,
  ADD_MESSAGE_LIST,
} from "../action-types";

export const initMessages = payload => ({
  type: INIT_MESSAGES,
  payload,
});

export const addMessage = payload => ({
  type: ADD_MESSAGE,
  payload,
});

export const addMissingMessageList = payload => ({
  type: ADD_MISSING_MESSAGE_LIST,
  payload,
});

export const addMessageList = payload => ({
  type: ADD_MESSAGE_LIST,
  payload,
});
