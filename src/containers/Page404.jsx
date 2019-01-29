import { connect } from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import loginPageStyle from "../assets/jss/material-kit-react/views/loginPage";
import Page404Component from "../views/Page404/Page404";

const mapStateToProps = state => ({
  info: state.info,
});

const Page404 = connect(
  mapStateToProps,
)(Page404Component);

export default withStyles(loginPageStyle)(Page404);
