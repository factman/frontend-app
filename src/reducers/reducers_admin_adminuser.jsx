import {
  FETCH_ADMINS,
  DELETE_ADMINS,
  PATCH_ADMIN,
} from "../actions/actions_admin_adminusers";

const adminUser = (state = {}, action) => {
  let output;
  let data;
  switch (action.type) {
    case FETCH_ADMINS:
      data = action.payload.success ? action.payload.data : action.payload.message;
      output = { getAll: data };
      break;
    case DELETE_ADMINS:
      data = action.payload.success ? action.payload.data : action.payload.message;
      output = { deleteAdmins: data };
      break;
    case PATCH_ADMIN:
      data = action.payload.success ? action.payload.data : action.payload.message;
      output = { patchAdmin: data };
      break;
    default:
      output = state;
      break;
  }
  return output;
};

export default adminUser;
