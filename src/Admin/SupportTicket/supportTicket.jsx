// @desc this component displays the list of all support tickets
// @author Sylvia Onwukwe
import React from "react";
// @material-ui/core components
import Grid from "@material-ui/core/Grid";
// core components
import Snackbar from "@material-ui/core/Snackbar";
import GridItem from "../../components/Grid/GridItem";
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardBody from "../../components/Card/CardBody";
import BezopSnackBar from "../../assets/jss/bezop-mkr/BezopSnackBar";
import EnhancedTable from "../../bezopComponents/Table/EnhancedTable";
import Validator from "../../helpers/validator";

const columnData = [
  { id: "id", numeric: false, disablePadding: false, label: "Ticket ID" },
  { id: "kind", numeric: false, disablePadding: false, label: "Kind" },
  { id: "userType", numeric: false, disablePadding: false, label: "UserType" },
  { id: "standing", numeric: false, disablePadding: false, label: "Standing" },
];

const properties = [
  { name: "id", component: true, padding: false, numeric: false, img: false },
  { name: "kind", component: false, padding: false, numeric: false, img: false },
  { name: "userType", component: false, padding: false, numeric: false },
  { name: "standing", component: false, padding: false, numeric: false, img: false },
];

class Ticket extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      snackBarOpenSuccess: false,
      snackBarMessageSuccess: "",
    };
  }

  componentDidMount() {
    const { fetchTickets } = this.props;
    fetchTickets();
  }

  componentWillReceiveProps(newProps) {
    if (Validator.propertyExist(newProps, "supportTicket", "getTickets")) {
      if (typeof newProps.supportTicket.getTickets === "string") {
        return false;
      }
      this.setState({
        data: newProps.supportTicket.ticket,
      });
    }

    if (Validator.propertyExist(newProps, "supportTicket", "updateTicket")) {
      const { data } = this.state;
      const newTicket = JSON.parse(JSON.stringify(data));
      const updateTicket = newTicket.map((ticket) => {
        if (newProps.supportTicket.updateTicket.id === ticket.id) {
          return newProps.supportTicket.updateTicket;
        }
        return ticket;
      });

      this.setState({
        data: updateTicket,
        snackBarOpenSuccess: true,
        snackBarMessageSuccess: "You have successfully updated this ticket",
      });
    }
    return false;
  }

  onCloseHandlerSuccess = () => {
    this.setState({
      snackBarOpenSuccess: false,
    });
  }

  handleDeleteClick = (ticketIDs) => {
    const { deleteTicket } = this.props;
    const { data } = this.state;
    ticketIDs.forEach((ticketID, index) => {
      deleteTicket(ticketID);
      if ((index + 1) === ticketIDs.length) {
        const newData = data.filter(datum => ticketIDs.indexOf(datum._id) === -1);
        this.setState({
          data: newData,
          snackBarOpenSuccess: true,
          snackBarMessageSuccess: `You have successfully deleted ${ticketIDs.length} ${ticketIDs.length === 1 ? "ticket" : "tickets"}`,
        });
      }
    });
  }

  render() {
    const { data, snackBarOpenSuccess, snackBarMessageSuccess } = this.state;
    return (
      <Grid container>
        <GridItem xs={12} md={9} />
        <GridItem xs={6} md={3} />
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4>
                All Tickets
              </h4>
              <p>
                Showing Active Tickets
              </p>
            </CardHeader>
            <CardBody>
              <EnhancedTable
                orderBy="name"
                columnData={columnData}
                data={data}
                tableTitle="All Tickets"
                properties={properties}
                onDeleteClickSpec={this.handleDeleteClick}
                currentSelected={[]}
                itemName={{ single: "Ticket", plural: "Tickets" }}
              />
            </CardBody>
          </Card>
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={snackBarOpenSuccess}
            onClose={this.onCloseHandlerSuccess}
          >
            <BezopSnackBar
              onClose={this.onCloseHandlerSuccess}
              variant="success"
              message={snackBarMessageSuccess}
            />
          </Snackbar>
        </GridItem>
      </Grid>
    );
  }
}
export default Ticket;
