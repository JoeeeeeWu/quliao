import React, { PureComponent } from "react";
import {
  Segment,
} from "semantic-ui-react";

import RoomList from "../RoomList";
import My from "../My";
import AddRoom from "../AddRoom";
import JoinRoom from "../JoinRoom";

import styles from "./room-panel.less";

class RoomPanel extends PureComponent {
  render() {
    return (
      <Segment.Group className={styles.container}>
        <My />
        <AddRoom />
        <JoinRoom />
        <RoomList />
      </Segment.Group>
    );
  }
}

export default RoomPanel;
