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
import MyInfoForm from "../../components/MyInfoForm";
import RoomMsgForm from "../../components/RoomMsgForm";
import CreateRoomForm from "../../components/CreateRoomForm";
import JoinRoomPanel from "../../components/JoinRoomPanel";

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
import socketEmit from "../../common/socket-emit";
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
        console.log(res);
        const {
          avatar,
          email,
          meta,
          name,
          _id,
          city,
          motto,
          joinedRooms,
        } = res;
        const user = {
          avatar,
          email,
          meta,
          name,
          _id,
          city,
          motto,
        };
        initMyInfo(immutable.fromJS(user));
        initJoinedRooms(immutable.fromJS(joinedRooms));
        let messages = immutable.Map();
        joinedRooms.forEach(({ _id: roomId }) => {
          messages = messages.set(roomId, immutable.List());
        });
        initMessages(messages);
        joinedRooms.forEach((joinedRoom) => {
          if (joinedRoom.name === "公共聊天室") {
            switchRoom(immutable.fromJS(joinedRoom));
          }
        });
      })
      .catch(error => console.log(error));
  }

  render() {
    const {
      joinedRooms,
      showRoomList,
      showCurrentRoomMsg,
      showMyInfo,
      showMyInfoForm,
      showRoomMsgForm,
      showCreateRoomForm,
      showSearchRoom,
    } = this.props;
    return (
      <Container>
        <Sidebar.Pushable as={Segment}>
          <Sidebar
            animation="overlay"
            width="wide"
            visible={showRoomList}
            className={styles.roomListSidebar}
          >
            <RoomPanel />
          </Sidebar>
          <Sidebar
            animation="overlay"
            width="wide"
            visible={showMyInfo}
            className={styles.myInfoSidebar}
          >
            <MyInfoPanel />
          </Sidebar>
          <Sidebar
            animation="overlay"
            width="wide"
            visible={showMyInfoForm}
            className={styles.myInfoFormSidebar}
          >
            <MyInfoForm />
          </Sidebar>
          <Sidebar
            animation="overlay"
            width="wide"
            visible={showCreateRoomForm}
            className={styles.createRoomFormSidebar}
          >
            <CreateRoomForm />
          </Sidebar>
          <Sidebar
            animation="overlay"
            width="wide"
            visible={showSearchRoom}
            className={styles.JoinRoomPanelSidebar}
          >
            <JoinRoomPanel />
          </Sidebar>
          <Sidebar
            animation="push"
            width="wide"
            direction="right"
            visible={showCurrentRoomMsg}
            className={styles.currentRoomSidebar}
          >
            <RoomMsgPanel />
          </Sidebar>
          <Sidebar
            animation="push"
            width="wide"
            direction="right"
            visible={showRoomMsgForm}
            className={styles.roomMsgFormSidebar}
          >
            <RoomMsgForm />
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
  showMyInfoForm: state.layout.get("showMyInfoForm"),
  showRoomMsgForm: state.layout.get("showRoomMsgForm"),
  showCreateRoomForm: state.layout.get("showCreateRoomForm"),
  showSearchRoom: state.layout.get("showSearchRoom"),
});


export default connect(mapStateToProps, {
  initMyInfo,
  initJoinedRooms,
  initMessages,
  switchRoom,
})(Chat);
