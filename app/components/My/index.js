import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Segment,
  Header,
  Image,
  Button,
  Icon,
} from "semantic-ui-react";
import {
  toggleRoomList,
  toggleMyInfo,
} from "../../action-creators/layout";

import styles from "./my.less";

class My extends Component {
  render() {
    const {
      user,
      toggleRoomList,
      toggleMyInfo,
    } = this.props;
    return (
      <Segment className={styles.container}>
        <Header as="h3" className={styles.header}>
          <Image shape="circular" src={user.get("avatar")} onClick={() => toggleMyInfo()} />
          {user.get("name")}
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
});

export default connect(mapStateToProps, {
  toggleRoomList,
  toggleMyInfo,
})(My);
