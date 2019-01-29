import { connect } from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import SupportsComponent from "../views/Support/support";
import {
  fetchTickets,
  postTicket,
  updateTicket,
  deleteTickets,
} from "../actions/actions_vendor_ticket";

import {
  fetchTicketMessages,
  postTicketMessage,
  updateTicketMessage,
  deleteTicketMessage,
} from "../actions/actions_vendor_message";

const SupportsStyle = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "white",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0",
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF",
    },
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1",
    },
  },
};

const mapStateToProps = state => ({
  ticket: state.supportTicketVendor,
});

const mapDispatchToProps = dispatch => ({
  fetchTickets: () => dispatch(fetchTickets()),
  postTicket: ticketDetails => dispatch(postTicket(ticketDetails)),
  updateTicket: (ticketDetails, ticketId) => dispatch(updateTicket(ticketDetails, ticketId)),
  deleteTickets: ticketId => dispatch(deleteTickets(ticketId)),
  fetchTicketMessages: ticketId => dispatch(fetchTicketMessages(ticketId)),
  postTicketMessage: ticketDetails => dispatch(postTicketMessage(ticketDetails)),
  updateTicketMessage: (ticketDetails, ticketId) => dispatch(
    updateTicketMessage(ticketDetails, ticketId),
  ),
  deleteTicketMessage: ticketId => dispatch(deleteTicketMessage(ticketId)),
});

const Supports = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SupportsComponent);

export default withStyles(SupportsStyle)(Supports);
