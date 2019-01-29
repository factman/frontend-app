import React from "react";
import NumberFormat from "react-number-format";
import randomstring from "randomstring";
import withStyles from "@material-ui/core/styles/withStyles";
import Hidden from "@material-ui/core/Hidden";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Table from "@material-ui/core/Table";
import TableFooter from "@material-ui/core/TableFooter";
import Snackbar from "@material-ui/core/Snackbar";
import BezopSnackBar from "../../assets/jss/bezop-mkr/BezopSnackBar";
import tooltipsStyle from "../../assets/jss/material-kit-react/tooltipsStyle";
import Currency from "../../helpers/currencyOperations";
import { getUserProfile, getUsersToken } from "../Auth/AccessControl";
import GridContainer from "../Grid/GridContainer";
import GridItem from "../Grid/GridItem";
import { API_URL } from "../Auth/UsersAuth";
import Shipment from "./Sections/Shipment";
import Payment from "./Sections/Payment";
import CartObject from "../../helpers/customerOperations";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 2,
    overflowX: "auto",
    padding: "0px",
  },
  table: {
    minWidth: 700,
  },
  cartIcon: {
    fontSize: "1.3em",
    marginBottom: "-10px",
  },
  header: {
    borderBottom: "1px solid lightgray",
  },
  tableHeader: {
    textTransform: "uppercase",
  },
  tablePadding: {
    padding: "2px 0px",
  },
  productName: {
    fontWeight: "500",
  },
  productHeadings: {
    margin: "0px",
    paddingLeft: "5px",
  },
  bigMore: {
    float: "right", fontSize: "0.4em",
  },
  tooltip: tooltipsStyle.tooltip,
});

class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Cart: CartObject.getCart(),
      Products: (props.data.products) ? props.data.products : {},
      currentCurrency: this.getCurrentCurrency() || { code: "USD", exchange: 1, symbol: "$" },
      couponCode: 0,
      orderShipment: this.initShipment(),
      saveShipment: false,
      loading: false,
      orderStatus: this.getStatus(),
      variantSnackBar: "success",
      snackBarOpenSuccess: false,
      snackBarMessageSuccess: "Yet to decide the action",
    };

    this.products = {};

    this.cart = {
      getQuantity: (id) => {
        try {
          const { state } = this;
          const product = (state.Products) ? state.Products[id] : {};
          return CartObject.getQuantity(product);
        } catch (ex) {
          console.log(ex.message);
        }
        return 1;
      },
      emptyCart: () => {
        try {
          const { events } = props.data;
          CartObject.emptyCart(this, events);
        } catch (ex) {
          console.log(ex.message);
        }
      },
    };
  }

  componentWillReceiveProps(newProps) {
    this.setState({ Products: newProps.data.products });
  }

  onCloseHandlerSuccess = () => {
    this.setState({
      snackBarOpenSuccess: false,
    });
  };

  getProducts = ids => fetch(`${API_URL}/products/operations/${ids.join("/")}/?key=${process.env.REACT_APP_API_KEY}`)
    .then(response => response.json())
    .then((json) => {
      if (json.success && Object.keys(json.data).length > 0) {
        this.setState({ Products: json.data });
      }
      throw new Error(json.message);
    })
    .catch(error => console.log(error.message));

    setShipmentValues = (event) => {
      try {
        const { id, value } = event.target;
        const { orderShipment } = this.state;

        switch (id) {
          case "fullname":
          case "phone":
          case "email":
          case "note":
            orderShipment[id] = value;
            this.setState({ orderShipment, saveShipment: false });
            break;
          case "zip":
          case "country":
          case "state":
          case "city":
          case "street":
          case "building":
            orderShipment.shipping[id] = value;
            this.setState({ orderShipment, saveShipment: false });
            break;
          default:
        }
      } catch (ex) {
        console.log(ex.message);
      }
    };

    getCurrentCurrency = () => {
      try {
        const order = JSON.parse(localStorage.getItem("order"));
        if (!order) window.location.href = "/cart";
        return order.vendorOrders
          ? Currency.getCurrencyById(order.vendorOrders[0].payable.currency)
          : Currency.getCurrencyById(order.payable.currency);
      } catch (ex) {
        console.log(ex.message);
      }
      return null;
    };

  getStatus = () => {
    try {
      const order = JSON.parse(localStorage.getItem("order"));
      return typeof order.vendorOrders === "object";
    } catch (ex) {
      console.log(ex.message);
    }
    return false;
  };

  initShipment = () => {
    try {
      const { fullname, phone, email, shipping, id } = getUserProfile("customer");
      const order = JSON.parse(localStorage.getItem("order"));
      if (order.orderStatus === undefined) {
        return (Object.assign(order, {
          orderNum: randomstring.generate(10),
          customer: id,
          fullname,
          phone,
          email,
          note: "",
          shipping: {
            zip: shipping.zip,
            country: shipping.country,
            state: shipping.state,
            city: shipping.city,
            street: shipping.street,
            building: shipping.building,
          },
        }));
      }
      return order;
    } catch (ex) {
      console.log(ex.message);
    }
    return null;
  };

  saveShipmentStatus = () => {
    this.setState({ saveShipment: true, variantSnackBar: "success", snackBarOpenSuccess: true, snackBarMessageSuccess: "Shipment Saved." });
  };

  placeOrder = () => {
    this.setState({ loading: true });
    const { orderShipment, Cart } = this.state;
    const { accessToken } = getUsersToken("customer");
    const productIds = [];
    Cart.map(item => productIds.push(item.product));
    const orders = { Products: productIds, vendorOrders: [] };
    this.cart.emptyCart();

    Object.keys(orderShipment.products).map((vendorId) => {
      const vendorOrder = {
        payable: {
          currency: orderShipment.payable.currency,
          amount: 0,
        },
        shipmentDetails: {
          deliveryNote: orderShipment.note,
          recipient: orderShipment.fullname,
          country: orderShipment.shipping.country,
          state: orderShipment.shipping.state,
          city: orderShipment.shipping.city,
          street: orderShipment.shipping.street,
          building: orderShipment.shipping.building,
          zip: orderShipment.shipping.zip,
          phone: orderShipment.phone,
          email: orderShipment.email,
        },
        orderNum: orderShipment.orderNum,
        vendor: vendorId,
        customer: orderShipment.customer,
        products: [],
      };
      Object.keys(orderShipment.products[vendorId]).map((pid) => {
        vendorOrder.products.push({
          quantity: orderShipment.products[vendorId][pid].quantity,
          product: pid,
        });
        vendorOrder.payable.amount += orderShipment.products[vendorId][pid].subTotal;
        return null;
      });

      fetch(`${API_URL}/orders/customer/?key=${process.env.REACT_APP_API_KEY}`, {
        body: JSON.stringify(vendorOrder),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        method: "POST",
      })
        .then(res => res.json())
        .then((responseJSON) => {
          if (responseJSON.success && Object.keys(responseJSON.data).length > 1) {
            const order = responseJSON.data;
            orders.vendorOrders.push(order);
            localStorage.setItem("order", JSON.stringify(orders));
            // this.setState({ orderStatus: true, loading: false });
            window.location.reload();
          } else {
            console.log(responseJSON);
            this.setState({ loading: false });
          }
        })
        .catch((ex) => {
          console.log(ex.message);
          this.setState({ loading: false });
        });
      return null;
    });
  };

  render() {
    const { classes } = this.props;
    const {
      Products,
      Cart,
      currentCurrency,
      couponCode,
      orderShipment,
      saveShipment,
      loading,
      orderStatus,
      variantSnackBar,
      snackBarOpenSuccess,
      snackBarMessageSuccess,
    } = this.state;

    let tax = 0;
    let shipment = 0;
    let subTotal = 0;
    const coupon = couponCode;

    try {
      if (Object.keys(Products).length > 0) {
        Object.values(Products).map((product) => {
          const Price = Currency.resolvePrices(product);
          let productQuantity = 1;
          Cart.map((item) => {
            if (item.product === product.id) {
              productQuantity = item.quantity;
            }
            return item;
          });
          const discount = Price.discount * productQuantity;
          const vat = Price.tax * productQuantity;
          const shipping = Price.shipping * productQuantity;
          const total = (((Price.unitPrice * productQuantity) - discount) + vat + shipping);
          subTotal += total;
          tax += vat;
          shipment += shipping;
          this.products[product.id] = {
            unitPrice: Price.unitPrice,
            discount,
            vat,
            shipping,
            total,
          };
          return null;
        });
      }
    } catch (ex) {
      console.log(ex.message);
    }

    const grandTotal = subTotal - coupon;

    return (
      <div className={classes.root}>
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
        <GridContainer>
          <GridItem md={8}>
            {!orderStatus ? (
              <Shipment
                classes={classes}
                orderShipment={orderShipment}
                setShipmentValues={this.setShipmentValues}
                saveShipmentStatus={this.saveShipmentStatus}
                saveShipment={saveShipment}
                loading={loading}
                placeOrder={this.placeOrder}
              />)
              : (
                <Payment
                  Products={Products}
                  classes={classes}
                  getProducts={this.getProducts}
                />)}
          </GridItem>
          <GridItem md={4}>
            <Hidden smDown>
              <h2 className={classes.header}>
                Order Summary
              </h2>
            </Hidden>
            <Hidden mdUp>
              <h3 className={classes.header}>
                Order Summary
              </h3>
            </Hidden>
            <Table padding="none">
              <TableHead style={{ background: "lightgray" }}>
                <TableRow className={classes.tableHeader}>
                  <TableCell>
                    Product
                  </TableCell>
                  <TableCell numeric>
                    Quantity
                  </TableCell>
                  <TableCell numeric>
                    Subtotal
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(Object.values(Products).length > 0)
                  ? Object.values(Products).map(product => (
                    <TableRow key={product.id}>
                      <TableCell className={classes.tablePadding}>
                        <h6 className={classes.productName} title={product.name}>
                          {`${(product.name.length > 20) ? `${product.name.slice(0, 20)}...` : product.name}`}
                        </h6>
                      </TableCell>
                      <TableCell numeric className={classes.tablePadding}>
                        <h5 style={{ textAlign: "center", width: "70px", margin: "auto" }}>
                          {this.cart.getQuantity(product.id)}
                        </h5>
                      </TableCell>
                      <TableCell numeric className={classes.tablePadding}>
                        <NumberFormat
                          value={Currency.dollarConverter(currentCurrency.code || "USD", this.products[product.id].total, "FROM_USD")}
                          displayType="text"
                          thousandSeparator
                          prefix={`${currentCurrency.symbol} `}
                          decimalScale={2}
                          fixedDecimalScale
                          renderText={value => (
                            <h5>
                              {value}
                            </h5>
                          )}
                        />
                      </TableCell>
                    </TableRow>
                  ))
                  : <TableRow />
            }
              </TableBody>
            </Table>
            <hr />
            <Table padding="none">
              <TableBody>
                <TableRow>
                  <TableCell className={classes.tablePadding}>
                    <h4 className={classes.productHeadings}>
                      Tax:
                      &nbsp;
                    </h4>
                  </TableCell>
                  <TableCell numeric className={classes.tablePadding}>
                    <NumberFormat
                      value={Currency.dollarConverter(currentCurrency.code || "USD", tax, "FROM_USD")}
                      displayType="text"
                      thousandSeparator
                      prefix={`${currentCurrency.symbol} `}
                      decimalScale={2}
                      fixedDecimalScale
                      renderText={value => (
                        <h4>
                          {value}
                        </h4>
                      )}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.tablePadding}>
                    <h4 className={classes.productHeadings}>
                      Shipping&nbsp;Fee:
                      &nbsp;
                    </h4>
                  </TableCell>
                  <TableCell numeric className={classes.tablePadding}>
                    <NumberFormat
                      value={Currency.dollarConverter(currentCurrency.code || "USD", shipment, "FROM_USD")}
                      displayType="text"
                      thousandSeparator
                      prefix={`${currentCurrency.symbol} `}
                      decimalScale={2}
                      fixedDecimalScale
                      renderText={value => (
                        <h4>
                          {value}
                        </h4>
                      )}
                    />
                  </TableCell>
                </TableRow>
                {coupon > 0 ? (
                  <TableRow>
                    <TableCell className={classes.tablePadding}>
                      <h4 className={classes.productHeadings}>
                        Coupon&nbsp;Code:
                        &nbsp;
                      </h4>
                    </TableCell>
                    <TableCell numeric className={classes.tablePadding}>
                      <NumberFormat
                        value={Currency.dollarConverter(currentCurrency.code || "USD", coupon, "FROM_USD")}
                        displayType="text"
                        thousandSeparator
                        prefix={`${currentCurrency.symbol} `}
                        decimalScale={2}
                        fixedDecimalScale
                        renderText={value => (
                          <h4>
                            {value}
                          </h4>
                        )}
                      />
                    </TableCell>
                  </TableRow>)
                  : null}
              </TableBody>
              <TableFooter>
                <TableRow style={{ background: "lightgray" }}>
                  <TableCell className={classes.tablePadding}>
                    <h3 className={classes.productHeadings}>
                      Grand&nbsp;Total:
                      &nbsp;
                    </h3>
                  </TableCell>
                  <TableCell numeric className={classes.tablePadding}>
                    <NumberFormat
                      value={Currency.dollarConverter(currentCurrency.code || "USD", grandTotal, "FROM_USD")}
                      displayType="text"
                      thousandSeparator
                      prefix={`${currentCurrency.symbol} `}
                      decimalScale={2}
                      fixedDecimalScale
                      renderText={value => (
                        <h3>
                          {value}
                        </h3>
                      )}
                    />
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default withStyles(styles)(Checkout);
