// @desc this component displays all tickets for admin support
// @author Sylvia Onwukwe
import React from "react";
// @material-ui/core components
import Grid from "@material-ui/core/Grid";
// core components
import GridItem from "../../../components/Grid/GridItem";
import Table from "../../../components/Table/Table";
import Card from "../../../components/Card/Card";
import CardHeader from "../../../components/Card/CardHeader";
import CardBody from "../../../components/Card/CardBody";
import MessagePages from "../../../views/Messages/Pagination";
import ModalTicket from "./modalTicket";

class SupportTicket extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Grid container>
        <GridItem xs={12} md={10} />
        <GridItem xs={6} md={2} />
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4>
Contact Forms
              </h4>
              <p>
              Showing All Forms Submitted On Contact Page
              </p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="primary"
                tableHead={["#", "Name", "Email Address", "Date", "Action"]}
                tableData={[
                  ["1", "Anna Barley", "admin@example.com", "20-07-2018", <ModalTicket />],
                  ["2", "Esther Jones", "admin@example.com", "17-07-2018", <ModalTicket />],
                  ["3", "Kayode Musa", "admin@example.com", "15-07-2018", <ModalTicket />],
                  ["4", "Sarah Philips", "admin@example.com", "15-07-2018", <ModalTicket />],
                  ["5", "Khlondiva Scholum", "admin@example.com", "13-07-2018", <ModalTicket />],
                  ["6", "Anthony Santo", "admin@example.com", "12-07-2018", <ModalTicket />],
                  ["7", "Santiago Diego", "admin@example.com", "12-07-2018", <ModalTicket />],
                  ["8", "Park Min Young", "admin@gmail.com", "12-07-2018", <ModalTicket />],
                ]}
              />
            </CardBody>
          </Card>
        </GridItem>
        <MessagePages />
      </Grid>
    );
  }
}
export default SupportTicket;
