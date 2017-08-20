import { fromJS } from "immutable";

const INITIAL_STATE = fromJS({
  currentRoom: null,
  joinedRooms: [],
});

const room = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default room;
