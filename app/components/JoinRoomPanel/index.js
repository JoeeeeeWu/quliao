import React, { PureComponent } from "react";
import { connect } from "react-redux";
import immutable from "immutable";
import {
  Segment,
  Header,
  Icon,
  Button,
  Input,
  Dimmer,
  Loader,
} from "semantic-ui-react";
import socketEmit from "../../common/socket-emit";
import showAlert from "../../common/showAlert";
import styles from "./join-room-panel.less";
import RoomCard from "../RoomCard";
import { toggleSearchRoom } from "../../action-creators/layout";

class JoinRoomPanel extends PureComponent {

  state = {
    name: "",
    rooms: immutable.List(),
    isLoading: false,
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
    this.setState({
      isLoading: true,
    });
    socketEmit("search rooms", {
      token,
      data: {
        name,
      },
    })
      .then((res) => {
        this.setState({
          rooms: immutable.fromJS(res),
          isLoading: false,
        });
      })
      .catch((error) => {
        showAlert("搜索聊天室遇到点问题！");
        this.setState({
          isLoading: false,
        });
      });
  }

  render() {
    const {
      name,
      rooms,
      isLoading,
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
              loading: isLoading,
              disabled: isLoading,
            }}
            name="name"
            value={name}
            onChange={this.onChange}
            placeholder="请输入聊天室名字"
            fluid
          />
        </Segment>
        <Dimmer.Dimmable
          as={Segment}
          blurring
          className={styles.myInfoFormContainer}
          basic
          dimmed={isLoading}
        >
          <Dimmer active={isLoading} inverted>
            <Loader>正在搜索中...</Loader>
          </Dimmer>
          {
            rooms.map(room => <RoomCard key={room.get("_id")} room={room} />)
          }
        </Dimmer.Dimmable>
      </Segment>
    );
  }
}

export default connect(null, {
  toggleSearchRoom,
})(JoinRoomPanel);
