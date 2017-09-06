import immutable from "immutable";
import store from "../store";

import { addMessage } from "../action-creators/message";

function messageSocket(socket) {
  socket.on("new message", (msg) => {
    store.dispatch(addMessage(immutable.fromJS(msg)));
  });
}

export default messageSocket;
