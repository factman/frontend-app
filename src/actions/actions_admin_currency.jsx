export const POST_STORE_CURRENCY = "POST_STORE_CURRENCY";
export const FETCH_STORE_CURRENCIES = "FETCH_STORE_CURRENCIES";
export const UPDATE_STORE_CURRENCY = "UPDATE_STORE_CURRENCY";
export const DELETE_STORE_CURRENCY = "DELETE_STORE_CURRENCY";


export function loadStoreCurrencies(result) {
  return {
    type: FETCH_STORE_CURRENCIES,
    payload: result,
  };
}

export function fetchStoreCurrencies() {
  console.log("working");
  return dispatch => fetch(`${process.env.REACT_APP_PROD_API_URL}/currencies/admin/?key=${process.env.REACT_APP_API_KEY}`,
    {
      method: "GET",
      headers: {
        authorization: `Bearer ${JSON.parse(localStorage["bezop-login:admin"]).accessToken}`,
      },
    })
    .then(response => response.json())
    .then((json) => {
      dispatch(loadStoreCurrencies(json));
    })
    .catch(error => console.log(error));
}


export function loadStoreCurrency(results) {
  return {
    type: POST_STORE_CURRENCY,
    payload: results,
  };
}


export function postStoreCurrency(productStoreCurrency) {
  return dispatch => fetch(`${process.env.REACT_APP_PROD_API_URL}/currencies/admin/?key=${process.env.REACT_APP_API_KEY}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Bearer ${JSON.parse(localStorage["bezop-login:admin"]).accessToken}`,
    },
    body: JSON.stringify(productStoreCurrency),
  })
    .then(response => response.json())
    .then((json) => {
      dispatch(loadStoreCurrency(json));
    })
    .catch(error => console.log(error));
}

export function loadUpdatedStoreCurrency(results) {
  return {
    type: UPDATE_STORE_CURRENCY,
    payload: results,
  };
}

export function putStoreCurrency(StoreCurrency, currencyID) {
  return dispatch => fetch(`${process.env.REACT_APP_PROD_API_URL}/currencies/${currencyID}/?key=${process.env.REACT_APP_API_KEY}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Bearer ${JSON.parse(localStorage["bezop-login:admin"]).accessToken}`,
    },
    body: JSON.stringify(StoreCurrency),
  })
    .then(response => response.json())
    .then((json) => {
      dispatch(loadUpdatedStoreCurrency(json));
    })
    .catch(error => console.log(error));
}

export function loadDeleteStoreCurrency(results) {
  return {
    type: DELETE_STORE_CURRENCY,
    payload: results,
  };
}

export function deleteStoreCurrency(currencyID) {
  return dispatch => fetch(`${process.env.REACT_APP_PROD_API_URL}/currencies/${currencyID}/?key=${process.env.REACT_APP_API_KEY}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Bearer ${JSON.parse(localStorage["bezop-login:admin"]).accessToken}`,
    },
  })
    .then(response => response.json())
    .then((json) => {
      dispatch(loadDeleteStoreCurrency(json));
    })
    .catch(error => console.log(error));
}
