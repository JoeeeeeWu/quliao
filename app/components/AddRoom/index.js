import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Segment,
  Button,
} from "semantic-ui-react";
import { immutableRenderDecorator } from "react-immutable-render-mixin";

import { toggleCreateRoomForm } from "../../action-creators/layout";

@immutableRenderDecorator
class AddRoom extends Component {
  render() {
    const { toggleCreateRoomForm } = this.props;
    return (
      <Segment>
        <Button
          content="创建聊天室"
          icon="add"
          color="teal"
          labelPosition="left"
          onClick={toggleCreateRoomForm}
        />
      </Segment>
    );
  }
}

export default connect(null, {
  toggleCreateRoomForm,
})(AddRoom);
