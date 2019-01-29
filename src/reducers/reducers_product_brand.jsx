import {
  POST_PRODUCT_BRAND_DETAILS,
  FETCH_PRODUCT_BRANDS,
  UPDATE_PRODUCT_BRAND_DETAILS,
  DELETE_PRODUCT_BRAND,
} from "../actions/actions_product_brand";

import { PUT_IMAGE } from "../actions/actions_imageupload";

const productBrand = (state = {}, action) => {
  let output;
  let data;
  switch (action.type) {
    case POST_PRODUCT_BRAND_DETAILS:
      data = action.payload.success ? action.payload.data : action.payload.message;
      output = { addBrand: data };
      break;
    case FETCH_PRODUCT_BRANDS:
      data = action.payload.success ? action.payload.data : action.payload.message;
      output = { brands: data };
      break;
    case UPDATE_PRODUCT_BRAND_DETAILS:
      data = action.payload.success ? action.payload.data : action.payload.message;
      output = { updateBrand: data };
      break;
    case DELETE_PRODUCT_BRAND:
      data = action.payload.success ? action.payload.data : action.payload.message;
      output = { deleteBrand: data };
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

export default productBrand;
