import { connect } from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import componentsStyle from "../assets/jss/material-kit-react/views/components";
import SingleProductComponent from "../views/ProductPages/SingleProduct";
import { getShopLocation } from "../routes/routingSystem";

const mapStateToProps = state => ({
  products: state.products,
  customerReview: state.customerReview,
  front: state.front,
  shopLocation: getShopLocation(),
});

const SingleProduct = connect(
  mapStateToProps,
)(SingleProductComponent);

export default withStyles(componentsStyle)(SingleProduct);
