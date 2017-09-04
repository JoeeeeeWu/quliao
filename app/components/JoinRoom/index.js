import React, { Component } from "react";
import {
  Segment,
  Button,
  Icon,
} from "semantic-ui-react";

class JoinRoom extends Component {
  render() {
    return (
      <Segment>
        <Button content="加入聊天室" icon="talk" color="teal" labelPosition="left" />
      </Segment>
    );
  }
}

export default JoinRoom;
