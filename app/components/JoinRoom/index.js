import React, { Component } from "react";
import { immutableRenderDecorator } from "react-immutable-render-mixin";
import { connect } from "react-redux";
import {
  Segment,
  Button,
} from "semantic-ui-react";
import { toggleSearchRoom } from "../../action-creators/layout";

@immutableRenderDecorator
class JoinRoom extends Component {
  render() {
    const { toggleSearchRoom } = this.props;
    return (
      <Segment>
        <Button content="加入聊天室" icon="talk" color="teal" labelPosition="left" onClick={toggleSearchRoom} />
      </Segment>
    );
  }
}

export default connect(null, { toggleSearchRoom })(JoinRoom);
