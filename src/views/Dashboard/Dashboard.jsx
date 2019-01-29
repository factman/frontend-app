import React from "react";
import Link from "react-router-dom/Link";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import Grid from "@material-ui/core/Grid";
// @material-ui/icons
import ShoppingCart from "@material-ui/icons/ShoppingCart";
import Store from "@material-ui/icons/Store";
import AttachMoney from "@material-ui/icons/AttachMoney";
import AddCircle from "@material-ui/icons/AddCircle";
import History from "@material-ui/icons/History";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import AccessTime from "@material-ui/icons/AccessTime";
import Loyalty from "@material-ui/icons/Loyalty";

// core components
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import Table from "../../components/Table/Table";
import Danger from "../../components/Typography/Danger";
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardIcon from "../../components/Card/CardIcon";
import CardBody from "../../components/Card/CardBody";
import CardFooter from "../../components/Card/CardFooter";
import {
  getWeeklySales,
  getMonthlySales,
  getDailySales,
  getTotalOrder,
  getOrderStatus,
  getTotalStock,
  getTotalCategory,
  getTotalBrand,
  getUsedCoupon,
} from "../../helpers/chartData";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart,
} from "../../variables/charts";
import Validator from "../../helpers/validator";


class Dashboard extends React.Component {
  constructor(props) {
    super();
    this.state = {
      // value: 0,
      totalProduct: 0,
      totalProductSold: 0,
      totalTransaction: 0,
      // products: [],
      coupons: [],
      stocks: [],
      brands: [],
      categories: [],
      orders: [],
    };
  }

  componentDidMount() {
    const {
      fetchOrders,
      fetchProducts,
      fetchProductStocks,
      fetchProductBrands,
      fetchProductCategories,
      fetchCoupons,
    } = this.props;
    fetchOrders();
    fetchProducts();
    fetchProductStocks();
    fetchProductBrands();
    fetchProductCategories();
    fetchCoupons();
  }

  componentWillReceiveProps(newProps) {
    if (
      Validator.propertyExist(newProps, "dashboard", "getProductCoupons")
    && typeof newProps.dashboard.getProductCoupons === "object"
    ) {
      this.setState({
        coupons: newProps.dashboard.getProductCoupons,
      });
    }
    if (
      Validator.propertyExist(newProps, "dashboard", "getAll")
    && typeof newProps.dashboard.getAll === "object"
    ) {
      this.setState({
        // products: newProps.dashboard.getAll.result,
        totalProduct: newProps.dashboard.getAll.count,
      });
    }
    if (
      Validator.propertyExist(newProps, "dashboard", "productBrands")
    && typeof newProps.dashboard.productBrands === "object"
    ) {
      this.setState({
        brands: newProps.dashboard.productBrands,
      });
    }
    if (
      Validator.propertyExist(newProps, "dashboard", "productCategories")
    && typeof newProps.dashboard.productCategories === "object"
    ) {
      this.setState({
        categories: newProps.dashboard.productCategories,
      });
    }
    if (
      Validator.propertyExist(newProps, "dashboard", "getProductStocks")
    && typeof newProps.dashboard.getProductStocks === "object"
    ) {
      this.setState({
        stocks: newProps.dashboard.getProductStocks,
      });
    }
    if (
      Validator.propertyExist(newProps, "dashboard", "getOrders")
    && typeof newProps.dashboard.getOrders === "object"
    ) {
      this.setState({
        orders: newProps.dashboard.getOrders,
      });
    }
  }

  render() {
    const { classes } = this.props;
    const {
      totalProduct,
      totalProductSold,
      totalTransaction,
      // products,
      coupons,
      stocks,
      brands,
      categories,
      orders,
    } = this.state;
    return (
      <div>
        <GridContainer>
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
                  {totalProduct}
                </h3>
              </CardHeader>
              <CardFooter>
                <div className={classes.stats}>
                  <Danger>
                    <AddCircle />
                  </Danger>
                  <Link to="#Products" onClick={e => e.preventDefault()}>
                    Add More Products
                  </Link>
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
                  Total Sold
                </p>
                <h3 className={classes.cardTitle}>
                  {totalTransaction}
                </h3>
              </CardHeader>
              <CardFooter>
                <div className={classes.stats}>
                  <History />
                  Sales History
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="danger">
                <CardIcon color="danger">
                  <AttachMoney />
                </CardIcon>
                <p className={classes.cardCategory}>
                  Total Earnings
                </p>
                <h3 className={classes.cardTitle}>
                  {`$${totalProductSold}`}
                </h3>
              </CardHeader>
              <CardFooter>
                <div className={classes.stats}>
                  <LocalOffer />
                  Tracked from Store
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="info">
                <CardIcon color="info">
                  <Loyalty />
                </CardIcon>
                <p className={classes.cardCategory}>
                  Used Coupons
                </p>
                <h3 className={classes.cardTitle}>
                  {getUsedCoupon(orders)}
                </h3>
              </CardHeader>
              <CardFooter>
                <div className={classes.stats}>
                  <Update />
                  From Customers
                </div>
              </CardFooter>
            </Card>
          </GridItem>

        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <Card>
              <CardHeader style={{ height: "200px" }} color="info">
                <ChartistGraph
                  className="ct-chart"
                  data={getDailySales()}
                  type="Line"
                  options={completedTasksChart.options}
                  listener={completedTasksChart.animation}
                />
              </CardHeader>
              <CardBody>
                <h4>
                  Daily Sales
                </h4>
                <p>
                  {"Increase in Today's Sales"}
                </p>
              </CardBody>
              <CardFooter>
                <div className={classes.stats}>
                  <AccessTime />
                  &nbsp;
                  Updated 4 minutes ago
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card>
              <CardHeader style={{ height: "200px" }} color="success">
                <ChartistGraph
                  className="ct-chart"
                  data={getWeeklySales()}
                  type="Line"
                  options={dailySalesChart.options}
                  listener={dailySalesChart.animation}
                />
              </CardHeader>
              <CardBody>
                <h4>
                  Weekly Sales
                </h4>
                <p>
                  Increase in Weekly Sales.
                </p>
              </CardBody>
              <CardFooter>
                <div className={classes.stats}>
                  <AccessTime />
                  &nbsp;
                  updated 4 minutes ago
                </div>
              </CardFooter>
            </Card>
          </GridItem>


          <GridItem xs={12} sm={12} md={4}>
            <Card>
              <CardHeader style={{ height: "200px" }} color="info">
                <ChartistGraph
                  className="ct-chart"
                  data={getMonthlySales()}
                  type="Bar"
                  options={emailsSubscriptionChart.options}
                  responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                  listener={emailsSubscriptionChart.animation}
                />
              </CardHeader>
              <CardBody>
                <h4>
                  Monthly Sales
                </h4>
                <p>
                  Monthly Sales Performance
                </p>
              </CardBody>
              <CardFooter>
                <div className={classes.stats}>
                  <AccessTime />
                  &nbsp;
                  Updated 2 days ago
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>

        <Grid container>
          <GridItem xs={12} sm={12} md={6}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>
                  Orders
                </h4>
                <p className={classes.cardCategoryWhite}>
                  Orders Overview
                </p>
              </CardHeader>
              <CardBody>
                <Table
                  tableHeaderColor="primary"
                  tableHead={["ID", "Status", "Total"]}
                  tableData={[
                    ["1", "Total", getTotalOrder(orders)],
                    ["2", "Paid", getOrderStatus(orders, "paid")],
                    ["3", "Pending", getOrderStatus(orders, "pending")],
                    ["4", "Delivered", getOrderStatus(orders, "delivered")],
                    ["5", "Cancelled", getOrderStatus(orders, "cancel")],
                  ]}
                />
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>
                  Products
                </h4>
                <p className={classes.cardCategoryWhite}>
                  Products Overview
                </p>
              </CardHeader>
              <CardBody>
                <Table
                  tableHeaderColor="primary"
                  tableHead={["ID", "Status", "Total"]}
                  tableData={[
                    ["1", "Total", totalProduct],
                    ["2", "Stock", getTotalStock(stocks)],
                    ["3", "Coupons", getTotalStock(coupons)],
                    ["4", "Product Categories", getTotalCategory(categories)],
                    ["5", "Product Brands", getTotalBrand(brands)],
                    // ["5", "Store Value", "$560,000"],
                  ]}
                />
              </CardBody>
            </Card>
          </GridItem>
        </Grid>

      </div>
    );
  }
}

export default Dashboard;
