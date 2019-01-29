import Validator from "../helpers/validator";

export const POST_SINGLE_TICKET_MESSAGE = "POST_SINGLE_TICKET_MESSAGE";
export const FETCH_TICKET_MESSAGES = "FETCH_TICKET_MESSAGES";
export const UPDATE_SINGLE_TICKET_MESSAGE = "UPDATE_SINGLE_TICKET_MESSAGE";
export const DELETE_SINGLE_TICKET_MESSAGE = "DELETE_SINGLE_TICKET_MESSAGE";

export function loadTicketMessages(result) {
  return {
    type: FETCH_TICKET_MESSAGES,
    payload: result,
  };
}
export function fetchTicketMessages(ticketId) {
  return dispatch => fetch(`${process.env.REACT_APP_PROD_API_URL}/messages/vendor/${ticketId}/?key=${process.env.REACT_APP_API_KEY}`,
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
      dispatch(loadTicketMessages(json));
    })
    .catch(error => (
      dispatch(loadTicketMessages({
        success: false,
        message: error.message,
      }))
    ));
}


export function loadSingleTicketMessage(results) {
  return {
    type: POST_SINGLE_TICKET_MESSAGE,
    payload: results,
  };
}


export function postTicketMessage(supportTicket) {
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
      dispatch(loadSingleTicketMessage(json));
    })
    .catch(error => (
      dispatch(loadSingleTicketMessage({
        success: false,
        message: error.message,
      }))
    ));
}

export function loadUpdatedTicket(results) {
  return {
    type: UPDATE_SINGLE_TICKET_MESSAGE,
    payload: results,
  };
}

export function updateTicketMessage(supportTicket, ticketID) {
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
    type: DELETE_SINGLE_TICKET_MESSAGE,
    payload: results,
  };
}

export function deleteTicketMessage(ticketID) {
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
