import React from "react";
import Link from "react-router-dom/Link";
// material-ui components
import withStyles from "@material-ui/core/styles/withStyles";
import Tooltip from "@material-ui/core/Tooltip";
import ShoppingCart from "@material-ui/icons/ShoppingCart";
import Visibility from "@material-ui/icons/Visibility";
import Favorite from "@material-ui/icons/Favorite";
import ShoppingBasket from "@material-ui/icons/ShoppingBasket";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import Compare from "@material-ui/icons/Compare";
import PropTypes from "prop-types";
import NumberFormat from "react-number-format";
// core components
import Card from "../Card/Card";
import CardBody from "../Card/CardBody";
import Button from "../CustomButtons/Button";
import Typo from "../../assets/jss/material-kit-react/components/typographyStyle";
import tooltipsStyle from "../../assets/jss/material-kit-react/tooltipsStyle";
import imagesStyles from "../../assets/jss/material-kit-react/imagesStyles";
import QuickView from "./QuickView";
import soldOut from "../../assets/img/SoldOut.png";
import discount from "../../assets/img/Discount.png";
import newProduct from "../../assets/img/NewProduct.png";
import featuredProduct from "../../assets/img/FeaturedProduct.png";
import Arithmetics from "../../helpers/arithmetics";
import LinkManager from "../../helpers/linkManager";
import defaultProductImage from "../../assets/img/default-product.jpg";
import CartObject, { WishlistObject } from "../../helpers/customerOperations";

const styles = theme => ({
  tooltips: tooltipsStyle.tooltip,
  ...imagesStyles,
  productPix: {
    width: "100%",
  },
  latestSticker: {
    width: "30%",
    position: "absolute",
    right: "0px",
    top: "0px",
  },
  featuredSticker: {
    width: "30%",
    position: "absolute",
    left: "0px",
    top: "0px",
  },
  OutOfStock: {
    width: "100%",
    height: "100%",
    position: "absolute",
    backgroundImage: `url("${soldOut}")`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "50% 50%",
    opacity: "0.6",
    left: "0px",
    top: "0px",
  },
  discountSticker: {
    width: "45px",
    height: "45px",
    position: "absolute",
    left: "0px",
    bottom: "0px",
    color: "#fff",
    backgroundImage: `url("${discount}")`,
    borderRadius: "45px",
    textAlign: "center",
    fontWeight: "bold",
    margin: "0px",
    lineHeight: "14px",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    paddingTop: "13px",
    fontSize: "medium",
  },
  productHead: {
    padding: "0px",
    margin: "-30px auto 0px auto",
    overflow: "hidden",
    borderRadius: "5%",
  },
  productCon: {
    padding: "0px 15px",
    backgroundColor: "#fefefe",
    transition: "box-shadow 0.4s",
    "&:hover": {
      boxShadow: "0px 0px 10px 3px rgba(125, 125, 125,0.5)",
    },
  },
  productBody: {
    padding: "10px 0px 15px 0px",
  },
  productTitle: {
    color: "#444444",
    textAlign: "center",
    display: "block",
    fontWeight: "bold",
    "&:hover": Typo.primaryText,
  },
  productVendor: {
    textAlign: "center",
    fontWeight: "400",
    marginBottom: "0px",
    fontSize: "small",
  },
  Cart: {
    fontWeight: "bold",
    fontSize: "1.3em",
  },
  productPrice: {
    fontSize: "1em",
    textAlign: "center",
  },
});

class ProductBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Product: props.product,
      QuickViewModal: false,
      Cart: CartObject.getCart(),
      Compare: (localStorage.getItem("compare")) ? JSON.parse(localStorage.getItem("compare")) : [],
      wishlist: WishlistObject.getWishlist(),
    };

    this.compare = {
      addCompare: () => {
        try {
          const { state } = this;
          const { events } = this.props;
          const compareData = (localStorage.getItem("compare")) ? JSON.parse(localStorage.getItem("compare")) : [];
          compareData.push(state.Product.id);
          localStorage.compare = JSON.stringify(compareData);
          this.setState({ Compare: compareData });
          events.emit("add-to-compare");
        } catch (ex) {
          console.log(ex.message);
        }
      },
      checkCompare: () => {
        const { state } = this;
        return state.Compare.includes(state.Product.id);
      },
      removeCompare: () => {
        try {
          const { state } = this;
          const { events } = this.props;
          const compareData = (localStorage.getItem("compare")) ? JSON.parse(localStorage.getItem("compare")) : [];
          compareData.splice(compareData.indexOf(state.Product.id), 1);
          localStorage.compare = JSON.stringify(compareData);
          this.setState({ Compare: compareData });
          events.emit("add-to-compare");
        } catch (ex) {
          console.log(ex.message);
        }
      },
    };

    this.cart = {
      checkProduct: () => {
        const { state } = this;
        return CartObject.checkProduct(state.Product.id);
      },
      addProduct: () => {
        try {
          const { state } = this;
          const { events } = this.props;
          CartObject.addProduct(state.Product.id, this, events);
        } catch (ex) {
          console.log(ex.message);
        }
      },
      getQuantity: () => {
        try {
          const { state } = this;
          return CartObject.getQuantity(state.Product);
        } catch (ex) {
          console.log(ex.message);
        }
        return 1;
      },
      setQuantity: (num) => {
        try {
          const { state } = this;
          CartObject.setQuantity(state.Product, num, this);
        } catch (ex) {
          console.log(ex.message);
        }
      },
    };
  }

  componentWillReceiveProps(newProps) {
    this.setState({ Product: newProps.product });
  }

  FavToggle = () => {
    const { Product } = this.state;
    this.setState({ wishlist: WishlistObject.toggle(Product.id) });
  };

  GetFav = id => WishlistObject.checkWishlist(id);

  CompToggle = () => {
    if (this.compare.checkCompare()) {
      this.compare.removeCompare();
    } else {
      this.compare.addCompare();
    }
  };

  QuickViewToggle = () => {
    const { QuickViewModal } = this.state;
    if (QuickViewModal) {
      this.setState({ QuickViewModal: false });
    } else {
      this.setState({ QuickViewModal: true });
    }
  };

  render() {
    const { classes, data, events, shop } = this.props;
    const { Product, QuickViewModal } = this.state;
    const Fav = {};
    const Comp = {};
    let LatestSticker;
    let FeaturedSticker;
    let DiscountSticker;
    let OutOfStock;

    if (this.GetFav(Product.id)) {
      Fav.icon = <Favorite />;
      Fav.tooltip = "Remove From Wishlist";
    } else {
      Fav.icon = <FavoriteBorder />;
      Fav.tooltip = "Add To Wishlist";
    }

    if (this.compare.checkCompare()) {
      Comp.icon = <Compare />;
      Comp.tooltip = "Remove From Compare List";
    } else {
      Comp.icon = (
        <span className="fas fa-exchange-alt">
          {" "}
        </span>);
      Comp.tooltip = "Add To Compare List";
    }

    if (Product.latest) {
      LatestSticker = <img src={newProduct} alt="New Product" className={classes.latestSticker} />;
    } else {
      LatestSticker = null;
    }

    if (Product.analytics.feature) {
      FeaturedSticker = <img src={featuredProduct} alt="Featured Product" className={classes.featuredSticker} />;
    } else {
      FeaturedSticker = null;
    }

    if (Product.available === 0) {
      OutOfStock = (
        <div className={classes.OutOfStock}>
          {" "}
        </div>);
    } else {
      OutOfStock = null;
    }

    if (Product.price.discount > 0) {
      if (Product.price.discountType !== "fixed") {
        DiscountSticker = (
          <h5 className={classes.discountSticker}>
            {`-${Product.price.discount}%`}
          </h5>);
      } else {
        DiscountSticker = (
          <h5 className={classes.discountSticker}>
            {`-${Arithmetics.getPricePercentage(Product.price.discount, Product.price.unitPrice)}%`}
          </h5>);
      }
    } else {
      DiscountSticker = null;
    }
    return (
      <div>
        <QuickView
          param={QuickViewModal}
          cart={this.cart}
          compare={this.compare}
          fav={{ FavToggle: this.FavToggle, GetFav: this.GetFav }}
          compToggle={this.CompToggle}
          event={this.QuickViewToggle}
          data={data}
          events={events}
          product={Product}
          shop={shop}
        />
        <Card className={classes.productCon}>
          <Card className={classes.productHead}>
            <img src={Product.images.image_lg.includes("https://") ? Product.images.image_lg : defaultProductImage} alt={Product.name} className={classes.productPix} />
            <div className={classes.imgCardOverlay}>
              {LatestSticker}
              {FeaturedSticker}
              {DiscountSticker}
              {OutOfStock}
            </div>
          </Card>
          <CardBody className={classes.productBody}>
            <h6>
              <Link to={`/${Product.vendor.domainName}/product/${LinkManager.parse(Product.name, Product.id)}`} className={classes.productTitle}>
                {`${(Product.name.length > 60) ? `${Product.name.slice(0, 60)}...` : Product.name}`}
              </Link>
            </h6>

            {/* {(Product.brand) ? (
              <p className={classes.productVendor}>
                <Link to={`/${Product.vendor.domainName}/brand/${LinkManager.parse(Product.brand.name, Product.brand.id)}`} style={Typo.primaryText}>
                  {Product.brand.name}
                </a>
              </p>)
              : null} */}

            <div style={{ margin: "0px auto", display: "block", textAlign: "center" }}>
              <Tooltip
                title="Quick View"
                placement="top"
                classes={{ tooltip: classes.tooltips }}
              >
                <Button round onClick={this.QuickViewToggle} justIcon simple color="primary" style={{ padding: "0px", margin: "0px auto" }}>
                  <Visibility />
                </Button>
              </Tooltip>

              <Tooltip
                title={Comp.tooltip}
                placement="top"
                classes={{ tooltip: classes.tooltips }}
              >
                <Button round justIcon simple onClick={this.CompToggle} color="primary" style={{ padding: "0px", margin: "0px auto" }}>
                  {Comp.icon}
                </Button>
              </Tooltip>

              <Tooltip
                title={Fav.tooltip}
                placement="top"
                classes={{ tooltip: classes.tooltips }}
              >
                <Button round justIcon simple onClick={this.FavToggle} color="primary" style={{ padding: "0px", margin: "0px auto" }}>
                  {Fav.icon}
                </Button>
              </Tooltip>
            </div>

            {/* <p style={{ textAlign: "center" }}>
              {Product.descriptionShort}
            </p> */}
            <p className={classes.productPrice}>
              <del style={Typo.mutedText}>
                <small>
                  <NumberFormat
                    value={Product.price.slashPrice}
                    displayType="text"
                    thousandSeparator
                    prefix="$"
                    decimalScale={2}
                    fixedDecimalScale
                    renderText={value => (
                      <strong>
                        {value}
                      </strong>)}
                  />
                </small>
              </del>
              &nbsp;&nbsp;
              <span style={Typo.primaryText}>
                <NumberFormat
                  value={Product.price.unitPrice}
                  displayType="text"
                  thousandSeparator
                  prefix="$"
                  decimalScale={2}
                  fixedDecimalScale
                  renderText={value => (
                    <strong>
                      {value}
                    </strong>)}
                />
              </span>
            </p>

            {(this.cart.checkProduct())
              ? (
                <Link to="/cart">
                  <Button color="primary" fullWidth round className={classes.Cart}>
                    <ShoppingBasket />
                    Checkout
                  </Button>
                </Link>)
              : (
                <Button
                  color="primary"
                  onClick={this.cart.addProduct}
                  fullWidth
                  round
                  className={classes.Cart}
                  disabled={(Product.available === 0)}
                >
                  <ShoppingCart />
                  {(Product.available === 0) ? "Out of Stock" : "Add To Cart"}
                </Button>)
            }
          </CardBody>
        </Card>
      </div>
    );
  }
}

ProductBox.prototypes = {
  classes: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductBox);
