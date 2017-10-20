import React, { Component } from "react";
import { immutableRenderDecorator } from "react-immutable-render-mixin";
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
  Input,
  Label,
  Dropdown,
} from "semantic-ui-react";
import socketEmit from "../../common/socket-emit";
import userAvatarOptions from "../../common/const";
import { toggleCreateRoomForm } from "../../action-creators/layout";
import { addRoomMsg } from "../../action-creators/room";
import { initMessages } from "../../action-creators/message";
import styles from "./create-room-form.less";

@immutableRenderDecorator
class CreateRoomForm extends Component {

  state = {
    name: "",
    avatar: "",
    desc: "",
    declare: "",

    isLoading: false,
    showMessage: false,
    result: true,

    showNameLabel: false,
    showAvatarLabel: false,
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleSubmit = () => {
    const {
      name,
      avatar,
      desc,
      declare,
    } = this.state;
    if (name.trim().length === 0) {
      this.setState({
        showNameLabel: true,
      });
      setTimeout(() => {
        this.setState({
          showNameLabel: false,
        });
      }, 5000);
      return;
    }
    if (!avatar) {
      this.setState({
        showAvatarLabel: true,
      });
      setTimeout(() => {
        this.setState({
          showAvatarLabel: false,
        });
      }, 5000);
      return;
    }
    const { addRoomMsg, initMessages } = this.props;
    const token = localStorage.getItem("token");
    this.setState({
      isLoading: true,
    });
    socketEmit("create room", {
      token,
      data: {
        name,
        avatar,
        desc,
        declare,
      },
    })
      .then((res) => {
        addRoomMsg(immutable.fromJS(res));
        initMessages(res._id);
        this.setState({
          isLoading: false,
          showMessage: true,
          result: true,
        });
        setTimeout(() => {
          this.setState({
            showMessage: false,
          });
        }, 5000);
      })
      .catch((error) => {
        this.setState({
          isLoading: false,
          showMessage: true,
          result: false,
        });
        setTimeout(() => {
          this.setState({
            showMessage: false,
          });
        }, 5000);
      });
  }

  render() {
    const {
      name,
      avatar,
      desc,
      declare,
      isLoading,
      showMessage,
      result,
      showNameLabel,
      showAvatarLabel,
    } = this.state;
    const {
      toggleCreateRoomForm,
    } = this.props;
    return (
      <Segment className={styles.container} basic>
        <Segment className={styles.topbar} basic>
          <Header as="h3" className={styles.header}>
            创建聊天室
          </Header>
          <Button icon className={styles.closeBtn} color="red" onClick={toggleCreateRoomForm}>
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
            <Loader>正在创建聊天室中...</Loader>
          </Dimmer>
          <Form as={Segment}>
            <Form.Field>
              <label>聊天室名称</label>
              <Input fluid name="name" value={name} onChange={this.handleChange} />
              <Label basic color="red" pointing className={showNameLabel ? styles.showNameLabel : styles.hideNameLabel}>聊天室头像不能为空！</Label>
            </Form.Field>
            <Form.Field>
              <label>聊天室头像</label>
              <Dropdown
                placeholder="请选择头像"
                fluid
                selection
                options={userAvatarOptions}
                name="avatar"
                value={avatar}
                onChange={this.handleChange}
              />
              <Label
                basic
                color="red"
                pointing
                className={showAvatarLabel ? styles.showAvatarLabel : styles.hideAvatarLabel}
              >
                聊天室头像不能为空！
              </Label>
            </Form.Field>
            <Form.TextArea label="聊天室简介" rows={3} name="desc" value={desc} onChange={this.handleChange} />
            <Form.TextArea label="聊天室公告" rows={3} name="declare" value={declare} onChange={this.handleChange} />
            <Button content="提交" color="teal" onClick={this.handleSubmit} />
          </Form>
          {
            showMessage ?
              <Message
                positive={result}
                negative={!result}
                attached
                icon={result ? "smile" : "frown"}
                header="聊天室创建结果"
                content={result ? "聊天室创建成功！" : "聊天室创建失败，可能是聊天室名字已存在或者网络不佳！"}
              /> :
              null
          }
        </Dimmer.Dimmable>
      </Segment>
    );
  }
}

export default connect(null, {
  toggleCreateRoomForm,
  addRoomMsg,
  initMessages,
})(CreateRoomForm);
