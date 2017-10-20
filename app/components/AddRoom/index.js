import React, { PureComponent } from "react";
import { connect } from "react-redux";
import {
  Segment,
  Button,
  Icon,
} from "semantic-ui-react";

import { toggleCreateRoomForm } from "../../action-creators/layout";

class AddRoom extends PureComponent {
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
