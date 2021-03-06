import React, { Component } from "react";
import { immutableRenderDecorator } from "react-immutable-render-mixin";
import { connect } from "react-redux";
import {
  Card,
  Button,
  Image,
} from "semantic-ui-react";
import immutable from "immutable";
import moment from "moment";
import socketEmit from "../../common/socket-emit";
import { addRoomMsg, addRoomMember } from "../../action-creators/room";
import { initMessages } from "../../action-creators/message";

@immutableRenderDecorator
class RoomCard extends Component {
  joinRoom = () => {
    const {
      room,
      addRoomMsg,
      addRoomMember,
      initMessages,
    } = this.props;
    const token = localStorage.getItem("token");
    const roomId = room.get("_id");
    socketEmit("add room member", {
      token,
      data: {
        roomId,
      },
    })
      .then((res) => {
        addRoomMsg(room);
        initMessages(room.get("_id"));
        addRoomMember(immutable.fromJS(res));
      })
      .catch(error => console.log(error));
  }

  render() {
    const { room, joinedRooms } = this.props;
    const isJoined = joinedRooms.some(joinedRoom => joinedRoom.get("_id") === room.get("_id"));
    return (
      <Card>
        <Card.Content>
          <Image floated="right" size="mini" src={room.get("avatar")} />
          <Card.Header>
            {room.get("name")}
          </Card.Header>
          <Card.Meta>
            {moment(room.getIn(["meta", "createAt"])).format("YYYY-MM-DD HH:mm")}
          </Card.Meta>
          <Card.Description>
            {room.get("desc")}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Button color="teal" disabled={isJoined} onClick={this.joinRoom}>
            {isJoined ? "已加入" : "加入"}
          </Button>
        </Card.Content>
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  joinedRooms: state.room.get("joinedRooms"),
});

export default connect(mapStateToProps, {
  addRoomMsg,
  addRoomMember,
  initMessages,
})(RoomCard);
