import Validator from "../helpers/validator";
export const POST_PRODUCT_DETAILS = "POST_PRODUCT_DETAILS";
export const FETCH_PRODUCTS = "FETCH_PRODUCTS";
export const FETCH_APPROVED_PRODUCTS = "FETCH_APPROVED_PRODUCTS";
export const UPDATE_PRODUCT_DETAILS = "UPDATE_PRODUCT_DETAILS";
export const APPROVED_PRODUCT = "APPROVED_PRODUCT";
export const DELETE_PRODUCT = "DELETE_PRODUCT";

export function loadProducts(result) {
  return {
    type: FETCH_PRODUCTS,
    payload: result,
  };
}

export function fetchProducts(kind = "normal") {
  return dispatch => fetch(`${process.env.REACT_APP_DEV_API_URL}/products/vendor/${JSON.parse(localStorage["bezop-login:vendor"]).profile.domainName}/${kind}/?key=${process.env.REACT_APP_API_KEY}`,
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
      return dispatch(loadProducts(json));
    })
    .catch(error => (
      dispatch(loadProducts({
        success: false,
        message: error.message,
      }))
    ));
}

export function loadApprovedProducts(result) {
  return {
    type: FETCH_APPROVED_PRODUCTS,
    payload: result,
  };
}

export function fetchApprovedProducts() {
  return dispatch => fetch(`${process.env.REACT_APP_DEV_API_URL}/approvals/vendor/${JSON.parse(localStorage["bezop-login:vendor"]).profile.id}/?key=${process.env.REACT_APP_API_KEY}`,
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
      return dispatch(loadApprovedProducts(json));
    })
    .catch(error => (
      dispatch(loadApprovedProducts({
        success: false,
        message: error.message,
      }))
    ));
}


export function loadProductDetail(results) {
  return {
    type: POST_PRODUCT_DETAILS,
    payload: results,
  };
}


export function postProductDetails(productDetails) {
  return dispatch => fetch(`${process.env.REACT_APP_DEV_API_URL}/products/?key=${process.env.REACT_APP_API_KEY}`, {
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

export function loadUpdatedProductDetails(results) {
  return {
    type: UPDATE_PRODUCT_DETAILS,
    payload: results,
  };
}

export function putProductDetails(productDetails, productID) {
  return dispatch => fetch(`${process.env.REACT_APP_DEV_API_URL}/products/${productID}/?key=${process.env.REACT_APP_API_KEY}`, {
    method: "PUT",
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
      return dispatch(loadUpdatedProductDetails(json));
    })
    .catch(error => (
      dispatch(loadUpdatedProductDetails({
        success: false,
        message: error.message,
      }))
    ));
}

export function loadApprovedProduct(results) {
  return {
    type: APPROVED_PRODUCT,
    payload: results,
  };
}

export function approveProduct(productDetails) {
  return dispatch => fetch(`${process.env.REACT_APP_DEV_API_URL}/approvals/?key=${process.env.REACT_APP_API_KEY}`, {
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
      return dispatch(loadApprovedProduct(json));
    })
    .catch(error => (
      dispatch(loadApprovedProduct({
        success: false,
        message: error.message,
      }))
    ));
}

export function loadDeleteProduct(results) {
  return {
    type: DELETE_PRODUCT,
    payload: results,
  };
}

export function deleteProduct(productID) {
  return dispatch => fetch(`${process.env.REACT_APP_DEV_API_URL}/products/vendor/${productID}/?key=${process.env.REACT_APP_API_KEY}`, {
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
      return dispatch(loadDeleteProduct(json));
    })
    .catch(error => (
      dispatch(loadDeleteProduct({
        success: false,
        message: error.message,
      }))
    ));
}
