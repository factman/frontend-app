import { connect } from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import componentsStyle from "../assets/jss/material-kit-react/views/components";
import VendorProductListComponent from "../views/VendorPage/Vendors";
import { getShopLocation } from "../routes/routingSystem";

const mapStateToProps = state => ({
  front: state.front,
  shopLocation: getShopLocation(),
});

const VendorProductList = connect(
  mapStateToProps,
)(VendorProductListComponent);

export default withStyles(componentsStyle)(VendorProductList);
