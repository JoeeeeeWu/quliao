import React, { Component } from "react";
import { immutableRenderDecorator } from "react-immutable-render-mixin";
import {
  Image,
  Segment,
  Header,
  Popup,
  Card,
} from "semantic-ui-react";
import moment from "moment";
import styles from "./my-message.less";

@immutableRenderDecorator
class MyMessage extends Component {
  render() {
    const { message } = this.props;
    const popupContent = (
      <Card>
        <Card.Content>
          <Image floated='right' size='mini' src={message.getIn(["from", "avatar"])} />
          <Card.Header>
            {message.getIn(["from", "name"])}
          </Card.Header>
          <Card.Meta>
            {message.getIn(["from", "email"])}
          </Card.Meta>
          <Card.Description>
            {message.getIn(["from", "motto"])}
          </Card.Description>
        </Card.Content>
      </Card>
    );
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
        <Popup
          trigger={<Image className={styles.avatar} size="mini" shape="rounded" src={message.getIn(["from", "avatar"])} />}
          content={popupContent}
          on='click'
          hideOnScroll
          position='bottom right'
        />
      </div>
    );
  }
}

export default MyMessage;
