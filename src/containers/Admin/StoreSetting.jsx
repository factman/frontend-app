/*
*@desc the store settings container used by REDUX
*@author Sylvia Onwukwe
*/
import { connect } from "react-redux";
import AdminStoreComponent from "../../Admin/StoreSetting/mainPage";

const mapStateToProps = state => ({
  front: state.front,
});

const AdminStore = connect(
  mapStateToProps,
)(AdminStoreComponent);

export default AdminStore;
