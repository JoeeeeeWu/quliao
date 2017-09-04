import React, { Component } from "react";
import {
  Segment,
  Button,
  Icon,
} from "semantic-ui-react";

class AddRoom extends Component {
  render() {
    return (
      <Segment>
        <Button content="创建聊天室" icon="add" color="teal" labelPosition="left" />
      </Segment>
    );
  }
}

export default AddRoom;
