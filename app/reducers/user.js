import { fromJS } from "immutable";

const INITIAL_STATE = fromJS({});

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default user;
