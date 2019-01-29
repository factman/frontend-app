// @desc ticket reducers on the admin marketplace
// @author Sylvia Onwukwe
import {
  POST_TICKET,
  FETCH_TICKETS,
  UPDATE_TICKET,
  DELETE_TICKETS,
} from "../actions/actions_admin_ticket";

const supportTicket = (state = {}, action) => {
  let output;
  let data;
  switch (action.type) {
    case POST_TICKET:
      data = action.payload.success ? action.payload.data : action.payload.message;
      output = { addTicket: data };
      break;
    case FETCH_TICKETS:
      data = action.payload.success ? action.payload.data : action.payload.message;
      output = { getTickets: data };
      break;
    case UPDATE_TICKET:
      data = action.payload.success ? action.payload.data : action.payload.message;
      output = { updateTicket: data };
      break;
    case DELETE_TICKETS:
      data = action.payload.success ? action.payload.data : action.payload.message;
      output = { deleteTicket: data };
      break;
    default:
      output = state;
      break;
  }
  return output;
};

export default supportTicket;
