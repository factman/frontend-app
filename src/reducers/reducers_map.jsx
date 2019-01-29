import { MAP } from "../actions/actions_map";

const map = (state = {
  map: {},
}, action) => {
  switch (action.type) {
    case MAP:
      return Object.assign({}, state, { map: action.payload });
    default:
      return state;
  }
};

export default map;
