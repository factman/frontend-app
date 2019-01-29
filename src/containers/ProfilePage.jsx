import { connect } from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import { styles } from "../assets/jss/CustomerProfileStyles";
import ProfilePageComponent from "../views/ProfilePage/ProfilePage";

const mapStateToProps = state => ({
  front: state.front,
});

const ProfilePage = connect(
  mapStateToProps,
)(ProfilePageComponent);

export default withStyles(styles)(ProfilePage);
