import React, { Component } from "react";
import {
  Router,
  Route,
} from "react-router-dom";
import history from "./history";
import Bundle from "./bundle";

import Login from "bundle-loader?lazy&name=login!../containers/Login";
import Chat from "bundle-loader?lazy&name=chat!../containers/Chat";

const createComponent = component => props => (
  <Bundle load={component}>
    {
      Comp => <Comp {...props} />
    }
  </Bundle>
);

const Routes = () => (
  <Router history={history}>
    <div>
      <Route path="/login" exact component={createComponent(Login)} />
      <Route path="/" exact component={createComponent(Chat)} />
    </div>
  </Router>
);

export default Routes;
