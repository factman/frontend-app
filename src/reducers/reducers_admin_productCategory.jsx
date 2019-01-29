// @desc product category reducers used by redux on the admin marketplace
// @author Sylvia Onwukwe
import {
  FETCH_PRODUCT_COLLECTIONS,
  UPDATE_PRODUCT_CATEGORY_DETAILS,
  POST_PRODUCT_CATEGORY_DETAILS,
  DELETE_PRODUCT_CATEGORY,
} from "../actions/actions_admin_productCategory";

import { PUT_IMAGE } from "../actions/actions_imageupload";


const adminCategory = (state = {}, action) => {
  let output;
  let data;
  switch (action.type) {
    case FETCH_PRODUCT_COLLECTIONS:
      data = action.payload.success ? action.payload.data : action.payload.message;
      output = { categories: data };
      break;
    case POST_PRODUCT_CATEGORY_DETAILS:
      data = action.payload.success ? action.payload.data : action.payload.message;
      output = { addCategory: data };
      break;
    case UPDATE_PRODUCT_CATEGORY_DETAILS:
      data = action.payload.success ? action.payload.data : action.payload.message;
      output = { updateCategory: data };
      break;
    case PUT_IMAGE:
      output = { updateImage: action.payload.data };
      break;
    case DELETE_PRODUCT_CATEGORY:
      data = action.payload.success ? action.payload.data : action.payload.message;
      output = { deleteCategory: data };
      break;
    default:
      output = state;
      break;
  }

  return output;
};

export default adminCategory;
