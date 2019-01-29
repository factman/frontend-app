import { API_URL } from "../components/Auth/UsersAuth";

export const DEAL = "DEAL";
export const FEATURE = "FEATURE";
export const LATEST = "LATEST";
export const POPULAR = "POPULAR";
export const CART = "CART";
export const SINGLE = "SINGLE";
export const NORMAL = "NORMAL";

export function displayProducts(products, kind) {
  return {
    type: kind.toUpperCase(),
    payload: products,
    kind,
  };
}

export function getProductKind(vendor, kind) {
  return dispatch => fetch(`${API_URL}/products/vendor/${vendor}/${kind}/?key=${process.env.REACT_APP_API_KEY}`, { method: "GET" })
    .then((response) => {
      if (response.ok && response.status === 200) {
        return response.json();
      }
      return response.json();
    })
    .then((json) => {
      if (json.success && json.data.count > 0) {
        dispatch(displayProducts(json.data.result, kind));
      } else {
        throw new Error(json.message);
      }
    })
    .catch(error => console.log(error.message));
}

export function displayProductsById(products) {
  return {
    type: CART,
    payload: products,
  };
}

export function getProductsById(ids) {
  return dispatch => fetch(`${API_URL}/products/operations/${ids.join("/")}/?key=${process.env.REACT_APP_API_KEY}`)
    .then(response => response.json())
    .then((json) => {
      if (json.success && Object.keys(json.data).length > 0) {
        dispatch(displayProductsById(json.data));
      } else {
        throw new Error(json.message);
      }
    })
    .catch(error => console.log(error.message));
}

export function displayProductById(product) {
  return {
    type: SINGLE,
    payload: product,
  };
}

export function getProductById(id) {
  return dispatch => fetch(`${API_URL}/products/operations/${id}/?key=${process.env.REACT_APP_API_KEY}`)
    .then(response => response.json())
    .then((json) => {
      if (json.success && Object.keys(json.data).length > 0) {
        dispatch(displayProductById(json.data));
      } else {
        throw new Error(json.message);
      }
    })
    .catch(error => console.log(error.message));
}
