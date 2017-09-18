import React from "react";
import { Segment } from "semantic-ui-react";

import RoomList from "../RoomList";
import My from "../My";
import AddRoom from "../AddRoom";
import JoinRoom from "../JoinRoom";

import styles from "./room-panel.less";

function RoomPanel() {
  return (
    <Segment.Group className={styles.container}>
      <My />
      <AddRoom />
      <JoinRoom />
      <RoomList />
    </Segment.Group>
  );
}

export default RoomPanel;
