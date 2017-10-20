import React, { Component } from "react";
import { immutableRenderDecorator } from "react-immutable-render-mixin";
import { connect } from "react-redux";
import {
  Segment,
  Header,
  Image,
  Button,
  Icon,
} from "semantic-ui-react";
import { toggleRoomList, toggleMyInfo } from "../../action-creators/layout";

import styles from "./my.less";

@immutableRenderDecorator
class My extends Component {
  render() {
    const {
      user,
      isOnline,
      toggleRoomList,
      toggleMyInfo,
    } = this.props;
    return (
      <Segment className={styles.container}>
        <Header as="h3" className={styles.header}>
          <Image className={styles.avatar} shape="circular" src={user.get("avatar")} onClick={() => toggleMyInfo()} />
          {`${user.get("name")} ${isOnline ? "在线" : "离线"}`}
        </Header>
        <Button icon className={styles.closeBtn} color="red" onClick={() => toggleRoomList()}>
          <Icon name="close" />
        </Button>
      </Segment>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  isOnline: state.layout.get("isOnline"),
});

export default connect(mapStateToProps, {
  toggleRoomList,
  toggleMyInfo,
})(My);
