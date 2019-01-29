import { connect } from "react-redux";
import ShopsComponent from "../views/Shop/shop";
import {
  deployContract,
  contractStatus,
  saveDeployContract,
  fetchUserProfile,
  saveContractStatus,
  updatedVendorProfile,
} from "../actions/actions_vendor";
import { postImage } from "../actions/actions_imageupload";

const mapStateToProps = state => ({
  vendorProfile: state.vendorProfile,
});

const mapDispatchToProps = dispatch => ({
  deployContract: deployContractData => dispatch(deployContract(deployContractData)),
  saveDeployContract: contractAddressData => dispatch(saveDeployContract(contractAddressData)),
  contractStatus: contractAddressData => dispatch(contractStatus(contractAddressData)),
  saveContractStatus: () => dispatch(saveContractStatus()),
  postImage: (imageDetail, collectionId) => dispatch(postImage(imageDetail, collectionId)),
  fetchUserProfile: () => dispatch(fetchUserProfile()),
  updatedVendorProfile: generalSettings => dispatch(
    updatedVendorProfile(generalSettings),
  ),
});

const Shops = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ShopsComponent);

export default Shops;
