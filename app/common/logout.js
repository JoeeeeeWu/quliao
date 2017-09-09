import store from "../store";
import { initState } from "../action-creators/layout";

const logout = (history) => {
  store.dispatch(initState());
  localStorage.removeItem("token");
  history.push("/login");
};

export default logout;
