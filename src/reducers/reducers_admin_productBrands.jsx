// @desc product brand reducers used by redux on the admin marketplace
// @author Sylvia Onwukwe
import {
  FETCH_PRODUCT_BRANDS,
  DELETE_PRODUCT_BRAND,
} from "../actions/actions_admin_productBrands";

const adminBrand = (state = {}, action) => {
  let output;
  let data;
  switch (action.type) {
    case FETCH_PRODUCT_BRANDS:
      data = action.payload.success ? action.payload.data : action.payload.message;
      output = { brands: data };
      break;
    case DELETE_PRODUCT_BRAND:
      data = action.payload.success ? action.payload.data : action.payload.message;
      output = { deleteBrand: data };
      break;
    default:
      output = state;
      break;
  }

  return output;
};

export default adminBrand;
