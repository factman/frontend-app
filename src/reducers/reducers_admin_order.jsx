// @desc order reducers on the admin marketplace
// @author Sylvia Onwukwe
import {
  FETCH_ORDER,
  DELETE_ORDER,
} from "../actions/actions_admin_order";

const adminOrder = (state = {}, action) => {
  let output;
  let data;
  switch (action.type) {
    case FETCH_ORDER:
      data = action.payload.success ? action.payload.data : action.payload.message;
      output = { orders: data };
      break;
    case DELETE_ORDER:
      data = action.payload.success ? action.payload.data : action.payload.message;
      output = { deleteOrders: data };
      break;
    default:
      output = state;
      break;
  }

  return output;
};

export default adminOrder;
