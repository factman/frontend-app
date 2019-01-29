import { connect } from "react-redux";
import TicketComponent from "../../Admin/SupportTicket/supportTicket";
import {
  postTicket,
  fetchTickets,
  updateTicket,
  deleteTickets,
} from "../../actions/actions_admin_ticket";

const mapStateToProps = state => ({
  supportTicket: state.supportTicket,
});

const mapDispatchToProps = dispatch => ({
  postTicket: (supportTicket) => {
    dispatch(postTicket(supportTicket));
  },
  fetchTickets: () => {
    dispatch(fetchTickets());
  },
  updateTicket: (supportTicket, ticketID) => {
    dispatch(updateTicket(supportTicket, ticketID));
  },
  deleteTickets: (ticketID) => {
    dispatch(deleteTickets(ticketID));
  },
});

const Ticket = connect(
  mapStateToProps,
  mapDispatchToProps,
)(TicketComponent);

export default Ticket;
