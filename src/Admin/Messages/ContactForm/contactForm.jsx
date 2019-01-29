// @desc this component displays all live chat messages
// @author Sylvia Onwukwe
import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
// core components
import GridItem from "../../../components/Grid/GridItem";
import Table from "../../../components/Table/Table";
import Card from "../../../components/Card/Card";
import CardHeader from "../../../components/Card/CardHeader";
import CardBody from "../../../components/Card/CardBody";
import MessagePages from "../../../views/Messages/Pagination";
import ModalContactForm from "./modalContactForm";

const styles = {
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
    fontFamily: "'Roboto', 'Helvetica', 'Arial', 'sans-serif'",
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

class ContactForm extends React.Component {
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
                  ["1", "Anna Barley", "admin@example.com", "20-07-2018", <ModalContactForm />],
                  ["2", "Esther Jones", "admin@example.com", "17-07-2018", <ModalContactForm />],
                  ["3", "Kayode Musa", "admin@example.com", "15-07-2018", <ModalContactForm />],
                  ["4", "Sarah Philips", "admin@example.com", "15-07-2018", <ModalContactForm />],
                  ["5", "Khlondiva Scholum", "admin@example.com", "13-07-2018", <ModalContactForm />],
                  ["6", "Anthony Santo", "admin@example.com", "12-07-2018", <ModalContactForm />],
                  ["7", "Santiago Diego", "admin@example.com", "12-07-2018", <ModalContactForm />],
                  ["8", "Park Min Young", "admin@gmail.com", "12-07-2018", <ModalContactForm />],
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

export default withStyles(styles)(ContactForm);
