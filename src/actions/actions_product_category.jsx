import Validator from "../helpers/validator";
export const POST_PRODUCT_CATEGORY_DETAILS = "POST_PRODUCT_CATEGORY_DETAILS";
export const FETCH_PRODUCT_CATEGORIES = "FETCH_PRODUCT_CATEGORIES";
export const UPDATE_PRODUCT_CATEGORY_DETAILS = "UPDATE_PRODUCT_CATEGORY_DETAILS";
export const DELETE_PRODUCT_CATEGORY = "DELETE_PRODUCT_CATEGORY";


export function loadProductCategories(result) {
  return {
    type: FETCH_PRODUCT_CATEGORIES,
    payload: result,
  };
}

export function fetchProductCategories() {
  return dispatch => fetch(`${process.env.REACT_APP_DEV_API_URL}/categories/vendor/${JSON.parse(localStorage["bezop-login:vendor"]).profile.domainName}/?key=${process.env.REACT_APP_API_KEY}`,
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
      return dispatch(loadProductCategories(json));
    })
    .catch(error => (
      dispatch(loadProductCategories({
        success: false,
        message: error.message,
      }))
    ));
}

export function loadProductCategoryDetail(results) {
  return {
    type: POST_PRODUCT_CATEGORY_DETAILS,
    payload: results,
  };
}


export function postProductCategoryDetails(productCategoryDetails) {
  return dispatch => fetch(`${process.env.REACT_APP_DEV_API_URL}/categories/vendor/category/?key=${process.env.REACT_APP_API_KEY}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Bearer ${JSON.parse(localStorage["bezop-login:vendor"]).accessToken}`,
    },
    body: JSON.stringify(productCategoryDetails),
  })
    .then(response => response.json())
    .then((json) => {
      if (Validator.propertyExist(json, "error")) {
        throw json.error;
      }
      return dispatch(loadProductCategoryDetail(json));
    })
    .catch(error => (
      dispatch(loadProductCategoryDetail({
        success: false,
        message: error.message,
      }))
    ));
}

export function loadUpdatedProductCategoryDetails(results) {
  return {
    type: UPDATE_PRODUCT_CATEGORY_DETAILS,
    payload: results,
  };
}

export function putProductCategoryDetails(productCategoryDetails, categoryID) {
  return dispatch => fetch(`${process.env.REACT_APP_DEV_API_URL}/categories/vendor/${categoryID}/?key=${process.env.REACT_APP_API_KEY}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Bearer ${JSON.parse(localStorage["bezop-login:vendor"]).accessToken}`,
    },
    body: JSON.stringify(productCategoryDetails),
  })
    .then(response => response.json())
    .then((json) => {
      if (Validator.propertyExist(json, "error")) {
        throw json.error;
      }
      return dispatch(loadUpdatedProductCategoryDetails(json));
    })
    .catch(error => (
      dispatch(loadUpdatedProductCategoryDetails({
        success: false,
        message: error.message,
      }))
    ));
}

export function loadDeleteProductCategory(results) {
  return {
    type: DELETE_PRODUCT_CATEGORY,
    payload: results,
  };
}

export function deleteProductCategory(categoryID) {
  return dispatch => fetch(`${process.env.REACT_APP_DEV_API_URL}/categories/${categoryID}/?key=${process.env.REACT_APP_API_KEY}`, {
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
      return dispatch(loadDeleteProductCategory(json));
    })
    .catch(error => (
      dispatch(loadDeleteProductCategory({
        success: false,
        message: error.message,
      }))
    ));
}
