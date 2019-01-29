// @desc This is the Admin dashboard
// @author Sylvia Onwukwe
// @require This page requires ChartistGraph @type0.10.1, Charts.jsx(variables/charts),
// and dashboardStyle.jsx to display properly

import React from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import Grid from "@material-ui/core/Grid";
// @material-ui/icons
import ShoppingCart from "@material-ui/icons/ShoppingCart";
import Store from "@material-ui/icons/Store";
import AttachMoney from "@material-ui/icons/AttachMoney";
import ArrowForward from "@material-ui/icons/ArrowForward";
import LocalShipping from "@material-ui/icons/LocalShipping";
import VerifiedUser from "@material-ui/icons/VerifiedUser";
import ThumbUp from "@material-ui/icons/ThumbUp";
import ContactMail from "@material-ui/icons/ContactMail";
// core components
import GridItem from "../../components/Grid/GridItem";
import Danger from "../../components/Typography/Danger";
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardIcon from "../../components/Card/CardIcon";
import CardBody from "../../components/Card/CardBody";
import CardFooter from "../../components/Card/CardFooter";
import {
  dailySalesChart,
  completedTasksChart,
  emailPie,
  regPie,
} from "./charts";

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: ["ate"],
    };
  }

  render() {
    const { classes } = this.props;
    const { products } = this.state;
    return (

      <div>
        <Grid container>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="primary">
                <CardIcon color="primary">
                  <Store />
                </CardIcon>
                <p className={classes.cardCategory}>
Total Products
                </p>
                <h3 className={classes.cardTitle}>
                  {products.length}
                </h3>
              </CardHeader>
              <CardFooter>
                <div className={classes.stats}>
                  <Danger>
                    <ArrowForward />
                  </Danger>
                  <a href="/admin/products">
                    View All Products
                  </a>
                </div>
              </CardFooter>
            </Card>
          </GridItem>


          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="success">
                <CardIcon color="success">
                  <ShoppingCart />
                </CardIcon>
                <p className={classes.cardCategory}>
Orders Pending
                </p>
                <h3 className={classes.cardTitle}>
344
                </h3>
              </CardHeader>
              <CardFooter>
                <div className={classes.stats}>
                  <Danger>
                    <ArrowForward />
                  </Danger>
                  <a href="/admin/orders">
                  View All Pending Orders
                  </a>
                </div>
              </CardFooter>
            </Card>
          </GridItem>


          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="danger">
                <CardIcon color="danger">
                  <LocalShipping />
                </CardIcon>
                <p className={classes.cardCategory}>
Orders Processing
                </p>
                <h3 className={classes.cardTitle}>
75
                </h3>
              </CardHeader>
              <CardFooter>
                <div className={classes.stats}>
                  <Danger>
                    <ArrowForward />
                  </Danger>
                  <a href="/admin/orders">
                  View All Processing Orders
                  </a>
                </div>
              </CardFooter>
            </Card>
          </GridItem>


          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="info">
                <CardIcon color="info">
                  <ThumbUp />
                </CardIcon>
                <p className={classes.cardCategory}>
Orders Completed
                </p>
                <h3 className={classes.cardTitle}>
245
                </h3>
              </CardHeader>
              <CardFooter>
                <div className={classes.stats}>
                  <Danger>
                    <ArrowForward />
                  </Danger>
                  <a href="/admin/orders">
                  View All Completed Orders
                  </a>
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        </Grid>


        <Grid container>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="primary">
                <CardIcon color="primary">
                  <AttachMoney />
                </CardIcon>
                <p className={classes.cardCategory}>
Transactions
                </p>
                <h3 className={classes.cardTitle}>
                  49
                </h3>
              </CardHeader>
              <CardFooter>
                <div className={classes.stats}>
                  <Danger>
                    <ArrowForward />
                  </Danger>
                  <a href="/admin/transactions">
                    View All Transactions
                  </a>
                </div>
              </CardFooter>
            </Card>
          </GridItem>


          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="success">
                <CardIcon color="success">
                  <VerifiedUser />
                </CardIcon>
                <p className={classes.cardCategory}>
Total Customers
                </p>
                <h3 className={classes.cardTitle}>
3400
                </h3>
              </CardHeader>
              <CardFooter>
                <div className={classes.stats}>
                  <Danger>
                    <ArrowForward />
                  </Danger>
                  <a href="/admin/customers">
                  Registered Customers
                  </a>
                </div>
              </CardFooter>
            </Card>
          </GridItem>


          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="danger">
                <CardIcon color="danger">
                  <VerifiedUser />
                </CardIcon>
                <p className={classes.cardCategory}>
Total Vendors
                </p>
                <h3 className={classes.cardTitle}>
750
                </h3>
              </CardHeader>
              <CardFooter>
                <div className={classes.stats}>
                  <Danger>
                    <ArrowForward />
                  </Danger>
                  <a href="/admin/vendors">
                  Registered Vendors
                  </a>
                </div>
              </CardFooter>
            </Card>
          </GridItem>


          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="info">
                <CardIcon color="info">
                  <ContactMail />
                </CardIcon>
                <p className={classes.cardCategory}>
Total Subscribers
                </p>
                <h3 className={classes.cardTitle}>
24,545
                </h3>
              </CardHeader>
              <CardFooter>
                <div className={classes.stats}>
                  <Danger>
                    <ArrowForward />
                  </Danger>
                  <a href="/admin/subscribers">
                  Total Email Subscribers
                  </a>
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        </Grid>


        <Grid container>
          <GridItem xs={12} sm={12} md={6}>
            <Card>
              <CardHeader color="info">
                <ChartistGraph
                  className={classes.bar}
                  data={completedTasksChart.data}
                  type="Line"
                  options={completedTasksChart.options}
                  listener={completedTasksChart.animation}
                />
              </CardHeader>
              <CardBody>
                <a href="/admin/subscribers">
                  <h4>
Email Subscribers
                  </h4>
                </a>
                <p>
                  Monthly Email Subscription
                </p>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <Card>
              <CardHeader color="success">
                <ChartistGraph
                  className={classes.bar}
                  data={dailySalesChart.data}
                  type="Line"
                  options={dailySalesChart.options}
                  listener={dailySalesChart.animation}
                />
              </CardHeader>
              <CardBody>
                <a href="/admin/products">
                  <h4>
Total Products
                  </h4>
                </a>
                <p>
                  Increase in Monthly Sales.
                </p>
              </CardBody>
            </Card>
          </GridItem>

          <GridItem xs={12} sm={12} md={6}>
            <Card>
              <CardHeader color="info">
                <ChartistGraph className={classes.chart} data={emailPie} type="Pie" />
              </CardHeader>
              <CardBody>
                <a href="/admin/products">
                  <h4>
Product Category
                  </h4>
                </a>
                <p>
                Products in Each Category
                </p>
              </CardBody>
            </Card>
          </GridItem>

          <GridItem xs={12} sm={12} md={6}>
            <Card>
              <CardHeader color="success">
                <ChartistGraph className={classes.chart} data={regPie} type="Pie" />
              </CardHeader>
              <CardBody>
                <a href="/admin/blog">
                  <h4>
Blog Category
                  </h4>
                </a>
                <p>
                Blogs in Each Category
                </p>
              </CardBody>
            </Card>
          </GridItem>

        </Grid>
      </div>
    );
  }
}


export default Admin;
