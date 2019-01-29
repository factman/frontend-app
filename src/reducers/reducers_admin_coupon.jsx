// @desc discount coupon reducers on the admin marketplace
// @author Sylvia Onwukwe
import {
  FETCH_COUPONS,
  DELETE_COUPON,
} from "../actions/actions_admin_coupon";

import {
  FETCH_VENDORS,
} from "../actions/actions_admin_vendor";

const adminCoupon = (state = {}, action) => {
  let output;
  let data;
  switch (action.type) {
    case FETCH_COUPONS:
      data = action.payload.success ? action.payload.data : action.payload.message;
      output = { coupon: data };
      break;
    case FETCH_VENDORS:
      data = action.payload.success ? action.payload.data : action.payload.message;
      output = { vendors: data };
      break;
    case DELETE_COUPON:
      data = action.payload.success ? action.payload.data : action.payload.message;
      output = { deleteCoupon: data };
      break;
    default:
      output = state;
      break;
  }

  return output;
};

export default adminCoupon;
