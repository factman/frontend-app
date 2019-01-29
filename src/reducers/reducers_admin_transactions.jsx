// @desc transaction reducers on the admin marketplace
// @author Sylvia Onwukwe
import {
  FETCH_TRANSACTIONS,
  DELETE_TRANSACTIONS,
} from "../actions/actions_admin_transactions";

const adminTransaction = (state = {}, action) => {
  let output;
  let data;
  switch (action.type) {
    case FETCH_TRANSACTIONS:
      data = action.payload.success ? action.payload.data : action.payload.message;
      output = { transaction: data };
      break;
    case DELETE_TRANSACTIONS:
      data = action.payload.success ? action.payload.data : action.payload.message;
      output = { deleteTransactions: data };
      break;
    default:
      output = state;
      break;
  }

  return output;
};

export default adminTransaction;
