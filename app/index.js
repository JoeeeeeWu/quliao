import "babel-polyfill";
import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import connectSocket from "./io";

import Routes from "./routes";

connectSocket();

render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById("root"),
);
