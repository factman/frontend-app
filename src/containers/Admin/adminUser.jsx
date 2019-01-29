import { connect } from "react-redux";
import AdminsComponent from "../../Admin/AdminUser/admin";
import {
  fetchAdmins,
  deleteAdmins,
  patchAdmin,
} from "../../actions/actions_admin_adminusers";

const mapStateToProps = state => ({
  adminUser: state.adminUser,
});

const mapDispatchToProps = dispatch => ({
  fetchAdmins: () => {
    dispatch(fetchAdmins());
  },
  deleteAdmins: (adminID) => {
    dispatch(deleteAdmins(adminID));
  },
  patchAdmin: (adminPatchDetails, adminID) => {
    dispatch(patchAdmin(adminPatchDetails, adminID));
  },
});

const Admins = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AdminsComponent);

export default Admins;
