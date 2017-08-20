import React from "react";
import { render } from "react-dom";

import { Provider } from "react-redux";
import store from "./store";
import socket from "./io";

import Routes from "./routes";

render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById("root")
);
