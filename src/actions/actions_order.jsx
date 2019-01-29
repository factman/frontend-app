import Validator from "../helpers/validator";
export const POST_ORDERS = "POST_ORDERS";
export const FETCH_ORDERS = "FETCH_ORDERS";

export function loadOrders(result) {
  return {
    type: FETCH_ORDERS,
    payload: result,
  };
}

export function fetchOrders() {
  return dispatch => fetch(`${process.env.REACT_APP_DEV_API_URL}/orders/vendor/?key=${process.env.REACT_APP_API_KEY}`,
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
      return dispatch(loadOrders(json));
    })
    .catch(error => (
      dispatch(loadOrders({
        success: false,
        message: error.message,
      }))
    ));
}


export function loadPostOrder(results) {
  return {
    type: POST_ORDERS,
    payload: results,
  };
}


export function postPostOrderDetails(productDetails) {
  return dispatch => fetch(`${process.env.REACT_APP_DEV_API_URL}/stocks/?key=${process.env.REACT_APP_API_KEY}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Bearer ${JSON.parse(localStorage["bezop-login:vendor"]).accessToken}`,
    },
    body: JSON.stringify(productDetails),
  })
    .then(response => response.json())
    .then((json) => {
      if (Validator.propertyExist(json, "error")) {
        throw json.error;
      }
      return dispatch(loadPostOrder(json));
    })
    .catch(error => (
      dispatch(loadPostOrder({
        success: false,
        message: error.message,
      }))
    ));
}
