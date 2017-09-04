import "babel-polyfill";
import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import Routes from "./routes";
import listenSocket from "./sockets";
import socket from "./io";

listenSocket(socket);

render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById("root"),
);
