/*
*@desc the container of customers used by REDUX 
*@author Sylvia Onwukwe
*/
import { connect } from "react-redux";
import AdminCustomersComponent from "../../Admin/Customers/customers";
import { 
  fetchCustomers,
  deleteCustomers } from "../../actions/actions_admin_customers"
  
const mapStateToProps = state => ({
  adminCustomers: state.adminCustomers
});

const mapDispatchToProps = (dispatch, newProps) => {
  return {
    fetchCustomers: () => {
      dispatch(fetchCustomers());
    },
    deleteCustomers: (customerID) => {
      dispatch(deleteCustomers(customerID));
    }
  }
}

const AdminCustomers = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminCustomersComponent);

export default AdminCustomers;
