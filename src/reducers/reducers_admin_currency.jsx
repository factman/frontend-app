// @desc currency reducers on the admin marketplace
// @author Sylvia Onwukwe
import {
  POST_STORE_CURRENCY,
  FETCH_STORE_CURRENCIES,
  UPDATE_STORE_CURRENCY,
  DELETE_STORE_CURRENCY,
} from "../actions/actions_admin_currency";

import {
  PUT_IMAGE,
} from "../actions/actions_imageupload";

const adminCurrency = (state = {}, action) => {
  let output;
  let data;
  switch (action.type) {
    case POST_STORE_CURRENCY:
      data = action.payload.success ? action.payload.data : action.payload.message;
      output = { addCurrency: data };
      break;
    case FETCH_STORE_CURRENCIES:
      data = action.payload.success ? action.payload.data : action.payload.message;
      output = { currencies: data };
      break;
    case UPDATE_STORE_CURRENCY:
      data = action.payload.success ? action.payload.data : action.payload.message;
      output = { updateCurrency: data };
      break;
    case DELETE_STORE_CURRENCY:
      data = action.payload.success ? action.payload.data : action.payload.message;
      output = { deleteCurrency: data };
      break;
    case PUT_IMAGE:
      data = action.payload.success ? action.payload.data : action.payload.message;
      output = { updateImage: data };
      break;
    default:
      output = state;
      break;
  }

  return output;
};

export default adminCurrency;
