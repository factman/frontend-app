import Validator from "../helpers/validator";

export const FETCH_VENDORS = "FETCH_VENDORS";
export const FETCH_PRODUCTS = "FETCH_PRODUCTS";
export const FETCH_CATEGORIES = "FETCH_CATEGORIES";
export const FETCH_BRANDS = "FETCH_BRANDS";
export const FETCH_BLOGS = "FETCH_BLOGS";

export function loadFetchedVendors(vendors) {
  return {
    type: FETCH_VENDORS,
    payload: vendors,
  };
}

export function fetchVendors(query) {
  return dispatch => fetch(`${process.env.REACT_APP_DEV_API_URL}/vendors/search/${query}&key=${process.env.REACT_APP_API_KEY}`, { method: "GET" })
    .then(response => response.json())
    .then((json) => {
      if (Validator.propertyExist(json, "error")) {
        throw json.error;
      }
      return dispatch(loadFetchedVendors(json));
    })
    .catch(error => (
      dispatch(loadFetchedVendors({
        success: false,
        message: error.message,
      }))
    ));
}

export function loadFetchedProducts(products) {
  return {
    type: FETCH_PRODUCTS,
    payload: products,
  };
}

export function fetchProducts(query) {
  return dispatch => fetch(`${process.env.REACT_APP_DEV_API_URL}/products/search/${query}&key=${process.env.REACT_APP_API_KEY}`, { method: "GET" })
    .then(response => response.json())
    .then((json) => {
      if (Validator.propertyExist(json, "error")) {
        throw json.error;
      }
      return dispatch(loadFetchedProducts(json));
    })
    .catch(error => (
      dispatch(loadFetchedProducts({
        success: false,
        message: error.message,
      }))
    ));
}

export function loadFetchedCategories(categories) {
  return {
    type: FETCH_CATEGORIES,
    payload: categories,
  };
}

export function fetchCategories(query) {
  return dispatch => fetch(`${process.env.REACT_APP_DEV_API_URL}/categories/search/${query}&key=${process.env.REACT_APP_API_KEY}`, { method: "GET" })
    .then(response => response.json())
    .then((json) => {
      if (Validator.propertyExist(json, "error")) {
        throw json.error;
      }
      return dispatch(loadFetchedCategories(json));
    })
    .catch(error => (
      dispatch(loadFetchedCategories({
        success: false,
        message: error.message,
      }))
    ));
}

export function loadFetchedBrands(brands) {
  return {
    type: FETCH_BRANDS,
    payload: brands,
  };
}

export function fetchBrands(query) {
  return dispatch => fetch(`${process.env.REACT_APP_DEV_API_URL}/brands/search/${query}&key=${process.env.REACT_APP_API_KEY}`, { method: "GET" })
    .then(response => response.json())
    .then((json) => {
      if (Validator.propertyExist(json, "error")) {
        throw json.error;
      }
      return dispatch(loadFetchedBrands(json));
    })
    .catch(error => (
      dispatch(loadFetchedBrands({
        success: false,
        message: error.message,
      }))
    ));
}

export function loadFetchedBlogs(blogs) {
  return {
    type: FETCH_BLOGS,
    payload: blogs,
  };
}

export function fetchBlogs(query) {
  return dispatch => fetch(`${process.env.REACT_APP_DEV_API_URL}/blogs/search/${query}&key=${process.env.REACT_APP_API_KEY}`, { method: "GET" })
    .then(response => response.json())
    .then((json) => {
      if (Validator.propertyExist(json, "error")) {
        throw json.error;
      }
      return dispatch(loadFetchedBlogs(json));
    })
    .catch(error => (
      dispatch(loadFetchedBlogs({
        success: false,
        message: error.message,
      }))
    ));
}
