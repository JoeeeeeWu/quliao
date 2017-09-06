import React, { Component } from "react";
import { connect } from "react-redux";
import immutable from "immutable";
import {
  Segment,
  Header,
  Button,
  Icon,
  Form,
  Input,
  TextArea,
} from "semantic-ui-react";
import socketEmit from "../../sockets/socket-emit";
import {
  toggleMyInfoForm,
} from "../../action-creators/layout";
import {
  initMyInfo,
} from "../../action-creators/user";

import styles from "./my-info-form.less";

class MyInfoForm extends Component {

  state = {
    name: "",
    avatar: "",
    city: "",
    motto: "",
  }

  componentWillReceiveProps = (nextProps) => {
    if (!immutable.is(this.props.user, nextProps.user)) {
      this.setState({
        name: nextProps.user.get("name"),
        avatar: nextProps.user.get("avatar"),
        city: nextProps.user.get("city"),
        motto: nextProps.user.get("motto"),
      });
    }
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleSubmit = () => {
    const {
      name,
      avatar,
      city,
      motto,
    } = this.state;
    const {
      initMyInfo,
    } = this.props;
    const token = localStorage.getItem("token");
    socketEmit("change my info", {
      token,
      data: {
        name,
        avatar,
        city,
        motto,
      },
    })
      .then(res => initMyInfo(immutable.fromJS(res)))
      .catch(error => console.log(error));
  }

  render() {
    const {
      name,
      avatar,
      city,
      motto,
    } = this.state;
    const {
      user,
      toggleMyInfoForm,
    } = this.props;
    return (
      <Segment className={styles.container} basic>
        <Segment className={styles.topbar} basic>
          <Header as="h3" className={styles.header}>
            修改我的资料
          </Header>
          <Button icon className={styles.closeBtn} color="red" onClick={() => toggleMyInfoForm()}>
            <Icon name="close" />
          </Button>
        </Segment>
        <Segment className={styles.myInfoFormContainer} basic>
          <Segment.Group>
            <Segment>
              <Header as="h4">
                昵称
              </Header>
              <Input fluid name="name" value={name} onChange={this.handleChange} />
            </Segment>
            <Segment>
              <Header as="h4">
                头像
              </Header>
              <Input fluid name="avatar" value={avatar} onChange={this.handleChange} />
            </Segment>
            <Segment>
              <Header as="h4">
                所在城市
              </Header>
              <Input fluid name="city" value={city} onChange={this.handleChange} />
            </Segment>
            <Segment>
              <Header as="h4">
                签名
              </Header>
              <Form>
                <TextArea rows={3} name="motto" value={motto} onChange={this.handleChange} />
              </Form>
            </Segment>
            <Segment>
              <Button content="提交" color="teal" onClick={this.handleSubmit} />
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
  initMyInfo,
  toggleMyInfoForm,
})(MyInfoForm);
