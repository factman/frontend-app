import { connect } from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import OrdersComponent from "../views/Order/order";

import {
  fetchOrders,
  postPostOrderDetails,
} from "../actions/actions_order";


const OrdersStyle = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0",
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF",
    },
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1",
    },
  },
};
const mapStateToProps = state => ({
  orders: state.orders,
});

const mapStateToDispatch = dispatch => ({
  fetchOrders: () => dispatch(fetchOrders()),
  postPostOrderDetails: () => dispatch(postPostOrderDetails()),
});

const Orders = connect(
  mapStateToProps,
  mapStateToDispatch,
)(OrdersComponent);

export default withStyles(OrdersStyle)(Orders);
