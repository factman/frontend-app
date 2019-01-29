import { connect } from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import AdminProfileComponent from "../../Admin/AdminProfile/adminProfile";
import {
  updatedAdminProfile,
  fetchAdminProfile,
} from "../../actions/actions_admin_adminProfile";

const UserProfilesStyle = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  formControl: {
    margin: theme.spacing.unit,
    width: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});

const mapStateToProps = state => ({
  adminProfile: state.adminProfile,
});
const mapDispatchToProps = (dispatch, newProps) => ({
  updatedAdminProfile: (adminProfile, adminID) => {
    dispatch(updatedAdminProfile(adminProfile, adminID));
  },
  fetchAdminProfile: (adminID) => {
    dispatch(fetchAdminProfile(adminID));
  },
});

const AdminProfile = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AdminProfileComponent);

export default withStyles(UserProfilesStyle)(AdminProfile);
