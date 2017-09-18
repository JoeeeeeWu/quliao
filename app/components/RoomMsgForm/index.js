import React, { PureComponent } from "react";
import { connect } from "react-redux";
import immutable from "immutable";
import {
  Segment,
  Header,
  Button,
  Icon,
  Form,
  Dimmer,
  Loader,
  Message,
  Input,
  Label,
} from "semantic-ui-react";
import socketEmit from "../../common/socket-emit";
import userAvatarOptions from "../../common/const";
import { toggleRoomMsgForm } from "../../action-creators/layout";
import styles from "./room-msg-form.less";

class RoomMsgForm extends PureComponent {

  state = {
    name: "",
    avatar: "",
    desc: "",
    declare: "",

    isLoading: false,
    showMessage: false,
    result: true,

    showNameLabel: false,
  }

  componentWillReceiveProps = (nextProps) => {
    if (!immutable.is(this.props.currentRoom, nextProps.currentRoom)) {
      this.setState({
        name: nextProps.currentRoom.get("name"),
        avatar: nextProps.currentRoom.get("avatar"),
        desc: nextProps.currentRoom.get("desc"),
        declare: nextProps.currentRoom.get("declare"),
      });
    }
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleSubmit = () => {
    const {
      name,
      avatar,
      desc,
      declare,
    } = this.state;
    if (name.trim().length === 0) {
      this.setState({
        showNameLabel: true,
      });
      setTimeout(() => {
        this.setState({
          showNameLabel: false,
        });
      }, 5000);
      return;
    }
    const { currentRoom } = this.props;
    const token = localStorage.getItem("token");
    this.setState({
      isLoading: true,
    });
    socketEmit("change room info", {
      token,
      ownerId: currentRoom.getIn(["owner", "_id"]),
      data: {
        _id: currentRoom.get("_id"),
        name,
        avatar,
        desc,
        declare,
      },
    })
      .then((res) => {
        this.setState({
          isLoading: false,
          showMessage: true,
          result: true,
        });
        setTimeout(() => {
          this.setState({
            showMessage: false,
          });
        }, 5000);
      })
      .catch((error) => {
        this.setState({
          isLoading: false,
          showMessage: true,
          result: false,
        });
        setTimeout(() => {
          this.setState({
            showMessage: false,
          });
        }, 5000);
      });
  }

  render() {
    const {
      name,
      avatar,
      desc,
      declare,
      isLoading,
      showMessage,
      result,
      showNameLabel,
    } = this.state;
    const { toggleRoomMsgForm } = this.props;
    return (
      <Segment className={styles.container} basic>
        <Segment className={styles.topbar} basic>
          <Header as="h3" className={styles.header}>
            修改聊天室资料
          </Header>
          <Button icon className={styles.closeBtn} color="red" onClick={toggleRoomMsgForm}>
            <Icon name="close" />
          </Button>
        </Segment>
        <Dimmer.Dimmable
          as={Segment}
          blurring
          className={styles.myInfoFormContainer}
          basic
          dimmed={isLoading}
        >
          <Dimmer active={isLoading} inverted>
            <Loader>正在修改中...</Loader>
          </Dimmer>
          <Form as={Segment}>
            <Form.Field>
              <label>聊天室名称</label>
              <Input disabled={name === "公共聊天室"} fluid name="name" value={name} onChange={this.handleChange} />
              <Label basic color="red" pointing className={showNameLabel ? styles.showNameLabel : styles.hideNameLabel}>聊天室名称不能为空！</Label>
            </Form.Field>
            <Form.Dropdown
              label="聊天室头像"
              placeholder="请选择头像"
              fluid
              selection
              options={userAvatarOptions}
              name="avatar"
              value={avatar}
              onChange={this.handleChange}
            />
            <Form.TextArea label="聊天室简介" rows={3} name="desc" value={desc} onChange={this.handleChange} />
            <Form.TextArea label="聊天室公告" rows={3} name="declare" value={declare} onChange={this.handleChange} />
            <Button content="提交" color="teal" onClick={this.handleSubmit} />
          </Form>
          {
            showMessage ?
              <Message
                positive={result}
                negative={!result}
                attached
                icon={result ? "smile" : "frown"}
                header="聊天室资料修改结果"
                content={result ? "聊天室资料修改成功！" : "聊天室资料修改失败，请重新尝试"}
              /> :
              null
          }
        </Dimmer.Dimmable>
      </Segment>
    );
  }
}

const mapStateToProps = (state) => {
  const currentRoomIndex = state.room.get("joinedRooms").findIndex(joinedRoom => joinedRoom.get("_id") === state.room.get("currentRoomId"));
  return {
    currentRoom: state.room.getIn(["joinedRooms", currentRoomIndex]) || immutable.fromJS({ owner: {} }),
  };
};

export default connect(mapStateToProps, { toggleRoomMsgForm })(RoomMsgForm);
