import React, { Component } from "react";
import { connect } from "react-redux";
import immutable from "immutable";
import {
  Segment,
  Header,
  Button,
  Icon,
  Form,
  Input,
  TextArea,
  Dimmer,
  Loader,
  Message,
} from "semantic-ui-react";
import socketEmit from "../../common/socket-emit";
import {
  toggleCreateRoomForm,
} from "../../action-creators/layout";
import {
  addRoomMsg,
} from "../../action-creators/room";
import styles from "./create-room-form.less";

class CreateRoomForm extends Component {

  state = {
    name: "",
    avatar: "",
    desc: "",
    declare: "",

    isLoading: false,
    showMessage: false,
    result: true,
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleSubmit = () => {
    const {
      name,
      avatar,
      desc,
      declare,
    } = this.state;
    const {
      addRoomMsg,
    } = this.props;
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
        console.error(error);
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
          <Segment attached>
            <Header as="h4">
              聊天室名称
            </Header>
            <Input fluid name="name" value={name} onChange={this.handleChange} />
          </Segment>
          <Segment attached>
            <Header as="h4">
              聊天室头像
            </Header>
            <Input fluid name="avatar" value={avatar} onChange={this.handleChange} />
          </Segment>
          <Segment attached>
            <Header as="h4">
              聊天室简介
            </Header>
            <Form>
              <TextArea rows={3} name="desc" value={desc} onChange={this.handleChange} />
            </Form>
          </Segment>
          <Segment attached>
            <Header as="h4">
              聊天室公告
            </Header>
            <Form>
              <TextArea rows={3} name="declare" value={declare} onChange={this.handleChange} />
            </Form>
          </Segment>
          <Segment attached>
            <Button content="提交" color="teal" onClick={this.handleSubmit} />
          </Segment>
          {
            showMessage ?
              <Message
                positive={result}
                negative={!result}
                attached
                icon={result ? "smile" : "frown"}
                header="聊天室创建结果"
                content={result ? "聊天室创建成功！" : "聊天室创建失败，请重新尝试"}
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
})(CreateRoomForm);
