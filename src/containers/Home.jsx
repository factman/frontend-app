import { connect } from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import componentsStyle from "../assets/jss/material-kit-react/views/components";
import HomeComponent from "../views/HomePage/Home";
import { getShopLocation } from "../routes/routingSystem";

const mapStateToProps = state => ({
  front: state.front,
  products: state.products,
  shopLocation: getShopLocation(),
});

const Home = connect(
  mapStateToProps,
)(HomeComponent);

export default withStyles(componentsStyle)(Home);
