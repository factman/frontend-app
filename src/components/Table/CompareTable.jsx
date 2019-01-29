import React from "react";
import Link from "react-router-dom/Link";
import NumberFormat from "react-number-format";
import withStyles from "@material-ui/core/styles/withStyles";
import Hidden from "@material-ui/core/Hidden";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Table from "@material-ui/core/Table";
import Tooltip from "@material-ui/core/Tooltip";
import ShoppingCart from "@material-ui/icons/ShoppingCart";
import Clear from "@material-ui/icons/Clear";
import Refresh from "@material-ui/icons/Refresh";
import Compare from "@material-ui/icons/Compare";
import { primaryColor } from "../../assets/jss/material-kit-react";
import Button from "../CustomButtons/Button";
import tooltipsStyle from "../../assets/jss/material-kit-react/tooltipsStyle";
import LinkManager from "../../helpers/linkManager";
import Arithmetics from "../../helpers/arithmetics";
import defaultProductImage from "../../assets/img/default-product.jpg";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto",
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

class CompareTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Compare: (localStorage.compare) ? JSON.parse(localStorage.compare) : [],
      Products: (props.products) ? props.products : {},
    };

    this.compare = {
      removeCompare: (id) => {
        try {
          const { state } = this;
          const compareData = (localStorage.compare) ? JSON.parse(localStorage.compare) : [];
          compareData.splice(compareData.indexOf(id), 1);
          localStorage.compare = JSON.stringify(compareData);
          const products = state.Products;
          delete products[id];
          this.setState({ Compare: compareData, Products: products });
          props.events.emit("add-to-compare");
        } catch (ex) {
          console.log(ex.message);
        }
      },
      emptyCompare: () => {
        try {
          const compareData = JSON.stringify([]);
          localStorage.compare = compareData;
          this.setState({ Compare: compareData, Products: {} });
          props.events.emit("add-to-compare");
        } catch (ex) {
          console.log(ex.message);
        }
      },
    };
  }

  componentWillReceiveProps(newProps) {
    this.setState({ Products: newProps.products });
  }

  render() {
    const { classes } = this.props;
    const { Products } = this.state;
    console.log(Products);
    return (
      <div className={classes.root}>
        <Hidden smDown>
          <h2 className={classes.header}>
            <Compare className={classes.cartIcon} />
            {" "}
            Compare Products
            <Button
              color="primary"
              size="sm"
              round
              className={classes.bigMore}
              onClick={() => {
                this.compare.emptyCompare();
              }}
            >
              <Refresh />
              &nbsp;Restore Products
            </Button>
          </h2>
        </Hidden>
        <Hidden mdUp>
          <h3 className={classes.header}>
            <ShoppingCart className={classes.cartIcon} />
            &nbsp;Compare Products
          </h3>
        </Hidden>
        <Table className={classes.table}>
          <TableHead>
            <TableRow className={classes.tableHeader}>
              <TableCell />
              <TableCell>
                Product
              </TableCell>
              <TableCell>
                Price
              </TableCell>
              <TableCell>
                Discount
              </TableCell>
              <TableCell>
                Description
              </TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {(Object.values(Products).length > 0)
              ? Object.values(Products).map(product => (
                <TableRow key={product.id}>
                  <TableCell className={classes.tablePadding}>
                    <img
                      src={
                        !product.images.image_lg.includes("default-product-")
                          ? product.images.image_lg
                          : defaultProductImage
                      }
                      alt={product.name}
                      height="120px"
                    />
                  </TableCell>
                  <TableCell className={classes.tablePadding}>
                    <h4 className={classes.productName}>
                      <Link to={`/${product.vendor.domainName}/product/${LinkManager.parse(product.name, product.id)}`} style={{ color: primaryColor }}>
                        {product.name}
                      </Link>
                    </h4>
                    <big>
                      Vendor:&nbsp;
                      {product.vendor.businessName}
                    </big>
                    <br />
                    {(product.brand) ? (
                      <big>
                      Brand:&nbsp;
                        {product.brand.name}
                      </big>)
                      : null}
                    <br />
                    <big>
                      Color:&nbsp;
                      {product.descriptionColor.join(", ")}
                    </big>
                  </TableCell>
                  <TableCell className={classes.tablePadding}>
                    <NumberFormat
                      value={product.price.unitPrice}
                      displayType="text"
                      thousandSeparator
                      prefix="$ "
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
                      value={product.price.discountType === "fixed" ? product.price.discount : Arithmetics.getPercentagePrice(product.price.discount, product.price.unitPrice)}
                      displayType="text"
                      thousandSeparator
                      prefix="$ "
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
                    <h5>
                      {product.descriptionShort}
                    </h5>
                  </TableCell>
                  <TableCell className={classes.tablePadding}>
                    <Tooltip
                      id="tooltip-top"
                      title="Remove Product"
                      placement="top"
                      classes={{ tooltip: classes.tooltip }}
                    >
                      <Button
                        color="danger"
                        onClick={() => {
                          this.compare.removeCompare(product.id);
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
        </Table>
      </div>
    );
  }
}

export default withStyles(styles)(CompareTable);
