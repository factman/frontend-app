// @desc the admin profile reducers used by Redux
// @author Sylvia Onwukwe
import {
  FETCH_ADMIN_PROFILE_DETAILS,
  UPDATE_ADMIN_PROFILE,
  DELETE_ADMIN_PROFILE_DETAILS,
} from "../actions/actions_admin_profile";

const adminProfile = (state = {}, action) => {
  let output;
  let data;
  switch (action.type) {
    case FETCH_ADMIN_PROFILE_DETAILS:
      data = action.payload.success ? action.payload.data : action.payload.message;
      output = { profile: data };
      break;
    case UPDATE_ADMIN_PROFILE:
      data = action.payload.success ? action.payload.data : action.payload.message;
      output = { updateProfile: data };
      break;
    case DELETE_ADMIN_PROFILE_DETAILS:
      data = action.payload.success ? action.payload.data : action.payload.message;
      output = { deleteProfile: data };
      break;
    default:
      output = state;
      break;
  }

  return output;
};

export default adminProfile;
