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
  toggleRoomMsgForm,
} from "../../action-creators/layout";
import styles from "./room-msg-form.less";

class RoomMsgForm extends Component {

  state = {
    name: "",
    avatar: "",
    desc: "",
    declare: "",

    isLoading: false,
    showMessage: false,
    result: true,
  }

  componentWillReceiveProps = (nextProps) => {
    if (!immutable.is(this.props.currentRoom, nextProps.currentRoom)) {
      this.setState({
        name: nextProps.currentRoom.get("name"),
        avatar: nextProps.currentRoom.get("avatar"),
        desc: nextProps.currentRoom.get("desc"),
        declare: nextProps.currentRoom.get("declare"),
      });
    }
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
      currentRoom,
    } = this.props;
    const token = localStorage.getItem("token");
    this.setState({
      isLoading: true,
    });
    socketEmit("change room info", {
      token,
      ownerId: currentRoom.getIn(["owner", "_id"]),
      data: {
        _id: currentRoom.get("_id"),
        name,
        avatar,
        desc,
        declare,
      },
    })
      .then((res) => {
        this.setState({
          isLoading: false,
          showMessage: true,
          result: true,
        });
        console.log(res);
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
      toggleRoomMsgForm,
    } = this.props;
    return (
      <Segment className={styles.container} basic>
        <Segment className={styles.topbar} basic>
          <Header as="h3" className={styles.header}>
            修改聊天室资料
          </Header>
          <Button icon className={styles.closeBtn} color="red" onClick={toggleRoomMsgForm}>
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
          <Segment attached>
            <Header as="h4">
              聊天室名称
            </Header>
            <Input disabled={name === "公共聊天室"} fluid name="name" value={name} onChange={this.handleChange} />
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
                header="聊天室资料修改结果"
                content={result ? "聊天室资料修改成功！" : "聊天室资料修改失败，请重新尝试"}
              /> :
              null
          }
        </Dimmer.Dimmable>
      </Segment>
    );
  }
}

const mapStateToProps = state => ({
  currentRoom: state.room.get("currentRoom"),
});

export default connect(mapStateToProps, {
  toggleRoomMsgForm,
})(RoomMsgForm);
