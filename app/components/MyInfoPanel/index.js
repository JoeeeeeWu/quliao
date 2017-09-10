import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  Segment,
  Header,
  Image,
  Button,
  Icon,
  Modal,
} from "semantic-ui-react";
import moment from "moment";
import {
  toggleMyInfo,
  toggleMyInfoForm,
  initState,
} from "../../action-creators/layout";
import logout from "../../common/logout";
import styles from "./my-info-panel.less";

class MyInfoPanel extends PureComponent {

  state = {
    showLogoutModal: false,
  }

  openLogoutModal = () => {
    this.setState({
      showLogoutModal: true,
    });
  }

  closeLogoutModal = () => {
    this.setState({
      showLogoutModal: false,
    });
  }

  render() {
    const { showLogoutModal } = this.state;
    const {
      user,
      toggleMyInfo,
      toggleMyInfoForm,
      history,
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
          <Segment attached>
            <Header as="h4">
              <Image shape="circular" src={user.get("avatar")} />
              {user.get("name")}
            </Header>
          </Segment>
          <Segment attached>
            <Header as="h4">
              创建时间
            </Header>
            <p>{moment(user.getIn(["meta", "createAt"])).format("YYYY-MM-DD HH:mm:ss")}</p>
          </Segment>
          <Segment attached>
            <Header as="h4">
              所在城市
            </Header>
            <p>{user.get("city") || "暂无"}</p>
          </Segment>
          <Segment attached>
            <Header as="h4">
              我的签名
            </Header>
            <p>{user.get("motto") || "暂无"}</p>
          </Segment>
          <Segment attached>
            <Button content="修改个人信息" icon="write" color="teal" labelPosition="left" onClick={() => toggleMyInfoForm()} />
          </Segment>
          <Segment attached>
            <Modal
              trigger={<Button content="退出登录" icon="sign out" color="red" labelPosition="left" onClick={this.openLogoutModal} />}
              open={showLogoutModal}
              basic
              size="small"
            >
              <Header icon="hourglass half" content="您正在退出登录" />
              <Modal.Content>
                <p>您正在退出登录。您确定要退出登录吗？</p>
              </Modal.Content>
              <Modal.Actions>
                <Button color="red" inverted onClick={this.closeLogoutModal}>
                  <Icon name="remove" /> No
                </Button>
                <Button color="green" onClick={() => logout(history)} inverted>
                  <Icon name="checkmark" /> Got it
                </Button>
              </Modal.Actions>
            </Modal>
          </Segment>
        </Segment>
      </Segment>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

export default withRouter(connect(mapStateToProps, {
  toggleMyInfo,
  toggleMyInfoForm,
  initState,
})(MyInfoPanel));
