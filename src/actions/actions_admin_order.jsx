// @desc order actions used by redux on admin frontend
// @author Sylvia Onwukwe
export const FETCH_ORDER = "FETCH_ORDER";
export const DELETE_ORDER = "DELETE_ORDER";


export function loadOrder(result) {
  return {
    type: FETCH_ORDER,
    payload: result,
  };
}

export function fetchOrder() {
  return dispatch => fetch(`${process.env.REACT_APP_PROD_API_URL}/orders/?key=${process.env.REACT_APP_API_KEY}`,
    { method: "GET" })
    .then(response => response.json())
    .then((json) => {
      dispatch(loadOrder(json));
    })
    .catch(error => console.log(error));
}

export function loadDeleteOrder(results) {
  return {
    type: DELETE_ORDER,
    payload: results,
  };
}

export function deleteOrder(orderID) {
  console.log(orderID);
  return dispatch => fetch(`${process.env.REACT_APP_PROD_API_URL}/orders/${orderID}/?key=${process.env.REACT_APP_API_KEY}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Bearer ${JSON.parse(localStorage["bezop-login:admin"]).accessToken}`,
    },
  })
    .then(response => response.json())
    .then((json) => {
      dispatch(loadDeleteOrder(json));
    })
    .catch(error => console.log(error));
}
