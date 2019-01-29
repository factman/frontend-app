import { connect } from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import componentsStyle from "../assets/jss/material-kit-react/views/components";
import PolicyPageComponent from "../views/PolicyPage/PolicyPage";

const mapStateToProps = state => ({
  info: state.front,
});

const PolicyPage = connect(
  mapStateToProps,
)(PolicyPageComponent);

export default withStyles(componentsStyle)(PolicyPage);
