import {
  POST_PRODUCT_STOCK_DETAILS,
  FETCH_PRODUCT_STOCKS,
} from "../actions/actions_product_stock";

import { FETCH_PRODUCTS } from "../actions/actions_product";

const productStock = (state = {}, action) => {
  let output;
  let data;
  switch (action.type) {
    case POST_PRODUCT_STOCK_DETAILS:
      data = action.payload.success ? action.payload.data : action.payload.message;
      output = { addProductStock: data };
      break;
    case FETCH_PRODUCT_STOCKS:
      data = action.payload.success ? action.payload.data : action.payload.message;
      output = { getProductStocks: data };
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

export default productStock;
