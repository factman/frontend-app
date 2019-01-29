import { connect } from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import loginPageStyle from "../assets/jss/material-kit-react/views/loginPage";
import LoginComponent from "../views/LoginPage/Login";

const mapStateToProps = state => ({
  info: state.front,
});

const Login = connect(
  mapStateToProps,
)(LoginComponent);

export default withStyles(loginPageStyle)(Login);
