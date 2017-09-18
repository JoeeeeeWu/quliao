import React, { PureComponent } from "react";
import { connect } from "react-redux";
import {
  Segment,
} from "semantic-ui-react";
import Room from "../Room";

import styles from "./room-list.less";

class RoomList extends PureComponent {

  render() {
    const { joinedRooms } = this.props;
    return (
      <Segment className={styles.container}>
        {
          joinedRooms.map(joinedRoom => <Room key={joinedRoom.get("_id")} joinedRoom={joinedRoom} />)
        }
      </Segment>
    );
  }
}

const mapStateToProps = state => ({
  joinedRooms: state.room.get("joinedRooms"),
});

export default connect(mapStateToProps)(RoomList);
