// @desc this displays shipment details
// @author Sylvia Onwukwe

import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
// core components
import GridItem from "../../components/Grid/GridItem";
import Table from "../../components/Table/Table";
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardBody from "../../components/Card/CardBody";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
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

function ShipmentDetails(props) {
  const { classes } = props;
  return (
    <Grid container>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>
Orders
            </h4>
            <p className={classes.cardCategoryWhite}>
              Manage All Your Orders
            </p>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={["First Name", "Last Name", "Organization", "Address", "City",
                "State", "Postal Code", "Country", "Phone", "Email"]}
              tableData={[
                ["Anne", "Barley", "Bezop Blockchain Limited", "Thompson Avenue, off Landmark Center", "Lekki", "Lagos",
                  "102262", "Nigeria", "04847484494", "annebarley@example.com"],
              ]}
            />
          </CardBody>
        </Card>
      </GridItem>
    </Grid>
  );
}

export default withStyles(styles)(ShipmentDetails);
