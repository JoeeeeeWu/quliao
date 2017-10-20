import React, { Component } from "react";
import { immutableRenderDecorator } from "react-immutable-render-mixin";
import { connect } from "react-redux";
import immutable from "immutable";
import { Segment, Button } from "semantic-ui-react";
import PubSub from "pubsub-js";
import socketEmit from "../../common/socket-emit";
import showAlert from "../../common/showAlert";
import Message from "../Message";
import MyMessage from "../MyMessage";
import { addMessageList } from "../../action-creators/message";
import styles from "./message-list.less";

@immutableRenderDecorator
class MessageList extends Component {
  state = {
    isLoading: false,
  }

  componentDidMount = () => {
    PubSub.subscribe("scrollToBottom", () => {
      const messageList = document.getElementsByClassName("message_list")[0];
      messageList.scrollTop = messageList.scrollHeight;
    });
  }

  getMoreMessages = () => {
    this.setState({
      isLoading: true,
    });
    const {
      currentRoom,
      messages,
      addMessageList,
    } = this.props;
    const roomId = currentRoom.get("_id");
    const time = messages.getIn([roomId, 0, "createAt"]) || Date.now();
    const token = localStorage.getItem("token");
    socketEmit("get history messages", {
      token,
      data: {
        roomId,
        time,
        num: 5,
      },
    })
      .then((res) => {
        this.setState({
          isLoading: false,
        });
        addMessageList(immutable.fromJS({
          roomId,
          messageList: res,
        }));
      })
      .catch((error) => {
        this.setState({
          isLoading: false,
        });
        showAlert("获取历史消息失败！");
      });
  }

  render() {
    const { isLoading } = this.state;
    const {
      user,
      messages,
      currentRoom,
    } = this.props;
    const currentMessages = messages.get(currentRoom.get("_id")) || immutable.List();
    return (
      <Segment className={`message_list ${styles.container}`}>
        <Button
          loading={isLoading}
          disabled={isLoading}
          basic
          fluid
          onClick={this.getMoreMessages}
        >点击加载历史消息</Button>
        {
          currentMessages.map((message) => {
            const userId = user.get("_id");
            const fromId = message.getIn(["from", "_id"]);
            const isSelf = userId === fromId;
            return (
              isSelf ?
                <MyMessage key={message.get("_id")} message={message} /> :
                <Message key={message.get("_id")} message={message} />
            );
          })
        }
      </Segment>
    );
  }
}

const mapStateToProps = (state) => {
  const currentRoomIndex = state.room.get("joinedRooms").findIndex(joinedRoom => joinedRoom.get("_id") === state.room.get("currentRoomId"));
  return {
    user: state.user,
    messages: state.message,
    currentRoom: state.room.getIn(["joinedRooms", currentRoomIndex]) || immutable.fromJS({ owner: {} }),
  };
};

export default connect(mapStateToProps, { addMessageList })(MessageList);

