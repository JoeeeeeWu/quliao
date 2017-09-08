import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Input,
  Segment,
} from "semantic-ui-react";
import socketEmit from "../../sockets/socket-emit";

import styles from "./send-input.less";

class SendInput extends Component {

  state={
    content: "",
  }

  onChange=(event, { name, value }) => {
    this.setState({
      [name]: value,
    });
  }

  handleSend=() => {
    const {
      content,
    } = this.state;
    const {
      currentRoom,
    } = this.props;
    const roomId = currentRoom.get("_id");
    const token = localStorage.getItem("token");
    socketEmit("new message", {
      roomId,
      content,
      token,
    })
      .then(res => console.log(res))
      .catch(error => console.log(error));
  }

  render() {
    const {
      content,
    } = this.state;
    return (
      <Segment>
        <Input
          className={styles.container}
          action={{
            color: "teal",
            content: "发送",
            onClick: this.handleSend,
          }}
          name="content"
          value={content}
          onChange={this.onChange}
          placeholder="请输入发送内容"
          fluid
        />
      </Segment>
    );
  }
}

const mapStateToProps = state => ({
  currentRoom: state.room.get("currentRoom"),
});

export default connect(mapStateToProps)(SendInput);
