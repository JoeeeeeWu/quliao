import immutable from "immutable";
import PubSub from "pubsub-js";
import store from "../store";

import { addMessage } from "../action-creators/message";

function messageSocket(socket) {
  socket.on("new message", (msg) => {
    store.dispatch(addMessage(immutable.fromJS(msg)));
    PubSub.publish("scrollToBottom");
  });
}

export default messageSocket;
