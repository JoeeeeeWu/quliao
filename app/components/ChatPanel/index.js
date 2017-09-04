import React, { Component } from "react";
import {
  Segment,
} from "semantic-ui-react";
import SendInput from "../SendInput";
import MessageList from "../MessageList";
import ChatHeader from "../ChatHeader";

import styles from "./chat-panel.less";

class ChatPanel extends Component {
  render() {
    return (
      <Segment.Group className={styles.container}>
        <ChatHeader />
        <MessageList />
        <SendInput />
      </Segment.Group>
    );
  }
}

export default ChatPanel;
