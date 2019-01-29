import Validator from "../helpers/validator";
export const POST_COUPON_DETAILS = "POST_COUPON_DETAILS";
export const FETCH_COUPONS = "FETCH_COUPONS";
export const UPDATE_COUPON_DETAILS = "UPDATE_COUPON_DETAILS";
export const DELETE_COUPON = "DELETE_COUPON";

export function loadCoupons(result) {
  return {
    type: FETCH_COUPONS,
    payload: result,
  };
}

export function fetchCoupons() {
  return dispatch => fetch(`${process.env.REACT_APP_DEV_API_URL}/coupons/vendor/?key=${process.env.REACT_APP_API_KEY}`,
    {
      method: "GET",
      headers: {
        authorization: `Bearer ${JSON.parse(localStorage["bezop-login:vendor"]).accessToken}`,
      },
    })
    .then(response => response.json())
    .then((json) => {
      if (Validator.propertyExist(json, "error")) {
        throw json.error;
      }
      return dispatch(loadCoupons(json));
    })
    .catch(error => (
      dispatch(loadCoupons({
        success: false,
        message: error.message,
      }))
    ));
}


export function loadCouponDetail(results) {
  return {
    type: POST_COUPON_DETAILS,
    payload: results,
  };
}


export function postCouponDetails(couponDetails) {
  return dispatch => fetch(`${process.env.REACT_APP_DEV_API_URL}/coupons/?key=${process.env.REACT_APP_API_KEY}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Bearer ${JSON.parse(localStorage["bezop-login:vendor"]).accessToken}`,
    },
    body: JSON.stringify(couponDetails),
  })
    .then(response => response.json())
    .then((json) => {
      if (Validator.propertyExist(json, "error")) {
        throw json.error;
      }
      return dispatch(loadCouponDetail(json));
    })
    .catch(error => (
      dispatch(loadCouponDetail({
        success: false,
        message: error.message,
      }))
    ));
}

export function loadUpdatedCouponDetails(results) {
  return {
    type: UPDATE_COUPON_DETAILS,
    payload: results,
  };
}

export function putCouponDetails(couponDetails, couponID) {
  return dispatch => fetch(`${process.env.REACT_APP_DEV_API_URL}/coupons/${couponID}/?key=${process.env.REACT_APP_API_KEY}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Bearer ${JSON.parse(localStorage["bezop-login:vendor"]).accessToken}`,
    },
    body: JSON.stringify(couponDetails),
  })
    .then(response => response.json())
    .then((json) => {
      if (Validator.propertyExist(json, "error")) {
        throw json.error;
      }
      return dispatch(loadUpdatedCouponDetails(json));
    })
    .catch(error => (
      dispatch(loadUpdatedCouponDetails({
        success: false,
        message: error.message,
      }))
    ));
}

export function loadDeleteCoupon(results) {
  return {
    type: DELETE_COUPON,
    payload: results,
  };
}

export function deleteCoupon(couponID) {
  return dispatch => fetch(`${process.env.REACT_APP_DEV_API_URL}/coupons/${couponID}/?key=${process.env.REACT_APP_API_KEY}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Bearer ${JSON.parse(localStorage["bezop-login:vendor"]).accessToken}`,
    },
  })
    .then(response => response.json())
    .then((json) => {
      if (Validator.propertyExist(json, "error")) {
        throw json.error;
      }
      return dispatch(loadDeleteCoupon(json));
    })
    .catch(error => (
      dispatch(loadDeleteCoupon({
        success: false,
        message: error.message,
      }))
    ));
}
