import React, { PureComponent } from "react";
import {
  Image,
  Segment,
  Header,
} from "semantic-ui-react";
import moment from "moment";
import styles from "./my-message.less";

class MyMessage extends PureComponent {
  render() {
    const {
      message,
    } = this.props;
    return (
      <div className={styles.container}>
        <div className={styles.detail}>
          <Header as="h4" textAlign="right">
            {message.getIn(["from", "name"])}
            <Header.Subheader className={styles.time}>
              {moment(message.get("createAt")).format("MM-DD HH:mm")}
            </Header.Subheader>
          </Header>
          <Segment className={styles.content} floated="right" inverted color="teal" stacked>
            {message.get("content")}
          </Segment>
        </div>
        <Image className={styles.avatar} size="mini" shape="rounded" src={message.getIn(["from", "avatar"])} />
      </div>
    );
  }
}

export default MyMessage;
