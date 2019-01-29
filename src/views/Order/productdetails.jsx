// @desc this displays the product details when vendor clicks view order
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

function ProductDetails(props) {
  const { classes } = props;
  return (
    <Grid container>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <div>
              <h4 className={classes.cardTitleWhite}>
Orders
              </h4>
            </div>
            <div>
              <p className={classes.cardCategoryWhite}>
                {" "}
Product Details
                {" "}
              </p>
            </div>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={["ID", "Product Name", "Quantity", "Cost", "VAT", "Weight"]}
              tableData={[
                ["SKU 001", "Yellow Pillow", "2", "$10", "$2", "20Kg"],
              ]}
            />
          </CardBody>
        </Card>
      </GridItem>
    </Grid>
  );
}

export default withStyles(styles)(ProductDetails);
