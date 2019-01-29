import Validator from "../helpers/validator";

export const POST_TICKET_MESSAGE = "POST_TICKET_MESSAGE";
export const FETCH_TICKETS = "FETCH_TICKETS";
export const UPDATE_TICKET_MESSAGE = "UPDATE_TICKET_MESSAGE";
export const DELETE_TICKET_MESSAGE = "DELETE_TICKET_MESSAGE";

export function loadTickets(result) {
  return {
    type: FETCH_TICKETS,
    payload: result,
  };
}
export function fetchTickets() {
  return dispatch => fetch(`${process.env.REACT_APP_PROD_API_URL}/tickets/vendor/?key=${process.env.REACT_APP_API_KEY}`,
    {
      method: "GET",
      headers: {
        authorization: `Bearer ${JSON.parse(localStorage["bezop-login:vendor"]).accessToken}`,
      },
    })
    .then(response => response.json())
    .then((json) => {
      if (Validator.propertyExist(json, "error")) {
        throw json.error;
      }
      dispatch(loadTickets(json));
    })
    .catch(error => (
      dispatch(loadTickets({
        success: false,
        message: error.message,
      }))
    ));
}


export function loadTicket(results) {
  return {
    type: POST_TICKET_MESSAGE,
    payload: results,
  };
}


export function postTicket(supportTicket) {
  return dispatch => fetch(`${process.env.REACT_APP_PROD_API_URL}/messages/vendor/?key=${process.env.REACT_APP_API_KEY}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Bearer ${JSON.parse(localStorage["bezop-login:vendor"]).accessToken}`,
    },
    body: JSON.stringify(supportTicket),
  })
    .then(response => response.json())
    .then((json) => {
      if (Validator.propertyExist(json, "error")) {
        throw json.error;
      }
      dispatch(loadTicket(json));
    })
    .catch(error => (
      dispatch(loadTicket({
        success: false,
        message: error.message,
      }))
    ));
}

export function loadUpdatedTicket(results) {
  return {
    type: UPDATE_TICKET_MESSAGE,
    payload: results,
  };
}

export function updateTicket(supportTicket, ticketID) {
  return dispatch => fetch(`${process.env.REACT_APP_PROD_API_URL}/messages/vendor/${ticketID}/?key=${process.env.REACT_APP_API_KEY}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Bearer ${JSON.parse(localStorage["bezop-login:vendor"]).accessToken}`,
    },
    body: JSON.stringify(supportTicket),
  })
    .then(response => response.json())
    .then((json) => {
      if (Validator.propertyExist(json, "error")) {
        throw json.error;
      }
      dispatch(loadUpdatedTicket(json));
    })
    .catch(error => (
      dispatch(loadUpdatedTicket({
        success: false,
        message: error.message,
      }))
    ));
}

export function loadDeleteTickets(results) {
  return {
    type: DELETE_TICKET_MESSAGE,
    payload: results,
  };
}

export function deleteTickets(ticketID) {
  console.log(ticketID);
  return dispatch => fetch(`${process.env.REACT_APP_PROD_API_URL}/messages/vendor/${ticketID}/?key=${process.env.REACT_APP_API_KEY}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Bearer ${JSON.parse(localStorage["bezop-login:vendor"]).accessToken}`,
    },
  })
    .then(response => response.json())
    .then((json) => {
      if (Validator.propertyExist(json, "error")) {
        throw json.error;
      }
      dispatch(loadDeleteTickets(json));
    })
    .catch(error => (
      dispatch(loadDeleteTickets({
        success: false,
        message: error.message,
      }))
    ));
}
