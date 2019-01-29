import { connect } from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import loginPageStyle from "../assets/jss/material-kit-react/views/loginPage";
import AccountSetupComponent from "../views/VendorSetup/AccountSetup";

const mapStateToProps = state => ({
  info: state.front,
});

const AccountSetup = connect(
  mapStateToProps,
)(AccountSetupComponent);

export default withStyles(loginPageStyle)(AccountSetup);
