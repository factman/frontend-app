import {
  POST_ORDERS,
  FETCH_ORDERS,
} from "../actions/actions_order";

import { FETCH_PRODUCTS } from "../actions/actions_product";

const orders = (state = {}, action) => {
  let output;
  let data;
  switch (action.type) {
    case POST_ORDERS:
      data = action.payload.success ? action.payload.data : action.payload.message;
      output = { addOrders: data };
      break;
    case FETCH_ORDERS:
      data = action.payload.success ? action.payload.data : action.payload.message;
      output = { getAll: data };
      break;
    case FETCH_PRODUCTS:
      data = action.payload.success ? action.payload.data.result : action.payload.message;
      output = { getProducts: data };
      break;
    default:
      output = state;
      break;
  }

  return output;
};

export default orders;
