// @desc admin profile reducer used by redux
// @author Sylvia Onwukwe
import {
  UPDATE_ADMIN_PROFILE,
  FETCH_ADMIN_PROFILE,
} from "../actions/actions_admin_adminProfile";

const adminProfile = (state = {}, action) => {
  let output;
  let data;
  switch (action.type) {
    case UPDATE_ADMIN_PROFILE:
      data = action.payload.success ? action.payload.data : action.payload.message;
      output = { updateProfile: data };
      break;
    case FETCH_ADMIN_PROFILE:
      data = action.payload.success ? action.payload.data : action.payload.message;
      output = { getProfile: data };
      break;
    default:
      output = state;
      break;
  }
  return output;
};

export default adminProfile;
