// @desc email transactions list action used by redux on the admin marketplace
// @author Sylvia Onwukwe
export const FETCH_TRANSACTIONS = "FETCH_TRANSACTIONS";
export const DELETE_TRANSACTIONS = "DELETE_TRANSACTIONS";


export function loadTransaction(result) {
  return {
    type: FETCH_TRANSACTIONS,
    payload: result,
  };
}

export function fetchTransactions() {
  return dispatch => fetch(`${process.env.REACT_APP_PROD_API_URL}/transactions/?key=${process.env.REACT_APP_API_KEY}`,
    { method: "GET" })
    .then(response => response.json())
    .then((json) => {
      dispatch(loadTransaction(json));
    })
    .catch(error => console.log(error));
}

export function loadDeleteTransactions(results) {
  return {
    type: DELETE_TRANSACTIONS,
    payload: results,
  };
}

export function deleteTransactions(transactionID) {
  return dispatch => fetch(`${process.env.REACT_APP_DEV_API_URL}/transactions/${transactionID}/?key=${process.env.REACT_APP_API_KEY}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Bearer ${JSON.parse(localStorage["bezop-login:admin"]).accessToken}`,
    },
  })
    .then(response => response.json())
    .then((json) => {
      dispatch(loadDeleteTransactions(json));
    })
    .catch(error => console.log(error));
}
