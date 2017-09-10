import React, { Component } from "react";
import { connect } from "react-redux";
import immutable from "immutable";
import {
  Segment,
  Header,
  Button,
  Icon,
  Form,
  Dimmer,
  Loader,
  Message,
} from "semantic-ui-react";
import socketEmit from "../../common/socket-emit";
import { userAvatarOptions } from "../../common/const";
import { toggleMyInfoForm } from "../../action-creators/layout";
import { initMyInfo } from "../../action-creators/user";
import styles from "./my-info-form.less";

class MyInfoForm extends Component {

  state = {
    name: "",
    avatar: "",
    city: "",
    motto: "",

    isLoading: false,

    showMessage: false,
    result: true,
  }

  componentWillReceiveProps = (nextProps) => {
    if (!immutable.is(this.props.user, nextProps.user)) {
      this.setState({
        name: nextProps.user.get("name"),
        avatar: nextProps.user.get("avatar"),
        city: nextProps.user.get("city"),
        motto: nextProps.user.get("motto"),
      });
    }
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleSubmit = () => {
    const {
      name,
      avatar,
      city,
      motto,
    } = this.state;
    const {
      initMyInfo,
    } = this.props;
    const token = localStorage.getItem("token");
    this.setState({
      isLoading: true,
    });
    socketEmit("change my info", {
      token,
      data: {
        name,
        avatar,
        city,
        motto,
      },
    })
      .then((res) => {
        initMyInfo(immutable.fromJS(res));
        this.setState({
          isLoading: false,
          showMessage: true,
          result: true,
        });
      })
      .catch((error) => {
        this.setState({
          isLoading: false,
          showMessage: true,
          result: false,
        });
      });
  }

  render() {
    const {
      name,
      avatar,
      city,
      motto,
      isLoading,
      showMessage,
      result,
    } = this.state;
    const {
      user,
      toggleMyInfoForm,
    } = this.props;
    return (
      <Segment className={styles.container} basic>
        <Segment className={styles.topbar} basic>
          <Header as="h3" className={styles.header}>
            修改我的资料
          </Header>
          <Button icon className={styles.closeBtn} color="red" onClick={toggleMyInfoForm}>
            <Icon name="close" />
          </Button>
        </Segment>
        <Dimmer.Dimmable
          as={Segment}
          blurring
          className={styles.myInfoFormContainer}
          basic
          dimmed={isLoading}
        >
          <Dimmer active={isLoading} inverted>
            <Loader>正在修改中...</Loader>
          </Dimmer>
          <Form as={Segment}>
            <Form.Input label="昵称" fluid name="name" value={name} onChange={this.handleChange} />
            <Form.Dropdown
              label="头像"
              placeholder="请选择头像"
              fluid
              selection
              options={userAvatarOptions}
              name="avatar"
              value={avatar}
              onChange={this.handleChange}
            />
            <Form.Input label="所在城市" fluid name="city" value={city} onChange={this.handleChange} />
            <Form.TextArea label="签名" rows={3} name="motto" value={motto} onChange={this.handleChange} />
            <Button content="提交" color="teal" onClick={this.handleSubmit} />
          </Form>
          {
            showMessage ?
              <Message
                positive={result}
                negative={!result}
                icon={result ? "smile" : "frown"}
                header="修改结果"
                content={result ? "我的资料修改成功！" : "资料修改失败，请重新尝试"}
              /> :
              null
          }
        </Dimmer.Dimmable>
      </Segment>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps, {
  initMyInfo,
  toggleMyInfoForm,
})(MyInfoForm);
