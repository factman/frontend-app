import { connect } from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import componentsStyle from "../assets/jss/material-kit-react/views/components";
import ProductListComponent from "../views/ProductPages/Products";
import { getShopLocation } from "../routes/routingSystem";

const mapStateToProps = state => ({
  front: state.front,
  products: state.products,
  shopLocation: getShopLocation(),
});

const ProductList = connect(
  mapStateToProps,
)(ProductListComponent);

export default withStyles(componentsStyle)(ProductList);
