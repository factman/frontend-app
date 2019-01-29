import { connect } from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import UserProfilesComponent from "../views/UserProfile/UserProfile";
import {
  updatedVendorProfile,
  fetchUserProfile,
} from "../actions/actions_vendor";

const UserProfilesStyle = theme => ({
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
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
  vendorProfile: state.vendorProfile,
});

const mapDispatchToProps = (dispatch) => {
  const dispatchToProps = {
    updatedVendorProfile: (vendorProfile) => {
      dispatch(updatedVendorProfile(vendorProfile));
    },
    fetchUserProfile: (vendorID) => {
      dispatch(fetchUserProfile(vendorID));
    },
  };
  return dispatchToProps;
};

const UserProfiles = connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserProfilesComponent);

export default withStyles(UserProfilesStyle)(UserProfiles);
