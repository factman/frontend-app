import {
  POST_PRODUCT_DETAILS,
  FETCH_PRODUCTS,
  UPDATE_PRODUCT_DETAILS,
  APPROVED_PRODUCT,
  FETCH_APPROVED_PRODUCTS,
  DELETE_PRODUCT,
} from "../actions/actions_product";

import { FETCH_PRODUCT_BRANDS } from "../actions/actions_product_brand";

import { FETCH_PRODUCT_CATEGORIES } from "../actions/actions_product_category";

import { PUT_IMAGE } from "../actions/actions_imageupload";

import { FETCH_PRODUCT_COLLECTIONS } from "../actions/actions_admin_productCategory";

const product = (state = {}, action) => {
  let output;
  let data;
  switch (action.type) {
    case POST_PRODUCT_DETAILS:
      data = action.payload.success ? action.payload.data : action.payload.message;
      output = { addProduct: data };
      break;
    case FETCH_PRODUCTS:
      data = action.payload.success ? action.payload.data.result : action.payload.message;
      output = { getAll: data };
      break;
    case FETCH_APPROVED_PRODUCTS:
      data = action.payload.success ? action.payload.data : action.payload.message;
      output = { getAll: data };
      break;
    case FETCH_PRODUCT_COLLECTIONS:
      data = action.payload.success ? action.payload.data : action.payload.message;
      output = { getProductCollections: data };
      break;
    case UPDATE_PRODUCT_DETAILS:
      data = action.payload.success ? action.payload.data : action.payload.message;
      output = { updateProduct: data };
      break;
    case DELETE_PRODUCT:
      data = action.payload.success ? action.payload.data : action.payload.message;
      output = { deleteProduct: data };
      break;
    case FETCH_PRODUCT_BRANDS:
      data = action.payload.success ? action.payload.data : action.payload.message;
      output = { productBrands: data };
      break;
    case FETCH_PRODUCT_CATEGORIES:
      data = action.payload.success ? action.payload.data : action.payload.message;
      output = { productCategories: data };
      break;
    case APPROVED_PRODUCT:
      data = action.payload.success ? action.payload.data : action.payload.message;
      output = { approvedProduct: data };
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

export default product;
