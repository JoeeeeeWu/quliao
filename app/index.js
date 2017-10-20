import "babel-polyfill";
import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import Routes from "./routes";
import listenSocket from "./sockets";
import socket from "./io";

// 实验
import immutable from "immutable";

const a = {a:1};
const b = a;
b.a=2;
console.log(immutable.is(a,b));


// 实验

listenSocket(socket);

render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById("root"),
);
