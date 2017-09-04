import {
  INIT_MY_INFO,
} from "../action-types";

export const initMyInfo = payload => ({
  type: INIT_MY_INFO,
  payload,
});
