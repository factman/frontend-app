import { connect } from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import componentsStyle from "../assets/jss/material-kit-react/views/components";
import AboutPageComponent from "../views/AboutPage/AboutPage";

const mapStateToProps = state => ({
  info: state.front,
});

const AboutPage = connect(
  mapStateToProps,
)(AboutPageComponent);

export default withStyles(componentsStyle)(AboutPage);
