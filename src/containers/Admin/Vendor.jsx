import { connect } from "react-redux";
import VendorsComponent from "../../Admin/Vendors/vendors";
import {
  fetchVendors,
  patchVendor,
  vendorApproval,
  deleteVendors,
} from "../../actions/actions_admin_vendor";

const mapStateToProps = state => ({
  adminVendor: state.adminVendor,
});

const mapDispatchToProps = dispatch => ({
  fetchVendors: () => {
    dispatch(fetchVendors());
  },
  patchVendor: (adminVendorDetails, vendorID) => {
    dispatch(patchVendor(adminVendorDetails, vendorID));
  },
  vendorApproval: (adminVendorDetails, vendorID) => {
    dispatch(vendorApproval(adminVendorDetails, vendorID));
  },
  deleteVendors: (vendorID) => {
    dispatch(deleteVendors(vendorID));
  },
});

const Vendors = connect(
  mapStateToProps,
  mapDispatchToProps,
)(VendorsComponent);

export default Vendors;
