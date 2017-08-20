import React, { Component } from "react";
import {
  Button,
  Form,
  Grid,
  Segment,
  Tab,
} from "semantic-ui-react";

import socketEmit from "../../sockets";
import styles from "./login.less";

class Login extends Component {

  state={
    siginName: "",
    signinPwd: "",
    signupName: "",
    signupPwd: "",
  }

  handleChange= (e, { name, value }) => this.setState({ [name]: value })

  handleSignin= () => {
    const {
      siginName,
      signinPwd,
    } = this.state;
    socketEmit("login", {
      siginName,
      signinPwd,
    });
  }

  handleSingup= () => {
    const {
      signupName,
      signupPwd,
    } = this.state;
  }

  render() {
    const {
      siginName,
      signinPwd,
      signupName,
      signupPwd,
    } = this.state;
    const loginCont = (
      <Form size="large">
        <Segment stacked>
          <Form.Input
            fluid
            icon="user"
            iconPosition="left"
            placeholder="邮箱"
            name="siginName"
            value={siginName}
            onChange={this.handleChange}
          />
          <Form.Input
            fluid
            icon="lock"
            iconPosition="left"
            placeholder="密码"
            type="password"
            name="signinPwd"
            value={signinPwd}
            onChange={this.handleChange}
          />
          <Button
            color="teal"
            fluid
            size="large"
            onClick={this.handleSignin}
          >登录</Button>
        </Segment>
      </Form>
    );
    const logupCont = (
      <Form size="large">
        <Segment stacked>
          <Form.Input
            fluid
            icon="user"
            iconPosition="left"
            placeholder="邮箱"
            name="signupName"
            value={signupName}
            onChange={this.handleChange}
          />
          <Form.Input
            fluid
            icon="lock"
            iconPosition="left"
            placeholder="密码"
            type="password"
            name="signupPwd"
            value={signupPwd}
            onChange={this.handleChange}
          />
          <Button
            color="teal"
            fluid
            size="large"
            onClick={this.handleSingup}
          >注册</Button>
        </Segment>
      </Form>
    );
    const panes = [
      { menuItem: "登录", render: () => loginCont },
      { menuItem: "注册", render: () => logupCont },
    ];
    return (
      <Grid
        textAlign="center"
        className={styles.container}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Tab menu={{ color: "teal", secondary: true, pointing: true }} panes={panes} />
        </Grid.Column>
      </Grid>
    );
  }
}

export default Login;
