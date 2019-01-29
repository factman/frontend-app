// @desc the customers action used by redux on admin marketplace
// @author Sylvia Onwukwe
export const FETCH_CUSTOMERS = "FETCH_CUSTOMERS";
export const DELETE_CUSTOMERS = "DELETE_CUSTOMERS";


export function loadCustomers(result) {
  return {
    type: FETCH_CUSTOMERS,
    payload: result,
  };
}

export function fetchCustomers() {
  return dispatch => fetch(`${process.env.REACT_APP_PROD_API_URL}/customers/?key=${process.env.REACT_APP_API_KEY}`,
    { method: "GET", 
    headers: {
      authorization: `Bearer ${JSON.parse(localStorage["bezop-login:admin"]).accessToken}`,
    },
  })
    .then(response => response.json())
    .then((json) => {
      dispatch(loadCustomers(json));
    })
    .catch(error => console.log(error));
}

export function loadDeleteCustomers(results) {
  return {
    type: DELETE_CUSTOMERS,
    payload: results,
  };
}

export function deleteCustomers(customerID) {
  return dispatch => fetch(`${process.env.REACT_APP_PROD_API_URL}/customers/${customerID}/?key=${process.env.REACT_APP_API_KEY}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Bearer ${JSON.parse(localStorage["bezop-login:admin"]).accessToken}`,
    },
  })
    .then(response => response.json())
    .then((json) => {
      dispatch(loadDeleteCustomers(json));
    })
    .catch(error => console.log(error));
}
