/*
*@desc the order container used by REDUX
*@author Sylvia Onwukwe
*/
import { connect } from "react-redux";
import AdminOrderComponent from "../../Admin/Orders/orders";
import { fetchOrder, deleteOrder } from "../../actions/actions_admin_order";

const mapStateToProps = state => ({
  adminVendor: state.adminVendor,
});

const mapDispatchToProps = (dispatch, newProps) => (
  {
    fetchOrder: () => {
      dispatch(fetchOrder());
    },
    deleteOrder: (orderID) => {
      dispatch(deleteOrder(orderID));
    },
  }
);


const AdminOrder = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AdminOrderComponent);

export default AdminOrder;
