import React from "react";
import CreditCard from "@material-ui/icons/CreditCard";
import Web3 from "web3";
import Snackbar from "@material-ui/core/Snackbar";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Table from "@material-ui/core/Table";
import Hidden from "@material-ui/core/Hidden";
import TableHead from "@material-ui/core/TableHead";
import Typography from "@material-ui/core/Typography";
import TableFooter from "@material-ui/core/TableFooter";

import NumberFormat from "react-number-format";
import BezopSnackBar from "../../../assets/jss/bezop-mkr/BezopSnackBar";
import Currency from "../../../helpers/currencyOperations";
import Button from "../../CustomButtons/Button";
import { PaymentObject } from "../../../helpers/customerOperations";
import { getUserProfile } from "../../Auth/AccessControl";

const web3 = new Web3();

class Payment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      order: (localStorage.getItem("order")) ? JSON.parse(localStorage.getItem("order")) : {},
      currency: this.getOrderCurrency(),
      loading: false,
      variantSnackBar: "success",
      snackBarOpenSuccess: false,
      snackBarMessageSuccess: "Yet to decide the action",
      paid: false,
    };
  }

  componentWillMount() {
    const { order } = this.state;
    const { getProducts } = this.props;
    const products = [];
    order.vendorOrders[0].products.map(item => products.push(item.product));
    getProducts(products);
  }

  onCloseHandlerSuccess = () => {
    this.setState({
      snackBarOpenSuccess: false,
    });
  };

  getOrderCurrency = () => {
    try {
      const order = (localStorage.getItem("order")) ? JSON.parse(localStorage.getItem("order")) : {};
      return Currency.getCurrencyById(order.vendorOrders[0].payable.currency);
    } catch (ex) {
      console.log(ex.message);
    }
    return null;
  };

  userSignMessage = ({ price, vendorName, publicAddress }) => {
    this.setState({ loading: true });
    console.log(publicAddress);
    console.log(web3);
    return new Promise((resolve, reject) => web3.eth.personal.sign(
      web3.utils.fromUtf8(`I hereby sign, to acknowledge the payment of ${price} to ${vendorName}.`),
      publicAddress,
      (err, signature) => {
        if (err) {
          this.setState({ loading: false, variantSnackBar: "error", snackBarOpenSuccess: true, snackBarMessageSuccess: "Payment Signing Canceled." });
          return reject(err);
        }
        this.setState({ loading: true, variantSnackBar: "success", snackBarOpenSuccess: true, snackBarMessageSuccess: "Payment Signed." });
        return resolve(true);
      },
    ));
  };

  handlePay = (productCart, price, currency) => {
    const { Products } = this.props;
    const { order } = this.state;
    // const { publicAddress } = getUserProfile("customer");
    // const vendorName = Products[order.vendorOrders[0].products[0].product].vendor.businessName;
    // this.userSignMessage({ price, vendorName, publicAddress })
    // .then((value) => {
    // if (!value) throw new Error("Payment not signed.");
    const data = {
      contractAddress: Products[order.vendorOrders[0].products[0].product].vendor.contractAddress.toLowerCase(),
      vendorAddress: Products[order.vendorOrders[0].products[0].product].vendor.publicAddress,
      customerAddress: getUserProfile("customer").publicAddress,
      productHash: web3.utils.toHex(productCart),
      currencyAddress: Currency.getCurrencyById(currency).currencyAddress,
      valueTotal: price,
      initialDeposit: 2,
    };
    console.log(data);
    try {
      PaymentObject.pay(data)
        .then((pay) => {
          if (pay) {
            this.setState({ paid: true, loading: false, variantSnackBar: "success", snackBarOpenSuccess: true, snackBarMessageSuccess: "Payment Completed." });
          } else {
            this.setState({ loading: false, variantSnackBar: "error", snackBarOpenSuccess: true, snackBarMessageSuccess: "Unable to complete payment." });
          }
        });
    } catch (ex) {
      console.log(ex.message);
      this.setState({ loading: false, variantSnackBar: "error", snackBarOpenSuccess: true, snackBarMessageSuccess: "Unable to complete payment." });
    }
    // })
    // .catch((ex) => {
    //   console.log(ex.message);
    //   this.setState({ loading: false, variantSnackBar: "error", snackBarOpenSuccess: true, snackBarMessageSuccess: "Unable to sign payment." });
    // });
  };

  render() {
    const { classes, Products } = this.props;
    const {
      order,
      currency,
      loading,
      variantSnackBar,
      snackBarOpenSuccess,
      snackBarMessageSuccess,
      paid,
    } = this.state;

    return (
      <div>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={snackBarOpenSuccess}
          onClose={this.onCloseHandlerSuccess}
        >
          <BezopSnackBar
            onClose={this.onCloseHandlerSuccess}
            variant={variantSnackBar}
            message={snackBarMessageSuccess}
          />
        </Snackbar>
        <Hidden smDown>
          <h2 className={classes.header}>
            <CreditCard className={classes.cartIcon} />
            &nbsp;
            Payment
          </h2>
        </Hidden>
        <Hidden mdUp>
          <h3 className={classes.header}>
            <CreditCard className={classes.cartIcon} />
            &nbsp;
            Payment
          </h3>
        </Hidden>
        {(Object.values(Products).length > 0)
          ? Object.values(order.vendorOrders).map(vendorOrder => (
            <Table padding="none" key={vendorOrder.id}>
              <TableHead style={{ background: "lightgray" }}>
                <TableRow className={classes.tableHeader}>
                  <TableCell>
                    Product
                  </TableCell>
                  <TableCell numeric>
                    Payable
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell colSpan="3" className={classes.tablePadding}>
                    <Typography variant="subheading" align="center">
                      {Products[vendorOrder.products[0].product].vendor.businessName}
                    </Typography>
                  </TableCell>
                </TableRow>
                {vendorOrder.products.map(product => (
                  <TableRow key={product.product}>
                    <TableCell className={classes.tablePadding}>
                      <h6 className={classes.productName} title={Products[product.product].name}>
                        {`${(Products[product.product].name.length > 60) ? `${Products[product.product].name.slice(0, 60)}...` : Products[product.product].name}`}
                      </h6>
                    </TableCell>
                    <TableCell numeric className={classes.tablePadding}>
                      <NumberFormat
                        value={Currency.dollarConverter(currency.code || "USD", vendorOrder.payable.amount, "FROM_USD")}
                        displayType="text"
                        thousandSeparator
                        prefix={`${currency.symbol} `}
                        decimalScale={2}
                        fixedDecimalScale
                        renderText={value => (
                          <h5>
                            {value}
                          </h5>
                        )}
                      />
                    </TableCell>
                  </TableRow>))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={2} numeric className={classes.tablePadding}>
                    {!paid
                      ? (
                        <Button
                          color="primary"
                          round
                          size="md"
                          onClick={() => this.handlePay(
                            vendorOrder.products,
                            vendorOrder.payable.amount,
                            vendorOrder.payable.currency,
                          )}
                          style={{
                            fontWeight: "bold",
                            fontSize: "1.3em",
                          }}
                        >
                          {loading ? "Loading..." : "Pay"}
                        </Button>)
                      : (
                        <Button
                          color="success"
                          round
                          size="md"
                          onClick={() => window.location.assign("/profile")}
                          style={{
                            fontWeight: "bold",
                            fontSize: "1.3em",
                          }}
                        >
                          {"Continue >"}
                        </Button>
                      )}
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          ))
          : null}
      </div>
    );
  }
}

export default Payment;
