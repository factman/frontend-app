import { connect } from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import componentsStyle from "../assets/jss/material-kit-react/views/components";
import VendorComponent from "../views/VendorPage/Vendor";
import { getShopLocation } from "../routes/routingSystem";

const mapStateToProps = state => ({
  front: state.front,
  shopLocation: getShopLocation(),
});

const Vendor = connect(
  mapStateToProps,
)(VendorComponent);

export default withStyles(componentsStyle)(Vendor);
