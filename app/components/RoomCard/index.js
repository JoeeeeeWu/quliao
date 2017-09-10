import React, { PureComponent } from "react";
import { connect } from "react-redux";
import {
  Card,
  Button,
  Image,
} from "semantic-ui-react";
import immutable from "immutable";
import socketEmit from "../../common/socket-emit";
import {
  addRoomMsg,
  addRoomMember,
} from "../../action-creators/room";

class RoomCard extends PureComponent {

  joinRoom = () => {
    const {
      room,
      addRoomMsg,
      addRoomMember,
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
        addRoomMember(immutable.fromJS(res));
        console.log(res);
      })
      .catch(error => console.log(error));
  }

  render() {
    const {
      room,
      joinedRooms,
    } = this.props;
    const isJoined = joinedRooms.some(joinedRoom => joinedRoom.get("_id") === room.get("_id"));
    return (
      <Card>
        <Card.Content>
          <Image floated="right" size="mini" src={room.get("avatar")} />
          <Card.Header>
            {room.get("name")}
          </Card.Header>
          <Card.Meta>
            Friends Elliot
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
})(RoomCard);
