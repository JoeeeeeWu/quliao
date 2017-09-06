import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Segment,
  Header,
  Image,
  Button,
  Icon,
} from "semantic-ui-react";
import moment from "moment";
import {
  toggleCurrentRoomMsg,
  toggleRoomMsgForm,
} from "../../action-creators/layout";

import styles from "./room-msg-panel.less";

class RoomMsgPanel extends Component {
  render() {
    const {
      currentRoom,
      toggleCurrentRoomMsg,
      toggleRoomMsgForm,
    } = this.props;
    return (
      <Segment basic className={styles.container}>
        <Segment basic className={styles.topbar}>
          <Header as="h3" className={styles.header}>
            聊天室资料
          </Header>
          <Button icon className={styles.closeBtn} color="red" onClick={() => toggleCurrentRoomMsg()}>
            <Icon name="close" />
          </Button>
        </Segment>
        <Segment basic className={styles.roomMsgContainer}>
          <Segment.Group>
            <Segment>
              <Header as="h4">
                <Image shape="circular" src={currentRoom.get("avatar")} />
                {currentRoom.get("name")}
              </Header>
            </Segment>
            <Segment>
              <Header as="h4">
                群主
              </Header>
              <div>
                <Image src={currentRoom.getIn(["owner", "avatar"])} avatar />
                <span>{currentRoom.getIn(["owner", "name"])}</span>
              </div>
            </Segment>
            <Segment>
              <Header as="h4">
                创建时间
              </Header>
              <p>{moment(currentRoom.getIn(["meta", "createAt"])).format("YYYY-MM-DD HH:mm:ss")}</p>
            </Segment>
            <Segment>
              <Header as="h4">
                聊天室简介
              </Header>
              <p>{currentRoom.get("desc")}</p>
            </Segment>
            <Segment>
              <Header as="h4">
                聊天室公告
              </Header>
              <p>{currentRoom.get("declare")}</p>
            </Segment>
            <Segment>
              <Button content="修改聊天室信息" icon="write" color="teal" labelPosition="left" onClick={toggleRoomMsgForm} />
            </Segment>
            <Segment>
              <Button content="退出聊天室" icon="close" color="red" labelPosition="left" />
            </Segment>
          </Segment.Group>
        </Segment>
      </Segment>
    );
  }
}

const mapStateToProps = state => ({
  currentRoom: state.room.get("currentRoom"),
});

export default connect(mapStateToProps, {
  toggleCurrentRoomMsg,
  toggleRoomMsgForm,
})(RoomMsgPanel);
