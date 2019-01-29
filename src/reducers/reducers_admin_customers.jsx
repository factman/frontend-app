// @desc customers reducers on the admin marketplace
// @author Sylvia Onwukwe
import {
  FETCH_CUSTOMERS,
  DELETE_CUSTOMERS,
} from "../actions/actions_admin_customers";

const adminCustomers = (state = {}, action) => {
  let output;
  let data;
  switch (action.type) {
    case FETCH_CUSTOMERS:
      data = action.payload.success ? action.payload.data : action.payload.message;
      output = { customers: data };
      break;
    case DELETE_CUSTOMERS:
      data = action.payload.success ? action.payload.data : action.payload.message;
      output = { deleteCustomers: data };
      break;
    default:
      output = state;
      break;
  }

  return output;
};

export default adminCustomers;
