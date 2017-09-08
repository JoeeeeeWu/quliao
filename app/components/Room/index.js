import React, { Component } from "react";
import {
  Image,
  Header,
} from "semantic-ui-react";
import { connect } from "react-redux";
import {
  switchRoom,
} from "../../action-creators/room";

import styles from "./room.less";

class Room extends Component {

  handleClick=() => {
    const {
      joinedRoom,
      switchRoom,
    } = this.props;
    switchRoom(joinedRoom);
  }

  render() {
    const {
      joinedRoom,
      currentRoom,
    } = this.props;
    const isCurrentRoom = joinedRoom.get("_id") === currentRoom.get("_id");
    return (
      <div className={`${styles.container} ${isCurrentRoom ? styles.active : null}`} onClick={this.handleClick} role="presentation">
        <Image className={styles.avatar} size="mini" shape="rounded" src={joinedRoom.get("avatar")} />
        <div className={styles.detail}>
          <div className={styles.name}>{joinedRoom.get("name")}</div>
          <div className={styles.message}>暂无消息</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentRoom: state.room.get("currentRoom"),
});

export default connect(mapStateToProps, {
  switchRoom,
})(Room);
