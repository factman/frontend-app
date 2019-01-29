import React from "react";
// @material-ui/core components
import Grid from "@material-ui/core/Grid";
// core components
import GridItem from "../../components/Grid/GridItem";
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardBody from "../../components/Card/CardBody";
import Filter from "./Filter";
import TicketButton from "./ticketbutton";
import EnhancedTable from "../../bezopComponents/Table/EnhancedTable";
// import Validator from "../../helpers/validator";
import { Snackbar, TableCell } from "../../../node_modules/@material-ui/core";
import BezopSnackBar from "../../assets/jss/bezop-mkr/BezopSnackBar";
import Validator from "../../helpers/validator";

const columnData = [
  { id: "subject", numeric: false, disablePadding: true, label: "Ticket Subject" },
  { id: "complaint", numeric: false, disablePadding: true, label: "Ticket Message" },
  { id: "standing", numeric: false, disablePadding: true, label: "Ticket Status" },

];

const properties = [
  { name: "subject", component: false, padding: false, numeric: false },
  { name: "complaint", component: false, padding: false, numeric: false },
  { name: "standing", component: false, padding: false, numeric: false },
];

const ticketDetails = {
  subject: "",
  complain: "",
  content: "",
};

class Support extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      snackBarOpenSuccess: false,
      variantSnackBar: "success",
      snackBarMessageSuccess: "Snackbar Message",
    };
  }

  componentDidMount() {
    const { fetchTickets } = this.props;
    fetchTickets();
  }

  componentWillReceiveProps(newProps) {
    // const { ticket } = this.props;
    if (Validator.propertyExist(newProps, "ticket", "getTickets")) {
      if (typeof newProps.ticket.getTickets === "object") {
        this.setState({
          data: newProps.ticket.getTickets,
        });
      }
    }

    if (Validator.propertyExist(newProps, "ticket", "getTicketMessages")) {
      if (typeof newProps.ticket.getTicketMessages === "string") {
        return false;
      }
    }
    return false;
  }

  onCloseHandlerSuccess = () => {
    this.setState({
      snackBarOpenSuccess: false,
    });
  }

  editButtonDisplay = (n) => {
    const {
      ticket,
      fetchTicketMessages,
      postTicketMessage,
      updateTicketMessage,
      deleteTicketMessage,
    } = this.props;
    return (
      <TableCell>
        <TicketButton
          type="edit"
          ticket={ticket}
          eachData={n}
          fetchTicketMessages={fetchTicketMessages}
          postTicketMessage={postTicketMessage}
          updateTicketMessage={updateTicketMessage}
          deleteTicketMessage={deleteTicketMessage}
        />
      </TableCell>
    );
  }

  render() {
    const {
      classes,
      postTicketDetails,
      ticket,
    } = this.props;
    const { data, snackBarOpenSuccess, variantSnackBar, snackBarMessageSuccess } = this.state;
    return (
      <Grid container>
        <GridItem xs={12} md={10}>
          <Filter />
        </GridItem>
        <GridItem xs={6} md={2}>
          <TicketButton
            type="add"
            postTicketDetails={postTicketDetails}
            ticket={ticket}
            ticketDetails={ticketDetails}
          />
        </GridItem>
        <GridItem>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Support Tickets</h4>
              <p className={classes.cardCategoryWhite}>
                List of All Support Tickets
              </p>
            </CardHeader>
            <CardBody>
              <EnhancedTable
                orderBy="subject"
                columnData={columnData}
                data={data}
                tableTitle="All Ticket Post"
                properties={properties}
                viewItem={this.editButtonDisplay}
                onDeleteClickSpec={this.handleDeleteClick}
                currentSelected={[]}
                collection="ticket"
                id="id"
                itemName={{ single: "Ticket", plural: "Tickets" }}
              />
            </CardBody>
          </Card>
        </GridItem>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={snackBarOpenSuccess}
          onClose={this.onCloseHandlerSuccess}
        >
          <BezopSnackBar
            onClose={this.onCloseHandlerSuccess}
            variant={variantSnackBar}
            message={snackBarMessageSuccess}
          />
        </Snackbar>
      </Grid>
    );
  }
}

export default Support;
