import { combineReducers } from "redux";
import user from "./user";
import room from "./room";
import message from "./message";
import layout from "./layout";

const rootReducer = combineReducers({
  user,
  room,
  message,
  layout,
});

export default rootReducer;
