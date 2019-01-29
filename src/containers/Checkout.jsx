import { connect } from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import componentsStyle from "../assets/jss/material-kit-react/views/components";
import CheckoutComponent from "../views/CheckoutPage/Checkout";

const mapStateToProps = state => ({
  shoppingCart: state.products.shoppingCart,
});

const Checkout = connect(
  mapStateToProps,
)(CheckoutComponent);

export default withStyles(componentsStyle)(Checkout);
