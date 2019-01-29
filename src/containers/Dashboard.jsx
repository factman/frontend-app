import { connect } from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import dashboardStyle from "../assets/jss/material-kit-react/views/dashboardStyle";
import DashboardComponent from "../views/Dashboard/Dashboard";

import { fetchProducts } from "../actions/actions_product";
import { fetchProductStocks } from "../actions/actions_product_stock";
import { fetchOrders } from "../actions/actions_order";
import { fetchProductBrands } from "../actions/actions_product_brand";
import { fetchProductCategories } from "../actions/actions_product_category";
import { fetchCoupons } from "../actions/actions_vendor_coupon";


const mapStateToProps = state => ({
  dashboard: state.dashboard,
});

const mapStateToDispatch = dispatch => ({
  fetchOrders: () => dispatch(fetchOrders()),
  fetchProducts: () => dispatch(fetchProducts()),
  fetchProductStocks: () => dispatch(fetchProductStocks()),
  fetchProductBrands: () => dispatch(fetchProductBrands()),
  fetchProductCategories: () => dispatch(fetchProductCategories()),
  fetchCoupons: () => dispatch(fetchCoupons()),
});

const Dashboard = connect(
  mapStateToProps,
  mapStateToDispatch,
)(DashboardComponent);

export default withStyles(dashboardStyle)(Dashboard);
