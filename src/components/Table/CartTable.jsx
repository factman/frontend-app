import React from "react";
import NumberFormat from "react-number-format";
import withStyles from "@material-ui/core/styles/withStyles";
import Hidden from "@material-ui/core/Hidden";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Table from "@material-ui/core/Table";
import Tooltip from "@material-ui/core/Tooltip";
import TableFooter from "@material-ui/core/TableFooter";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import ShoppingCart from "@material-ui/icons/ShoppingCart";
import Clear from "@material-ui/icons/Clear";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Add from "@material-ui/icons/Add";
import Remove from "@material-ui/icons/Remove";
import Refresh from "@material-ui/icons/Refresh";
import { primaryColor } from "../../assets/jss/material-kit-react";
import Button from "../CustomButtons/Button";
import tooltipsStyle from "../../assets/jss/material-kit-react/tooltipsStyle";
import Currency from "../../helpers/currencyOperations";
import { userIs } from "../Auth/AccessControl";
import LinkManager from "../../helpers/linkManager";
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
    padding: "10px 0px",
  },
  productName: {
    fontWeight: "500",
  },
  productHeadings: {
    margin: "0px",
  },
  bigMore: {
    float: "right", fontSize: "0.4em",
  },
  tooltip: tooltipsStyle.tooltip,
});

class CartTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Cart: CartObject.getCart(),
      Products: (props.data.products) ? props.data.products : {},
      currentCurrency: { code: "USD", symbol: "$" },
      couponCode: 0,
    };

    this.orders = {
      payable: {},
      products: {},
      shipmentDetails: {},
    };

    this.products = {};

    Currency.getCurrencies()
      .then((data) => {
        this.currencies = data;
      });

    this.cart = {
      getQuantity: (id) => {
        const { state } = this;
        const product = (state.Products) ? state.Products[id] : {};
        return CartObject.getQuantity(product);
      },
      setQuantity: (id, num) => {
        const { state } = this;
        const product = state.Products[id];
        num = Number(num);
        CartObject.setQuantity(product, num, this);
      },
      removeProduct: (id) => {
        try {
          const { state } = this;
          const { events } = props.data;
          CartObject.removeProduct(id, this, events)
            .then((value) => {
              if (value) {
                const products = Object.assign({}, state.Products);
                delete products[id];
                this.setState({ Products: products });
              }
            });
        } catch (ex) {
          console.log(ex.message);
        }
      },
      emptyCart: () => {
        const { events } = props.data;
        CartObject.emptyCart(this, events);
        this.setState({ Products: {} });
      },
    };
  }

  componentWillMount() {
    Currency.getCurrency("USD")
      .then((data) => {
        this.setState({ currentCurrency: data[0] });
      });
  }

  componentWillReceiveProps(newProps) {
    this.setState({ Products: newProps.data.products });
  }

  setCurrency = (event) => {
    Currency.getCurrency(event.target.value)
      .then((data) => {
        this.orders.payable.currency = data[0].id;
        this.setState({ currentCurrency: data[0] });
      });
  }

  quantityChange = (event) => {
    this.cart.setQuantity(event.target.id, event.target.value);
  };

  handleCheckout = () => {
    localStorage.setItem("order", JSON.stringify(this.orders));
    window.location.href = "/checkout";
  };

  render() {
    const { classes, data } = this.props;
    const { Products, Cart, currentCurrency, couponCode } = this.state;
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
          this.products[product.id] = (
            { unitPrice: Price.unitPrice, discount, vat, shipping, total });
          if (this.orders.products[product.vendor.id] === undefined) {
            this.orders.products[product.vendor.id] = {};
          }
          this.orders.products[product.vendor.id][product.id] = {
            quantity: productQuantity,
            product: product.id,
            sku: product.sku,
            name: product.name,
            subTotal: total,
            vat: tax,
          };
          return null;
        });
      }
    } catch (ex) {
      console.log(ex.message);
    }

    const grandTotal = subTotal - coupon;
    this.orders.payable.amount = grandTotal;
    if (currentCurrency.id) {
      this.orders.payable.currency = currentCurrency.id;
    }

    return (
      <div className={classes.root}>
        <Hidden smDown>
          <h2 className={classes.header}>
            <ShoppingCart className={classes.cartIcon} />
            &nbsp;
            Shopping Cart
            <Button
              color="primary"
              size="sm"
              round
              className={classes.bigMore}
              onClick={() => {
                this.cart.emptyCart();
              }}
            >
              <Refresh />
              &nbsp;
              Restore Cart
            </Button>
          </h2>
        </Hidden>
        <Hidden mdUp>
          <h3 className={classes.header}>
            <ShoppingCart className={classes.cartIcon} />
            &nbsp;
            Shopping Cart
          </h3>
        </Hidden>
        <Table className={classes.table} padding="none">
          <TableHead>
            <TableRow className={classes.tableHeader}>
              <TableCell />
              <TableCell>
                Product
              </TableCell>
              <TableCell numeric>
                Quantity
              </TableCell>
              <TableCell>
                Unit Price
              </TableCell>
              <TableCell>
                Discount
              </TableCell>
              <TableCell>
                Shipment&nbsp;Fee
              </TableCell>
              <TableCell>
                Tax
              </TableCell>
              <TableCell>
                Total
              </TableCell>
              <TableCell numeric>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(Object.values(Products).length > 0)
              ? Object.values(Products).map(product => (
                <TableRow key={product.id}>
                  <TableCell className={classes.tablePadding}>
                    <img src={product.images.image_lg} alt={product.name} height="120px" />
                  </TableCell>
                  <TableCell className={classes.tablePadding}>
                    <h6 className={classes.productName}>
                      <a
                        href={`/${product.vendor.domainName}/product/${LinkManager.parse(product.name, product.id)}`}
                        style={{ color: primaryColor }}
                        title={product.name}
                      >
                        {`${(product.name.length > 30) ? `${product.name.slice(0, 30)}...` : product.name}`}
                      </a>
                    </h6>
                    <p>
                      Vendor:&nbsp;
                      {product.vendor.domainName}
                    </p>
                    {(product.brand) ? (
                      <p>
                      Brand:&nbsp;
                        {product.brand.name}
                      </p>)
                      : null}
                    <p>
                      Color:&nbsp;
                      {product.descriptionColor.join(", ")}
                    </p>
                  </TableCell>
                  <TableCell className={classes.tablePadding}>
                    <h5 style={{ textAlign: "center", width: "50px", margin: "auto" }}>
                      <Button
                        id={product.id}
                        simple
                        justIcon
                        round
                        color="primary"
                        onClick={() => {
                          this.cart.setQuantity(
                            product.id,
                            (this.cart.getQuantity(product.id) + 1),
                          );
                        }}
                      >
                        <Add />
                      </Button>
                      <TextField
                        id={product.id}
                        value={this.cart.getQuantity(product.id)}
                        placeholder="Quantity"
                        onChange={this.quantityChange}
                        type="number"
                        style={{ width: "35px", margin: "-4px 0px 4px 0px" }}
                        className={classes.textField}
                        inputProps={{
                          min: 1,
                          max: product.available,
                          style: { textAlign: "center" },
                        }}
                        margin="normal"
                      />
                      <br />
                      <Button
                        id={product.id}
                        simple
                        justIcon
                        round
                        color="primary"
                        onClick={() => {
                          this.cart.setQuantity(
                            product.id,
                            (this.cart.getQuantity(product.id) - 1),
                          );
                        }}
                      >
                        <Remove />
                      </Button>
                    </h5>
                  </TableCell>
                  <TableCell className={classes.tablePadding}>
                    <NumberFormat
                      value={Currency.dollarConverter(currentCurrency.code || "USD", this.products[product.id].unitPrice, "FROM_USD")}
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
                  <TableCell className={classes.tablePadding}>
                    <NumberFormat
                      value={Currency.dollarConverter(currentCurrency.code || "USD", this.products[product.id].discount, "FROM_USD")}
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
                  <TableCell className={classes.tablePadding}>
                    <NumberFormat
                      value={Currency.dollarConverter(currentCurrency.code || "USD", this.products[product.id].shipping, "FROM_USD")}
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
                  <TableCell className={classes.tablePadding}>
                    <NumberFormat
                      value={Currency.dollarConverter(currentCurrency.code || "USD", this.products[product.id].vat, "FROM_USD")}
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
                  <TableCell className={classes.tablePadding}>
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
                  <TableCell numeric className={classes.tablePadding}>
                    <Tooltip
                      id="tooltip-top"
                      title="Remove Product"
                      placement="top"
                      classes={{ tooltip: classes.tooltip }}
                    >
                      <Button
                        color="danger"
                        onClick={() => {
                          this.cart.removeProduct(product.id);
                        }}
                        justIcon
                        round
                        simple
                      >
                        <Clear />
                      </Button>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
              : <TableRow />
            }
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell numeric colSpan={2} className={classes.tablePadding}>
                <h4 className={classes.productHeadings}>
                  Tax:
                  &nbsp;
                </h4>
              </TableCell>
              <TableCell className={classes.tablePadding}>
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
              <TableCell numeric className={classes.tablePadding}>
                <h4 className={classes.productHeadings}>
                  Pay&nbsp;With:
                  &nbsp;
                </h4>
              </TableCell>
              <TableCell className={classes.tablePadding} colSpan={2}>
                <TextField
                  id="select-currency"
                  select
                  label="Select Currency"
                  className={classes.textField}
                  value={currentCurrency.code !== "USD" ? currentCurrency.code : "Select Currency..."}
                  onChange={this.setCurrency}
                  fullWidth
                  SelectProps={{
                    MenuProps: {
                      className: classes.menu,
                    },
                  }}
                  margin="normal"
                >
                  <MenuItem disabled selected value="Select Currency...">
                    Select Currency...
                  </MenuItem>
                  {this.currencies
                    ? this.currencies.map(currency => (
                      <MenuItem
                        disabled={currency.code === "USD" || currency.code === "BTC"}
                        style={(currency.code === "USD" || currency.code === "BTC") ? { color: "red" } : {}}
                        key={currency.id}
                        value={currency.code}
                      >
                        {`${currency.symbol} ${currency.name}`}
                        &nbsp;
                        {(currency.code === "USD" || currency.code === "BTC")
                          ? (
                            <i style={{ fontSize: "0.8em" }}>
                              Unusable Currency
                            </i>)
                          : ""}
                      </MenuItem>
                    ))
                    : (
                      <MenuItem disabled selected value="Select Currency...">
                        Select Currency...
                      </MenuItem>
                    )}
                </TextField>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell numeric colSpan={2} className={classes.tablePadding}>
                <h4 className={classes.productHeadings}>
                  Shipping&nbsp;Fee:
                  &nbsp;
                </h4>
              </TableCell>
              <TableCell colSpan={2} className={classes.tablePadding}>
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
                <TableCell numeric colSpan={2} className={classes.tablePadding}>
                  <h4 className={classes.productHeadings}>
                  Coupon&nbsp;Code:
                  &nbsp;
                  </h4>
                </TableCell>
                <TableCell colSpan={2} className={classes.tablePadding}>
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
            <TableRow>
              <TableCell numeric colSpan={2} className={classes.tablePadding}>
                <h3 className={classes.productHeadings}>
                  Grand&nbsp;Total:
                  &nbsp;
                </h3>
              </TableCell>
              <TableCell colSpan={2} className={classes.tablePadding}>
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
            <TableRow>
              <TableCell colSpan={2} className={classes.tablePadding}>
                <Button
                  color="primary"
                  round
                  size="sm"
                  onClick={userIs(["customer"]) ? this.handleCheckout : () => data.events.emit("usersLogin", "Customer")}
                >
                  <strong>
                    Checkout
                    &nbsp;
                    <ChevronRight />
                  </strong>
                </Button>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    );
  }
}

export default withStyles(styles)(CartTable);
