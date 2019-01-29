import Validator from "../helpers/validator";
export const FETCH_PRODUCT_BRANDS = "FETCH_PRODUCT_BRANDS";
export const UPDATE_PRODUCT_BRAND_DETAILS = "UPDATE_PRODUCT_BRAND_DETAILS";
export const DELETE_PRODUCT_BRAND = "DELETE_PRODUCT_BRAND";


export function loadProductBrands(result) {
  return {
    type: FETCH_PRODUCT_BRANDS,
    payload: result,
  };
}

export function fetchProductBrands() {
  return dispatch => fetch(`${process.env.REACT_APP_PROD_API_URL}/brands/admin/?key=${process.env.REACT_APP_API_KEY}`,
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
      return dispatch(loadProductBrands(json));
    })
    .catch((error) => {
      dispatch(loadProductBrands({
        success: false,
        message: error.message,
      }));
    });
}

export function loadUpdatedProductBrandDetails(results) {
  return {
    type: UPDATE_PRODUCT_BRAND_DETAILS,
    payload: results,
  };
}

export function putProductBrandDetails(productBrandDetails, brandID) {
  return dispatch => fetch(`${process.env.REACT_APP_PROD_API_URL}/brands/${brandID}/?key=${process.env.REACT_APP_API_KEY}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Bearer ${JSON.parse(localStorage["bezop-login:admin"]).accessToken}`,
    },
    body: JSON.stringify(productBrandDetails),
  })
    .then(response => response.json())
    .then((json) => {
      if (Validator.propertyExist(json, "error")) {
        throw json.error;
      }
      return dispatch(loadUpdatedProductBrandDetails(json));
    })
    .catch((error) => {
      dispatch(loadUpdatedProductBrandDetails({
        success: false,
        message: error.message,
      }));
    });
}

export function loadDeleteProductBrand(results) {
  return {
    type: DELETE_PRODUCT_BRAND,
    payload: results,
  };
}

export function deleteProductBrand(brandID) {
  return dispatch => fetch(`${process.env.REACT_APP_PROD_API_URL}/brands/${brandID}/?key=${process.env.REACT_APP_API_KEY}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then(response => response.json())
    .then((json) => {
      if (Validator.propertyExist(json, "error")) {
        throw json.error;
      }
      return dispatch(loadDeleteProductBrand(json));
    })
    .catch((error) => {
      dispatch(loadDeleteProductBrand({
        success: false,
        message: error.message,
      }));
    });
}
