import {
  POST_COUPON_DETAILS,
  FETCH_COUPONS,
  UPDATE_COUPON_DETAILS,
  DELETE_COUPON,
} from "../actions/actions_vendor_coupon";

const coupon = (state = {}, action) => {
  let output;
  let data;
  switch (action.type) {
    case POST_COUPON_DETAILS:
      data = action.payload.success ? action.payload.data : action.payload.message;
      output = { addCoupon: data };
      break;
    case FETCH_COUPONS:
      data = action.payload.success ? action.payload.data : action.payload.message;
      output = { getCoupon: data };
      break;
    case UPDATE_COUPON_DETAILS:
      data = action.payload.success ? action.payload.data : action.payload.message;
      output = { updateCoupon: data };
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

export default coupon;
