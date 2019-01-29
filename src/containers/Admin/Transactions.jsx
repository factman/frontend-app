/*
*@desc the Transaction container used by REDUX
*@author Sylvia Onwukwe
*/
import { connect } from "react-redux";
import TransactionsComponent from "../../Admin/Transactions/transactions";
import { fetchTransactions, deleteTransactions } from "../../actions/actions_admin_transactions";

const mapStateToProps = state => ({
  adminTransaction: state.adminTransaction,
});

const mapDispatchToProps = (dispatch, newProps) => (
  {
    fetchTransactions: () => {
      dispatch(fetchTransactions());
    },
    deleteTransactions: (transactionID) => {
      dispatch(deleteTransactions(transactionID));
    },
  }
);

const Transactions = connect(
  mapStateToProps,
  mapDispatchToProps,
)(TransactionsComponent);

export default Transactions;
