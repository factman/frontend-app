// @desc this component displays all Newsletters sent with dates
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
import Button from "../../../components/CustomButtons/Button";
import MessagePages from "../../../views/Messages/Pagination";

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

class SentNewsletter extends React.Component {
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
Email Subscription
              </h4>
              <p>
Showing All Email Subscribers
              </p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="primary"
                tableHead={["#", "Email Subject", "Date"]}
                tableData={[
                  ["1", "Get A Free Coupon!", "12-07-2018"],
                  ["2", "Hurry! Don't Miss Amazing Deals Today", "31-06-2018"],
                  ["3", "Never Miss An Opportunity To Shop For Things You Love", "25-06-2018"],
                  ["4", "What I Do When I Have My Bezop Wallet", "22-06-2018"],
                  ["5", "Review! Our Privacy Policy Updated", "18-05-2018"]]}
              />
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={10}>
          <MessagePages />
        </GridItem>
        <GridItem xs={12} sm={12} md={2}>
          <Button color="primary">
            {" "}
Export
            {" "}
          </Button>
        </GridItem>
      </Grid>
    );
  }
}

export default withStyles(styles)(SentNewsletter);
