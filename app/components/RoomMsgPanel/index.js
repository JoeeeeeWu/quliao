import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Segment,
  Header,
  Image,
  Button,
  Icon,
  Label,
  Modal,
} from "semantic-ui-react";
import moment from "moment";
import socketEmit from "../../common/socket-emit";
import {
  toggleCurrentRoomMsg,
  toggleRoomMsgForm,
} from "../../action-creators/layout";

import styles from "./room-msg-panel.less";

class RoomMsgPanel extends Component {

  state = {
    showDismissModal: false,
    showQuitModal: false,
  }

  openDismissModal = () => {
    this.setState({
      showDismissModal: true,
    });
  }

  closeDismissModal = () => {
    this.setState({
      showDismissModal: false,
    });
  }

  openQuitModal = () => {
    this.setState({
      showQuitModal: true,
    });
  }

  closeQuitModal = () => {
    this.setState({
      showQuitModal: false,
    });
  }

  dismissRoom = () => {
    const { currentRoom } = this.props;
    const token = localStorage.getItem("token");
    const roomId = currentRoom.get("_id");
    socketEmit("remove room", {
      token,
      data: {
        roomId,
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch(error => console.log(error));
  }

  quitRoom = () => {
    const { currentRoom } = this.props;
    const token = localStorage.getItem("token");
    const roomId = currentRoom.get("_id");
    socketEmit("leave room", {
      token,
      data: {
        roomId,
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch(error => console.log(error));
  }

  render() {
    const {
      showDismissModal,
      showQuitModal,
    } = this.state;
    const {
      currentRoom,
      toggleCurrentRoomMsg,
      toggleRoomMsgForm,
      user,
    } = this.props;
    const isOwner = user.get("_id") === currentRoom.getIn(["owner", "_id"]);
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
          <Segment attached>
            <Header as="h4">
              <Image shape="circular" src={currentRoom.get("avatar")} />
              {currentRoom.get("name")}
            </Header>
          </Segment>
          <Segment attached>
            <Header as="h4">
              群主
            </Header>
            <div>
              <Image src={currentRoom.getIn(["owner", "avatar"])} avatar />
              <span>{currentRoom.getIn(["owner", "name"])}</span>
            </div>
          </Segment>
          <Segment attached>
            <Header as="h4">
              创建时间
            </Header>
            <p>{moment(currentRoom.getIn(["meta", "createAt"])).format("YYYY-MM-DD HH:mm:ss")}</p>
          </Segment>
          <Segment attached>
            <Header as="h4">
              聊天室简介
            </Header>
            <p>{currentRoom.get("desc")}</p>
          </Segment>
          <Segment attached>
            <Header as="h4">
              聊天室公告
            </Header>
            <p>{currentRoom.get("declare")}</p>
          </Segment>
          <Segment attached>
            <Header as="h4">
              聊天室成员
            </Header>
            <Label.Group>
              {
                currentRoom.get("members") && currentRoom.get("members").map(member => (
                  <Label key={member.get("_id")} image color={currentRoom.getIn(["owner", "_id"]) === member.get("_id") ? "orange" : "teal"}>
                    <img src={member.get("avatar")} alt={member.get("name")} />
                    {member.get("name")}
                  </Label>
                ))
              }
            </Label.Group>
          </Segment>
          {
            isOwner ?
              <Segment attached>
                <Button content="修改聊天室信息" icon="write" color="teal" labelPosition="left" onClick={toggleRoomMsgForm} />
              </Segment> :
              null
          }
          <Segment attached>
            {
              isOwner ?
                <Modal
                  trigger={<Button disabled={currentRoom.get("name") === "公共聊天室"} content="解散聊天室" icon="trash" color="red" labelPosition="left" onClick={this.openDismissModal} />}
                  open={showDismissModal}
                  basic
                  size="small"
                >
                  <Header icon="hourglass half" content="您正在解散该聊天室" />
                  <Modal.Content>
                    <p>您是该聊天室的群主，您正在解散该聊天室，解散后所有人都会退出该聊天室且不可恢复。您确定要解散吗？</p>
                  </Modal.Content>
                  <Modal.Actions>
                    <Button color="red" inverted onClick={this.closeDismissModal}>
                      <Icon name="remove" /> No
                    </Button>
                    <Button color="green" onClick={this.dismissRoom} inverted>
                      <Icon name="checkmark" /> Got it
                    </Button>
                  </Modal.Actions>
                </Modal> :
                <Modal
                  trigger={<Button content="退出聊天室" icon="close" color="red" labelPosition="left" onClick={this.openQuitModal} />}
                  open={showQuitModal}
                  basic
                  size="small"
                >
                  <Header icon="hourglass half" content="您正在退出聊天室" />
                  <Modal.Content>
                    <p>您正在退出该聊天室，退出后将无法再接收到该聊天室的消息。您确定要退出吗？</p>
                  </Modal.Content>
                  <Modal.Actions>
                    <Button color="red" inverted onClick={this.closeQuitModal}>
                      <Icon name="remove" /> No
                    </Button>
                    <Button color="green" onClick={this.quitRoom} inverted>
                      <Icon name="checkmark" /> Got it
                    </Button>
                  </Modal.Actions>
                </Modal>
            }
          </Segment>
        </Segment>
      </Segment>
    );
  }
}

const mapStateToProps = state => ({
  currentRoom: state.room.get("currentRoom"),
  user: state.user,
});

export default connect(mapStateToProps, {
  toggleCurrentRoomMsg,
  toggleRoomMsgForm,
})(RoomMsgPanel);
