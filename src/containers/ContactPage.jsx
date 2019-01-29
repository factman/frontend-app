import { connect } from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import componentsStyle from "../assets/jss/material-kit-react/views/components";
import ContactPageComponent from "../views/ContactPage/ContactPage";
import { getShopLocation } from "../routes/routingSystem";

const mapStateToProps = state => ({
  vendor: state.front.vendor,
  map: state.map.map,
  categories: state.front.categories,
  shopLocation: getShopLocation(),
});

const ContactPage = connect(
  mapStateToProps,
)(ContactPageComponent);

export default withStyles(componentsStyle)(ContactPage);
