import React, { Component } from "react";
import {
  Router,
  Route,
} from "react-router-dom";
import history from "./history";
import Bundle from "./bundle";

import Login from "bundle-loader?lazy&name=login!../containers/login";
import Chat from "bundle-loader?lazy&name=login!../containers/chat";

const createComponent = component => () => (
  <Bundle load={component}>
    {
      Comp => <Comp />
    }
  </Bundle>
);

class Routes extends Component {
  render() {
    return (
      <Router history={history}>
        <div>
          <Route path="/login" exact component={createComponent(Login)} />
          <Route path="/" exact component={createComponent(Chat)} />
        </div>
      </Router>
    );
  }
}

export default Routes;
