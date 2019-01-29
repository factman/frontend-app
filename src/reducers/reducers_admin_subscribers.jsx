// @desc subscribers list reducers on the admin marketplace
// @author Sylvia Onwukwe
import {
  FETCH_SUBSCRIBERS,
  DELETE_SUBSCRIBER,
} from "../actions/actions_admin_subscribers";

const subscriber = (state = {}, action) => {
  let output;
  let data;
  switch (action.type) {
    case FETCH_SUBSCRIBERS:
      data = action.payload.success ? action.payload.data : action.payload.message;
      output = { subscribers: data };
      break;
    case DELETE_SUBSCRIBER:
      data = action.payload.success ? action.payload.data : action.payload.message;
      output = { deleteSubscriber: data };
      break;
    default:
      output = state;
      break;
  }

  return output;
};

export default subscriber;
