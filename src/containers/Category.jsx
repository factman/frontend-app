import { connect } from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import componentsStyle from "../assets/jss/material-kit-react/views/components";
import CategoryComponent from "../views/CategoryPage/Category";
import { getShopLocation } from "../routes/routingSystem";

const mapStateToProps = state => ({
  front: state.front,
  shopLocation: getShopLocation(),
});

const Category = connect(
  mapStateToProps,
)(CategoryComponent);

export default withStyles(componentsStyle)(Category);
