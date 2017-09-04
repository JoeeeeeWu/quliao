import React, { Component } from "react";
import { connect } from "react-redux";
import immutable from "immutable";
import { Segment } from "semantic-ui-react";
import Message from "../Message";
import MyMessage from "../MyMessage";

import styles from "./message-list.less";

class MessageList extends Component {
  render() {
    const {
      user,
      messages,
      currentRoom,
    } = this.props;
    const currentMessages = messages.get(currentRoom.get("_id")) || immutable.List();
    return (
      <Segment className={styles.container}>
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

const mapStateToProps = state => ({
  user: state.user,
  messages: state.message,
  currentRoom: state.room.get("currentRoom"),
});

export default connect(mapStateToProps)(MessageList);

