import { connect } from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import componentsStyle from "../assets/jss/material-kit-react/views/components";
import SingleBlogPageComponent from "../views/BlogPages/SingleBlogPage";
import { getShopLocation } from "../routes/routingSystem";

const mapStateToProps = state => ({
  blog: state.front.blog,
  categories: state.front.categories,
  vendor: state.front.vendor,
  shopLocation: getShopLocation(),
});

const SingleBlogPage = connect(
  mapStateToProps,
)(SingleBlogPageComponent);

export default withStyles(componentsStyle)(SingleBlogPage);
