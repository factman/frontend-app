import { connect } from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import componentsStyle from "../assets/jss/material-kit-react/views/components";
import BrandProductListComponent from "../views/BrandPage/Brands";
import { getShopLocation } from "../routes/routingSystem";

const mapStateToProps = state => ({
  front: state.front,
  products: state.products.allProducts,
  shopLocation: getShopLocation(),
});

const BrandProductList = connect(
  mapStateToProps,
)(BrandProductListComponent);

export default withStyles(componentsStyle)(BrandProductList);
