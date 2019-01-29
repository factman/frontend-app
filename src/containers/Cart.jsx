import { connect } from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import componentsStyle from "../assets/jss/material-kit-react/views/components";
import CartComponent from "../views/CartPage/Cart";

const mapStateToProps = state => ({
  shoppingCart: state.products.shoppingCart,
});

const Cart = connect(
  mapStateToProps,
)(CartComponent);

export default withStyles(componentsStyle)(Cart);
