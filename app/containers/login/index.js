import React, { Component } from "react";
import { immutableRenderDecorator } from "react-immutable-render-mixin";
import {
  Button,
  Form,
  Segment,
  Tab,
  Input,
  Label,
  Message,
  Header,
  Container,
} from "semantic-ui-react";
import axios from "axios";
import styles from "./login.less";
import { apiBaseUrl } from "../../config";

@immutableRenderDecorator
class Login extends Component {
  state={
    loginEmail: "",
    loginPwd: "",
    signupEmail: "",
    signupName: "",
    signupPwd: "",

    showLogEmailLabel: false,
    showLogPwdLabel: false,
    showSigEmailLabel: false,
    showSigNameLabel: false,
    showSigPwdLabel: false,

    signupMsg: "",
    loginMsg: "",

    showLoginMsg: false,
    showSignupMsg: false,
  }

  handleChange= (e, { name, value }) => this.setState({
    [name]: value,
  })

  showError = (param) => {
    this.setState({
      [param]: true,
    });
    setTimeout(() => {
      this.setState({
        [param]: false,
      });
    }, 5000);
  }

  handleLogin= async () => {
    const {
      loginEmail,
      loginPwd,
    } = this.state;
    const regExp = new RegExp("^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$")
    if (!regExp.test(loginEmail)) {
      this.showError("showLogEmailLabel");
      return;
    }
    if (!loginPwd) {
      this.showError("showLogPwdLabel");
      return;
    }
    axios
      .post(`${apiBaseUrl}/login`, {
        loginEmail,
        loginPwd,
      })
      .then((res) => {
        const {
          status,
          token,
          msg,
        } = res.data;
        if (status === 0) {
          localStorage.setItem("token", token);
          this.props.history.push("/");
        } else {
          this.setState({
            loginMsg: msg,
            showLoginMsg: true,
          });
          setTimeout(() => {
            this.setState({
              showLoginMsg: false,
            });
          }, 5000);
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
    const regExp = new RegExp("^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$")
    if (!regExp.test(signupEmail)) {
      this.showError("showSigEmailLabel");
      return;
    }
    if (!signupName.trim()) {
      this.showError("showSigNameLabel");
      return;
    }
    if (!signupPwd) {
      this.showError("showSigPwdLabel");
      return;
    }
    axios
      .post(`${apiBaseUrl}/signup`, {
        signupEmail,
        signupName,
        signupPwd,
      })
      .then((res) => {
        const {
          status,
          msg,
        } = res.data;
        if (status === 0) {
          this.setState({
            signupMsg: "注册成功，请登录！",
            showSignupMsg: true,
          });
          setTimeout(() => {
            this.setState({
              showSignupMsg: false,
            });
          }, 5000);
        } else {
          this.setState({
            signupMsg: msg,
            showSignupMsg: true,
          });
          setTimeout(() => {
            this.setState({
              showSignupMsg: false,
            });
          }, 5000);
        }
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

      showLogEmailLabel,
      showLogPwdLabel,
      showSigEmailLabel,
      showSigNameLabel,
      showSigPwdLabel,

      signupMsg,
      loginMsg,

      showLoginMsg,
      showSignupMsg,
    } = this.state;
    const loginCont = (
      <Form size="large">
        <Segment stacked>
          <Form.Field>
            <Input
              fluid
              icon="mail"
              iconPosition="left"
              placeholder="邮箱"
              name="loginEmail"
              value={loginEmail}
              onChange={this.handleChange}
            />
            <Label basic color="red" pointing className={showLogEmailLabel ? styles.showLabel : styles.hideLabel}>邮箱格式不对！</Label>
          </Form.Field>
          <Form.Field>
            <Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="密码"
              type="password"
              name="loginPwd"
              value={loginPwd}
              onChange={this.handleChange}
            />
            <Label basic color="red" pointing className={showLogPwdLabel ? styles.showLabel : styles.hideLabel}>密码不能为空！</Label>
          </Form.Field>
          <Button
            color="teal"
            fluid
            size="large"
            onClick={this.handleLogin}
          >登录</Button>
        </Segment>
        {
          showLoginMsg ?
            <Message negative className={styles.message}>
              <Message.Header>登录反馈</Message.Header>
              <p>{loginMsg}</p>
            </Message> :
            null
        }
      </Form>
    );
    const signupCont = (
      <Form size="large">
        <Segment stacked>
          <Form.Field>
            <Input
              fluid
              icon="mail"
              iconPosition="left"
              placeholder="邮箱"
              name="signupEmail"
              value={signupEmail}
              onChange={this.handleChange}
            />
            <Label basic color="red" pointing className={showSigEmailLabel ? styles.showLabel : styles.hideLabel}>邮箱格式不对！</Label>
          </Form.Field>
          <Form.Field>
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="昵称"
              name="signupName"
              value={signupName}
              onChange={this.handleChange}
            />
            <Label basic color="red" pointing className={showSigNameLabel ? styles.showLabel : styles.hideLabel}>昵称不能为空！</Label>
          </Form.Field>
          <Form.Field>
            <Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="密码"
              type="password"
              name="signupPwd"
              value={signupPwd}
              onChange={this.handleChange}
            />
            <Label basic color="red" pointing className={showSigPwdLabel ? styles.showLabel : styles.hideLabel}>密码不能为空！</Label>
          </Form.Field>
          <Button
            color="teal"
            fluid
            size="large"
            onClick={this.handleSignup}
          >注册</Button>
        </Segment>
        {
          showSignupMsg ?
            <Message negative className={styles.message}>
              <Message.Header>注册反馈</Message.Header>
              <p>{signupMsg}</p>
            </Message> :
            null
        }
      </Form>
    );
    const panes = [
      { menuItem: "登录", render: () => loginCont },
      { menuItem: "注册", render: () => signupCont },
    ];
    return (
      <Container>
        <div className={styles.wrap}>
          <Header size='huge' color='teal' textAlign="center">趣聊</Header>
          <Tab menu={{ color: "teal", secondary: true, pointing: true }} panes={panes} />
        </div>
      </Container>
    );
  }
}

export default Login;
