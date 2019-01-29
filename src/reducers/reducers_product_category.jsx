import {
  POST_PRODUCT_CATEGORY_DETAILS,
  FETCH_PRODUCT_CATEGORIES,
  UPDATE_PRODUCT_CATEGORY_DETAILS,
  DELETE_PRODUCT_CATEGORY,
} from "../actions/actions_product_category";

import { FETCH_PRODUCT_COLLECTIONS } from "../actions/actions_admin_productCategory";

import { PUT_IMAGE } from "../actions/actions_imageupload";

const productCategory = (state = {}, action) => {
  let output;
  let data;
  switch (action.type) {
    case POST_PRODUCT_CATEGORY_DETAILS:
      data = action.payload.success ? action.payload.data : action.payload.message;
      output = { addCategory: data };
      break;
    case FETCH_PRODUCT_CATEGORIES:
      data = action.payload.success ? action.payload.data : action.payload.message;
      output = { categories: data };
      break;
    case FETCH_PRODUCT_COLLECTIONS:
      data = action.payload.success ? action.payload.data : action.payload.message;
      output = { productCollections: data };
      break;
    case UPDATE_PRODUCT_CATEGORY_DETAILS:
      data = action.payload.success ? action.payload.data : action.payload.message;
      output = { updateCategory: data };
      break;
    case DELETE_PRODUCT_CATEGORY:
      data = action.payload.success ? action.payload.data : action.payload.message;
      output = { deleteCategory: data };
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

export default productCategory;
