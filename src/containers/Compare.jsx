import { connect } from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import componentsStyle from "../assets/jss/material-kit-react/views/components";
import CompareComponent from "../views/ComparePage/Compare";

const mapStateToProps = state => ({
  shoppingCart: state.products.shoppingCart,
});

const Compare = connect(
  mapStateToProps,
)(CompareComponent);

export default withStyles(componentsStyle)(Compare);
