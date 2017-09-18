import React, { PureComponent } from "react";
import { connect } from "react-redux";
import {
  Input,
  Segment,
} from "semantic-ui-react";
import immutable from "immutable";
import socketEmit from "../../common/socket-emit";
import showAlert from "../../common/showAlert";
import styles from "./send-input.less";

class SendInput extends PureComponent {

  state={
    content: "",
  }

  onChange=(event, { name, value }) => {
    this.setState({
      [name]: value,
    });
  }

  handleSend=() => {
    const { content } = this.state;
    const { currentRoom } = this.props;
    const roomId = currentRoom.get("_id");
    const token = localStorage.getItem("token");
    socketEmit("new message", {
      roomId,
      content,
      token,
    })
      .then((res) => {
        console.log("发送成功");
      })
      .catch((error) => {
        showAlert("发送消息失败！");
      });
    this.setState({
      content: "",
    });
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

const mapStateToProps = (state) => {
  const currentRoomIndex = state.room.get("joinedRooms").findIndex(joinedRoom => joinedRoom.get("_id") === state.room.get("currentRoomId"));
  return {
    currentRoom: state.room.getIn(["joinedRooms", currentRoomIndex]) || immutable.fromJS({ owner: {} }),
  };
};

export default connect(mapStateToProps)(SendInput);
