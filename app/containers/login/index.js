import React, { PureComponent } from "react";
import { withRouter } from "react-router-dom";
import {
  Button,
  Form,
  Grid,
  Segment,
  Tab,
} from "semantic-ui-react";
import axios from "axios";
import styles from "./login.less";
import socketEmit from "../../common/socket-emit";
import { apiBaseUrl } from "../../config";

class Login extends PureComponent {

  state={
    loginEmail: "",
    loginPwd: "",
    signupEmail: "",
    signupName: "",
    signupPwd: "",
  }

  handleChange= (e, { name, value }) => this.setState({
    [name]: value,
  })

  handleLogin= async () => {
    socketEmit("test", { token: localStorage.getItem("token") });
    const {
      loginEmail,
      loginPwd,
    } = this.state;
    axios
      .post(`${apiBaseUrl}/login`, {
        loginEmail,
        loginPwd,
      })
      .then(res => {
        const {
          status,
          token,
        } = res.data;
        if (status === 0) {
          localStorage.setItem("token", token);
          this.props.history.push("/");
        }
      })
      .catch(error => console.log(error));
  }

  handleSignup= async () => {
    const {
      signupEmail,
      signupName,
      signupPwd,
    } = this.state;
    axios
      .post(`${apiBaseUrl}/signup`, {
        signupEmail,
        signupName,
        signupPwd,
      })
      .then(res => {

      })
      .catch(error => console.log(error));
  }

  render() {
    const {
      loginEmail,
      loginPwd,
      signupEmail,
      signupName,
      signupPwd,
    } = this.state;
    const loginCont = (
      <Form size="large">
        <Segment stacked>
          <Form.Input
            fluid
            icon="mail"
            iconPosition="left"
            placeholder="邮箱"
            name="loginEmail"
            value={loginEmail}
            onChange={this.handleChange}
          />
          <Form.Input
            fluid
            icon="lock"
            iconPosition="left"
            placeholder="密码"
            type="password"
            name="loginPwd"
            value={loginPwd}
            onChange={this.handleChange}
          />
          <Button
            color="teal"
            fluid
            size="large"
            onClick={this.handleLogin}
          >登录</Button>
        </Segment>
      </Form>
    );
    const signupCont = (
      <Form size="large">
        <Segment stacked>
          <Form.Input
            fluid
            icon="mail"
            iconPosition="left"
            placeholder="邮箱"
            name="signupEmail"
            value={signupEmail}
            onChange={this.handleChange}
          />
          <Form.Input
            fluid
            icon="user"
            iconPosition="left"
            placeholder="昵称"
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
            onClick={this.handleSignup}
          >注册</Button>
        </Segment>
      </Form>
    );
    const panes = [
      { menuItem: "登录", render: () => loginCont },
      { menuItem: "注册", render: () => signupCont },
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

export default withRouter(Login);
