// @desc the discount coupon action used by redux on admin marketplace
// @author Sylvia Onwukwe
export const FETCH_COUPONS = "FETCH_COUPONS";
export const DELETE_COUPON = "DELETE_COUPON";


export function loadCoupons(result) {
  return {
    type: FETCH_COUPONS,
    payload: result,
  };
}

export function fetchCoupons() {
  return dispatch => fetch(`${process.env.REACT_APP_PROD_API_URL}/coupons/admin/?key=${process.env.REACT_APP_API_KEY}`,
    {
      method: "GET",
      headers: {
        authorization: `Bearer ${JSON.parse(localStorage["bezop-login:admin"]).accessToken}`,
      },
    })
    .then(response => response.json())
    .then((json) => {
      dispatch(loadCoupons(json));
    })
    .catch(error => console.log(error));
}

export function loadDeleteCoupon(results) {
  return {
    type: DELETE_COUPON,
    payload: results,
  };
}

export function deleteCoupon(couponID) {
  console.log(couponID);
  return dispatch => fetch(`${process.env.REACT_APP_PROD_API_URL}/coupons/${couponID}/?key=${process.env.REACT_APP_API_KEY}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Bearer ${JSON.parse(localStorage["bezop-login:admin"]).accessToken}`,
    },
  })
    .then(response => response.json())
    .then((json) => {
      dispatch(loadDeleteCoupon(json));
    })
    .catch(error => console.log(error));
}
