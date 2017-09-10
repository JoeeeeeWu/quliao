import store from "../store";
import {
  toggleAlert,
  changeAlertText,
} from "../action-creators/layout";

const showAlert = (text) => {
  store.dispatch(changeAlertText(text));
  store.dispatch(toggleAlert(true));
  setTimeout(() => {
    store.dispatch(toggleAlert(false));
  }, 2000);
};

export default showAlert;
