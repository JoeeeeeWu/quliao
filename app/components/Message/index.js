import React, { Component } from "react";
import {
  Image,
  Segment,
  Header,
} from "semantic-ui-react";
import moment from "moment";
import styles from "./message.less";

class Message extends Component {
  render() {
    const {
      message,
    } = this.props;
    return (
      <div className={styles.container}>
        <Image className={styles.avatar} size="mini" shape="rounded" src={message.getIn(["from", "avatar"])} />
        <div className={styles.detail}>
          <Header as="h4">
            {message.getIn(["from", "name"])}
            <Header.Subheader>
              {moment(message.get("cteateAt")).format("MM-DD HH:mm")}
            </Header.Subheader>
          </Header>
          <Segment className={styles.content} floated="left" stacked>
            {message.get("content")}
          </Segment>
        </div>
      </div>
    );
  }
}

export default Message;
