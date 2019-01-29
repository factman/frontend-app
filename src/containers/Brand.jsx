import { connect } from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import componentsStyle from "../assets/jss/material-kit-react/views/components";
import BrandComponent from "../views/BrandPage/Brand";
import { getShopLocation } from "../routes/routingSystem";

const mapStateToProps = state => ({
  front: state.front,
  shopLocation: getShopLocation(),
});

const Brand = connect(
  mapStateToProps,
)(BrandComponent);

export default withStyles(componentsStyle)(Brand);
