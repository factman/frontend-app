import {
  FETCH_PRODUCT,
  DELETE_PRODUCT,
  PATCH_PRODUCT,
} from "../actions/actions_admin_product";

import { FETCH_PRODUCT_BRANDS } from "../actions/actions_admin_productBrands";

import { FETCH_PRODUCT_COLLECTIONS } from "../actions/actions_admin_productCategory";

import { FETCH_VENDORS } from "../actions/actions_admin_vendor";

const adminProduct = (state = {}, action) => {
  let output;
  let data;
  switch (action.type) {
    case FETCH_PRODUCT:
      data = action.payload.success ? action.payload.data : action.payload.message;
      output = { getAll: data };
      break;
    case DELETE_PRODUCT:
      data = action.payload.success ? action.payload.data : action.payload.message;
      output = { deleteProducts: data };
      break;
    case FETCH_PRODUCT_BRANDS:
      data = action.payload.success ? action.payload.data : action.payload.message;
      output = { productBrands: data };
      break;
    case FETCH_PRODUCT_COLLECTIONS:
      data = action.payload.success ? action.payload.data : action.payload.message;
      output = { productCategories: data };
      break;
    case FETCH_VENDORS:
      data = action.payload.success ? action.payload.data : action.payload.message;
      output = { vendors: data };
      break;
    case PATCH_PRODUCT:
      data = action.payload.success ? action.payload.data : action.payload.message;
      output = { updatedAction: data };
      break;
    default:
      output = state;
      break;
  }
  return output;
};

export default adminProduct;
