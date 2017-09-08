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
    socketEmit("create room", {
      token,
      data: {
        name,
        avatar,
        desc,
        declare,
      },
    })
      .then(res => addRoomMsg(immutable.fromJS(res)))
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

export default connect(null, {
  toggleCreateRoomForm,
  addRoomMsg,
})(CreateRoomForm);
