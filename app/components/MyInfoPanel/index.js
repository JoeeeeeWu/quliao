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
  toggleMyInfo,
} from "../../action-creators/layout";

import styles from "./my-info-panel.less";

class MyInfoPanel extends Component {
  render() {
    const {
      user,
      toggleMyInfo,
    } = this.props;
    return (
      <Segment className={styles.container} basic>
        <Segment className={styles.topbar} basic>
          <Header as="h3" className={styles.header}>
            我的资料
          </Header>
          <Button icon className={styles.closeBtn} color="red" onClick={() => toggleMyInfo()}>
            <Icon name="close" />
          </Button>
        </Segment>
        <Segment className={styles.myInfoContainer} basic>
          <Segment.Group className={styles.myInfo}>
            <Segment>
              <Header as="h4">
                <Image shape="circular" src={user.get("avatar")} />
                {user.get("name")}
              </Header>
            </Segment>
            <Segment>
              <Header as="h4">
                创建时间
                <Header.Subheader>
                  {moment(user.getIn(["meta", "createAt"])).format("YYYY-MM-DD HH:mm:ss")}
                </Header.Subheader>
              </Header>
            </Segment>
            <Segment>
              <Header as="h4">
                我的签名
                <Header.Subheader>
                  无论走过多少荒芜，我都不会迷路！
                </Header.Subheader>
              </Header>
            </Segment>
            <Segment>
              <Button content="修改个人信息" icon="write" color="teal" labelPosition="left" />
            </Segment>
            <Segment>
              <Button content="退出登录" icon="sign out" color="red" labelPosition="left" />
            </Segment>
          </Segment.Group>
        </Segment>
      </Segment>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps, {
  toggleMyInfo,
})(MyInfoPanel);
