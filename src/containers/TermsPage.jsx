import { connect } from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import componentsStyle from "../assets/jss/material-kit-react/views/components";
import TermsPageComponent from "../views/TermsPage/TermsPage";

const mapStateToProps = state => ({
  info: state.front,
});

const TermsPage = connect(
  mapStateToProps,
)(TermsPageComponent);

export default withStyles(componentsStyle)(TermsPage);
