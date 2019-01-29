import { connect } from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import componentsStyle from "../assets/jss/material-kit-react/views/components";
import BlogPageComponent from "../views/BlogPages/BlogPage";
import { getShopLocation } from "../routes/routingSystem";

const mapStateToProps = state => ({
  blogs: state.front.blogs,
  categories: state.front.categories,
  vendor: state.front.vendor,
  shopLocation: getShopLocation(),
});

const BlogPage = connect(
  mapStateToProps,
)(BlogPageComponent);

export default withStyles(componentsStyle)(BlogPage);
