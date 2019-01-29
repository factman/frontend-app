// @desc this is ticket actions used by redux
// @author Sylvia Onwukwe
export const POST_TICKET = "POST_TICKET";
export const FETCH_TICKETS = "FETCH_TICKETS";
export const UPDATE_TICKET = "UPDATE_TICKET";
export const DELETE_TICKETS = "DELETE_TICKETS";

export function loadTickets(result) {
  return {
    type: FETCH_TICKETS,
    payload: result,
  };
}
export function fetchTickets() {
  return dispatch => fetch(`${process.env.REACT_APP_PROD_API_URL}/tickets/?key=${process.env.REACT_APP_API_KEY}`,
    { method: "GET" })
    .then(response => response.json())
    .then((json) => {
      dispatch(loadTickets(json));
    });
}


export function loadTicket(results) {
  return {
    type: POST_TICKET,
    payload: results,
  };
}


export function postTicket(supportTicket) {
  return dispatch => fetch(`${process.env.REACT_APP_PROD_API_URL}/tickets/?key=${process.env.REACT_APP_API_KEY}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Bearer ${JSON.parse(localStorage["bezop-login:admin"]).accessToken}`,
    },
    body: JSON.stringify(supportTicket),
  })
    .then(response => response.json())
    .then((json) => {
      dispatch(loadTicket(json));
    });
}

export function loadUpdatedTicket(results) {
  return {
    type: UPDATE_TICKET,
    payload: results,
  };
}

export function updateTicket(supportTicket, ticketID) {
  return dispatch => fetch(`${process.env.REACT_APP_PROD_API_URL}/tickets/${ticketID}/?key=${process.env.REACT_APP_API_KEY}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Bearer ${JSON.parse(localStorage["bezop-login:admin"]).accessToken}`,
    },
    body: JSON.stringify(supportTicket),
  })
    .then(response => response.json())
    .then((json) => {
      dispatch(loadUpdatedTicket(json));
    });
}

export function loadDeleteTickets(results) {
  return {
    type: DELETE_TICKETS,
    payload: results,
  };
}

export function deleteTickets(ticketID) {
  console.log(ticketID);
  return dispatch => fetch(`${process.env.REACT_APP_PROD_API_URL}/tickets/${ticketID}/?key=${process.env.REACT_APP_API_KEY}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Bearer ${JSON.parse(localStorage["bezop-login:admin"]).accessToken}`,
    },
  })
    .then(response => response.json())
    .then((json) => {
      dispatch(loadDeleteTickets(json));
    });
}
