// @desc ticket reducers on the admin marketplace
// @author Sylvia Onwukwe
import {
  POST_TICKET_MESSAGE,
  FETCH_TICKETS,
  UPDATE_TICKET_MESSAGE,
  DELETE_TICKET_MESSAGE,
} from "../actions/actions_vendor_ticket";

import {
  FETCH_TICKET_MESSAGES,
  POST_SINGLE_TICKET_MESSAGE,
  UPDATE_SINGLE_TICKET_MESSAGE,
  DELETE_SINGLE_TICKET_MESSAGE,
} from "../actions/actions_vendor_message";

const supportTicketVendor = (state = {}, action) => {
  let output;
  let data;
  switch (action.type) {
    case POST_TICKET_MESSAGE:
      data = action.payload.success ? action.payload.data : action.payload.message;
      output = { addTicket: data };
      break;
    case FETCH_TICKETS:
      data = action.payload.success ? action.payload.data : action.payload.message;
      output = { getTickets: data };
      break;
    case UPDATE_TICKET_MESSAGE:
      data = action.payload.success ? action.payload.data : action.payload.message;
      output = { updateTicket: data };
      break;
    case DELETE_TICKET_MESSAGE:
      data = action.payload.success ? action.payload.data : action.payload.message;
      output = { deleteTicket: data };
      break;
    case FETCH_TICKET_MESSAGES:
      data = action.payload.success ? action.payload.data : action.payload.message;
      output = { getTicketMessages: data };
      break;
    case POST_SINGLE_TICKET_MESSAGE:
      data = action.payload.success ? action.payload.data : action.payload.message;
      output = { postTicketMessage: data };
      break;
    case UPDATE_SINGLE_TICKET_MESSAGE:
      data = action.payload.success ? action.payload.data : action.payload.message;
      output = { updateTicketMessage: data };
      break;
    case DELETE_SINGLE_TICKET_MESSAGE:
      data = action.payload.success ? action.payload.data : action.payload.message;
      output = { deleteTicketMessage: data };
      break;
    default:
      output = state;
      break;
  }
  return output;
};

export default supportTicketVendor;
