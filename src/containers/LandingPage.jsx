import { connect } from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import landingPageStyle from "../assets/jss/material-kit-react/views/landingPage";
import LandingPageComponent from "../views/LandingPage/LandingPage";

const mapStateToProps = state => ({
  search: state.search,
});

const LandingPage = connect(
  mapStateToProps,
)(LandingPageComponent);

export default withStyles(landingPageStyle)(LandingPage);
