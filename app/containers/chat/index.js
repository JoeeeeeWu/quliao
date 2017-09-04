import React, { Component } from "react";
import { connect } from "react-redux";
import immutable from "immutable";
import {
  Container,
  Sidebar,
  Segment,
} from "semantic-ui-react";

import ChatPanel from "../../components/ChatPanel";
import RoomPanel from "../../components/RoomPanel";
import RoomMsgPanel from "../../components/RoomMsgPanel";
import MyInfoPanel from "../../components/MyInfoPanel";

import {
  initMyInfo,
} from "../../action-creators/user";
import {
  initJoinedRooms,
  switchRoom,
} from "../../action-creators/room";
import {
  initMessages,
} from "../../action-creators/message";
import socketEmit from "../../sockets/socket-emit";
import styles from "./chat.less";

class Chat extends Component {

  componentDidMount=() => {
    const {
      initMyInfo,
      initJoinedRooms,
      initMessages,
      switchRoom,
    } = this.props;
    const token = localStorage.getItem("token");
    socketEmit("myInfo", {
      token,
    })
      .then(res => {
        const {
          avatar,
          email,
          meta,
          name,
          _id,
          joinedRooms,
        } = res;
        const user = {
          avatar,
          email,
          meta,
          name,
          _id,
        };
        initMyInfo(immutable.Map(user));
        initJoinedRooms(immutable.fromJS(joinedRooms));
        let messages = immutable.Map();
        joinedRooms.forEach(({ _id: roomId }) => {
          messages = messages.set(roomId, immutable.List());
        });
        initMessages(messages);
        switchRoom(immutable.fromJS(joinedRooms[0]));
      })
      .catch();
  }

  render() {
    const {
      joinedRooms,
      showRoomList,
      showCurrentRoomMsg,
      showMyInfo,
    } = this.props;
    return (
      <Container>
        <Sidebar.Pushable as={Segment} className={styles.main}>
          <Sidebar
            animation="push"
            width="wide"
            visible={showRoomList}
            className={styles.roomListSidebar}
          >
            <RoomPanel />
          </Sidebar>
          <Sidebar
            animation="push"
            width="wide"
            visible={showMyInfo}
            className={styles.myInfoSidebar}
          >
            <MyInfoPanel />
          </Sidebar>
          <Sidebar
            animation="uncover"
            width="wide"
            direction="right"
            visible={showCurrentRoomMsg}
            className={styles.currentRoomSidebar}
          >
            <RoomMsgPanel />
          </Sidebar>
          <Sidebar.Pusher>
            <ChatPanel />
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  joinedRooms: state.room.get("joinedRooms"),
  currentRoom: state.room.get("currentRoom"),
  showRoomList: state.layout.get("showRoomList"),
  showCurrentRoomMsg: state.layout.get("showCurrentRoomMsg"),
  showMyInfo: state.layout.get("showMyInfo"),
});


export default connect(mapStateToProps, {
  initMyInfo,
  initJoinedRooms,
  initMessages,
  switchRoom,
})(Chat);
