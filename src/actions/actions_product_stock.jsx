import Validator from "../helpers/validator";
export const POST_PRODUCT_STOCK_DETAILS = "POST_PRODUCT_STOCK_DETAILS";
export const FETCH_PRODUCT_STOCKS = "FETCH_PRODUCT_STOCKS";

export function loadProductStocks(result) {
  return {
    type: FETCH_PRODUCT_STOCKS,
    payload: result,
  };
}

export function fetchProductStocks() {
  return dispatch => fetch(`${process.env.REACT_APP_DEV_API_URL}/stocks/vendor/?key=${process.env.REACT_APP_API_KEY}`,
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
      return dispatch(loadProductStocks(json));
    })
    .catch(error => (
      dispatch(loadProductStocks({
        success: false,
        message: error.message,
      }))
    ));
}


export function loadProductDetail(results) {
  return {
    type: POST_PRODUCT_STOCK_DETAILS,
    payload: results,
  };
}


export function postProductStockDetails(productDetails) {
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
      return dispatch(loadProductDetail(json));
    })
    .catch(error => (
      dispatch(loadProductDetail({
        success: false,
        message: error.message,
      }))
    ));
}
