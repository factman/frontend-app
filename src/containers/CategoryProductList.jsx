import { connect } from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import componentsStyle from "../assets/jss/material-kit-react/views/components";
import CategoryProductListComponent from "../views/CategoryPage/Categories";
import { getShopLocation } from "../routes/routingSystem";

const mapStateToProps = state => ({
  front: state.front,
  products: state.products.allProducts,
  shopLocation: getShopLocation(),
});

const CategoryProductList = connect(
  mapStateToProps,
)(CategoryProductListComponent);

export default withStyles(componentsStyle)(CategoryProductList);
