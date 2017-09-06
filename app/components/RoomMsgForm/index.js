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
} from "semantic-ui-react";
import socketEmit from "../../sockets/socket-emit";
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
      .then(res => console.log(res))
      .catch(error => console.log(error));
  }

  render() {
    const {
      name,
      avatar,
      desc,
      declare,
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
        <Segment className={styles.myInfoFormContainer} basic>
          <Segment.Group>
            <Segment>
              <Header as="h4">
                聊天室名称
              </Header>
              <Input fluid name="name" value={name} onChange={this.handleChange} />
            </Segment>
            <Segment>
              <Header as="h4">
                聊天室头像
              </Header>
              <Input fluid name="avatar" value={avatar} onChange={this.handleChange} />
            </Segment>
            <Segment>
              <Header as="h4">
                聊天室简介
              </Header>
              <Form>
                <TextArea rows={3} name="desc" value={desc} onChange={this.handleChange} />
              </Form>
            </Segment>
            <Segment>
              <Header as="h4">
                聊天室公告
              </Header>
              <Form>
                <TextArea rows={3} name="declare" value={declare} onChange={this.handleChange} />
              </Form>
            </Segment>
            <Segment>
              <Button content="提交" color="teal" onClick={this.handleSubmit} />
            </Segment>
          </Segment.Group>
        </Segment>
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
