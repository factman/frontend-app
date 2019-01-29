// @desc email subscribers list action used by redux on the admin marketplace
// @author Sylvia Onwukwe
export const FETCH_SUBSCRIBERS = "FETCH_SUBSCRIBERS";
export const DELETE_SUBSCRIBER = "DELETE_SUBSCRIBER";


export function loadSubscribers(result) {
  return {
    type: FETCH_SUBSCRIBERS,
    payload: result,
  };
}

export function fetchSubscribers() {
  return dispatch => fetch(`${process.env.REACT_APP_PROD_API_URL}/subscribers/?key=${process.env.REACT_APP_API_KEY}`,
    { method: "GET" })
    .then(response => response.json())
    .then((json) => {
      dispatch(loadSubscribers(json));
    })
    .catch(error => console.log(error));
}

export function loadDeleteSubscriber(results) {
  return {
    type: DELETE_SUBSCRIBER,
    payload: results,
  };
}

export function deleteSubscriber(subscriberID) {
  console.log(subscriberID);
  return dispatch => fetch(`${process.env.REACT_APP_PROD_API_URL}/subscribers/${subscriberID}/?key=${process.env.REACT_APP_API_KEY}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Bearer ${JSON.parse(localStorage["bezop-login:admin"]).accessToken}`,
    },
  })
    .then(response => response.json())
    .then((json) => {
      dispatch(loadDeleteSubscriber(json));
    })
    .catch(error => console.log(error));
}
