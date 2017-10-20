import React, { Component } from "react";
import { immutableRenderDecorator } from "react-immutable-render-mixin";
import { Image } from "semantic-ui-react";
import { connect } from "react-redux";
import moment from "moment";
import { switchRoom } from "../../action-creators/room";
import styles from "./room.less";

@immutableRenderDecorator
class Room extends Component {

  handleClick=() => {
    const { joinedRoom, switchRoom } = this.props;
    switchRoom(joinedRoom.get("_id"));
  }

  render() {
    const {
      joinedRoom,
      currentRoom,
      messages,
    } = this.props;
    const lastMessage =
      messages.getIn([joinedRoom.get("_id"), -1, "content"]) ?
        `${messages.getIn([joinedRoom.get("_id"), -1, "from", "name"])}：${messages.getIn([joinedRoom.get("_id"), -1, "content"])}` :
        "暂无消息";
    const lastTime =
      messages.getIn([joinedRoom.get("_id"), -1, "createAt"]) ?
        moment(messages.getIn([joinedRoom.get("_id"), -1, "createAt"])).format("MM-DD HH:mm") :
        null;
    const isCurrentRoom = joinedRoom.get("_id") === currentRoom.get("_id");
    return (
      <div className={`${styles.container} ${isCurrentRoom ? styles.active : null}`} onClick={this.handleClick} role="presentation">
        <Image className={styles.avatar} size="mini" shape="rounded" src={joinedRoom.get("avatar")} />
        <div className={styles.detail}>
          <div className={styles.name}>
            {joinedRoom.get("name")}
            <span className={styles.time}>{lastTime}</span>
          </div>
          <div className={styles.message}>{lastMessage}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const currentRoomIndex = state.room.get("joinedRooms").findIndex(joinedRoom => joinedRoom.get("_id") === state.room.get("currentRoomId"));
  return {
    currentRoom: state.room.getIn(["joinedRooms", currentRoomIndex]),
    messages: state.message,
  };
};

export default connect(mapStateToProps, { switchRoom })(Room);
