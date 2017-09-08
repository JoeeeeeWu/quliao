import React, { Component } from "react";
import { connect } from "react-redux";
import immutable from "immutable";
import {
  Segment,
  Header,
  Image,
  Icon,
  Button,
  Input,
} from "semantic-ui-react";
import socketEmit from "../../sockets/socket-emit";
import styles from "./join-room-panel.less";
import RoomCard from "../RoomCard";
import { toggleSearchRoom } from "../../action-creators/layout";

class JoinRoomPanel extends Component {

  state = {
    name: "",
    rooms: immutable.List(),
  }

  onChange=(event, { name, value }) => {
    this.setState({
      [name]: value,
    });
  }

  handleSearch = () => {
    const token = localStorage.getItem("token");
    const {
      name,
    } = this.state;
    socketEmit("search rooms", {
      token,
      data: {
        name,
      },
    })
      .then(res => this.setState({
        rooms: immutable.fromJS(res),
      }))
      .catch(error => console.log(error));
  }

  render() {
    const {
      name,
      rooms,
    } = this.state;
    const {
      toggleSearchRoom,
    } = this.props;
    return (
      <Segment className={styles.container} basic>
        <Segment className={styles.topbar} basic>
          <Header as="h3" className={styles.header}>
            加入聊天室
          </Header>
          <Button icon className={styles.closeBtn} color="red" onClick={toggleSearchRoom}>
            <Icon name="close" />
          </Button>
        </Segment>
        <Segment className={styles.searchbar} basic>
          <Input
            action={{
              color: "teal",
              content: "搜索",
              onClick: this.handleSearch,
            }}
            name="name"
            value={name}
            onChange={this.onChange}
            placeholder="请输入聊天室名字"
            fluid
          />
        </Segment>
        <Segment className={styles.myInfoFormContainer} basic>
          {
            rooms.map(room => <RoomCard key={room.get("_id")} room={room} />)
          }
        </Segment>
      </Segment>
    );
  }
}

export default connect(null, {
  toggleSearchRoom,
})(JoinRoomPanel);
