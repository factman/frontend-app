import Validator from "../helpers/validator";
export const FETCH_PRODUCT = "FETCH_PRODUCT";
export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const PATCH_PRODUCT = "PATCH_PRODUCT";

export function loadProduct(result) {
  return {
    type: FETCH_PRODUCT,
    payload: result,
  };
}

export function fetchProduct() {
  return dispatch => fetch(`${process.env.REACT_APP_PROD_API_URL}/products/admin/?key=${process.env.REACT_APP_API_KEY}`,
    {
      method: "GET",
      headers: {
        authorization: `Bearer ${JSON.parse(localStorage["bezop-login:admin"]).accessToken}`,
      },
    })
    .then(response => response.json())
    .then((json) => {
      if (Validator.propertyExist(json, "error")) {
        throw json.error;
      }
      return dispatch(loadProduct(json));
    })
    .catch((error) => {
      dispatch(loadProduct({
        success: false,
        message: error.message,
      }));
    });
}

export function loadPatchedProducts(results) {
  return {
    type: PATCH_PRODUCT,
    payload: results,
  };
}

export function patchProduct(products, productID) {
  return dispatch => fetch(`${process.env.REACT_APP_PROD_API_URL}/admin/products/${productID}/?key=${process.env.REACT_APP_API_KEY}`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Bearer ${JSON.parse(localStorage["bezop-login:admin"]).accessToken}`,
    },
    body: JSON.stringify(products),
  })
    .then(response => response.json())
    .then((json) => {
      dispatch(loadPatchedProducts(json));
    })
    .catch((error) => {
      dispatch(loadPatchedProducts({
        success: false,
        message: error.message,
      }));
    });
}

export function loadDeleteProduct(results) {
  return {
    type: DELETE_PRODUCT,
    payload: results,
  };
}

export function deleteProduct(productID) {
  return dispatch => fetch(`${process.env.REACT_APP_PROD_API_URL}/products/${productID}/?key=${process.env.REACT_APP_API_KEY}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Bearer ${JSON.parse(localStorage["bezop-login:admin"]).accessToken}`,
    },
  })
    .then(response => response.json())
    .then((json) => {
      dispatch(loadDeleteProduct(json));
    })
    .catch((error) => {
      dispatch(loadDeleteProduct({
        success: false,
        message: error.message,
      }));
    });
}
