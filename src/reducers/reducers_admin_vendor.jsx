import {
  FETCH_VENDORS,
  DELETE_VENDORS,
  PATCH_VENDOR,
  PATCH_APPROVAL_VENDOR,
} from "../actions/actions_admin_vendor";

const adminVendor = (state = {}, action) => {
  let output;
  let data;
  switch (action.type) {
    case FETCH_VENDORS:
      data = action.payload.success ? action.payload.data : action.payload.message;
      output = { vendors: data };
      break;
    case DELETE_VENDORS:
      data = action.payload.success ? action.payload.data : action.payload.message;
      output = { deleteVendors: data };
      break;
    case PATCH_VENDOR:
      data = action.payload.success ? action.payload.data : action.payload.message;
      output = { patchVendor: data };
      break;
    case PATCH_APPROVAL_VENDOR:
      data = action.payload.success ? action.payload.data : action.payload.message;
      output = { approvalVendor: data };
      break;
    default:
      output = state;
      break;
  }
  return output;
};

export default adminVendor;
