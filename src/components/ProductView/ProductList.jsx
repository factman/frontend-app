import React from "react";
import Link from "react-router-dom/Link";
// material-ui components
import withStyles from "@material-ui/core/styles/withStyles";
import ShoppingBasket from "@material-ui/icons/ShoppingBasket";
import ShoppingCart from "@material-ui/icons/ShoppingCart";
import Visibility from "@material-ui/icons/Visibility";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Compare from "@material-ui/icons/Compare";
import PropTypes from "prop-types";
import NumberFormat from "react-number-format";
import StarRatings from "react-star-ratings";
// core components
import Button from "../CustomButtons/Button";
import Typo from "../../assets/jss/material-kit-react/components/typographyStyle";
import tooltipsStyle from "../../assets/jss/material-kit-react/tooltipsStyle";
import imagesStyles from "../../assets/jss/material-kit-react/imagesStyles";
import QuickView from "./QuickView";
import soldOut from "../../assets/img/SoldOut.png";
import discount from "../../assets/img/Discount.png";
import CartObject, { WishlistObject } from "../../helpers/customerOperations";
import GridContainer from "../Grid/GridContainer";
import defaultProductImage from "../../assets/img/default-product.jpg";
import GridItem from "../Grid/GridItem";
import { warningColor } from "../../assets/jss/material-kit-react";
import LinkManager from "../../helpers/linkManager";
import { getAverageReview } from "../../helpers/logic";

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

class ProductList extends React.Component {
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

    const rating = getAverageReview(Product.review);

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
        <Paper elevation={3} className={classes.marginSpacer} key={Product.id} style={{ marginBottom: "60px", overflow: "hidden", padding: "20px 0px" }}>
          <GridContainer spacing={40}>
            <GridItem xs={12} sm={3} style={{ height: "150px", overflow: "hidden" }}>
              <img
                src={Product.images.image_lg.includes("https://") ? Product.images.image_lg : defaultProductImage}
                alt={Product.name}
                style={{ height: "100%", display: "block", margin: "auto", cursor: "pointer" }}
              />
            </GridItem>
            <GridItem
              style={{ overflow: "hidden" }}
              xs={12}
              sm={6}
            >
              <GridContainer>
                <GridItem xs={12}>
                  <Link to={`/${Product.vendor.domainName}/product/${LinkManager.parse(Product.name, Product.id)}`}>
                    <Typography
                      style={{ fontWeight: "bold" }}
                      variant="subheading"
                      classes={{
                        colorPrimary: classes.colorPrimaryCustom,
                      }}
                    >
                      {Product.name}
                    </Typography>
                  </Link>
                  <Typography gutterBottom>
                    {`${(Product.descriptionShort.length > 120) ? `${Product.descriptionShort.slice(0, 120)}...` : Product.descriptionShort}`}
                  </Typography>
                </GridItem>
                <hr style={{ width: "95%" }} />
                <GridItem xs={12}>
                  <GridContainer>
                    <GridItem sm={6}>
                      <Typography variant="subheading">
                        <NumberFormat
                          value={Product.price.unitPrice}
                          displayType="text"
                          thousandSeparator
                          prefix="$"
                          decimalScale={2}
                          fixedDecimalScale
                          renderText={value => (
                            <strong style={{ color: warningColor }}>
                              {value}
                            </strong>)}
                        />
                        &nbsp;&nbsp;
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
                      </Typography>
                    </GridItem>
                    <GridItem sm={6}>
                      <div style={{ padding: "7px 0px", float: "right" }}>
                        <span>
                          &nbsp;
                          {rating.toFixed(2) === 1.00 ? "1 star " : `${rating.toFixed(2)} stars`}
                        </span>
                        <StarRatings
                          rating={rating}
                          starRatedColor="gold"
                          numberOfStars={5}
                          starDimension="15px"
                          starSpacing="0px"
                          name="rating"
                        />
                      </div>
                    </GridItem>
                  </GridContainer>
                </GridItem>
              </GridContainer>
            </GridItem>
            <GridItem xs={12} sm={3}>
              {(this.cart.checkProduct())
                ? (
                  <Link to="/cart">
                    <Button size="sm" color="primary" round className={classes.Cart}>
                      <ShoppingBasket />
                      Checkout
                    </Button>
                  </Link>)
                : (
                  <Button
                    size="sm"
                    color="primary"
                    onClick={this.cart.addProduct}
                    round
                    disabled={(Product.available === 0)}
                  >
                    <ShoppingCart />
                    {(Product.available === 0) ? "Out of Stock" : "Add To Cart"}
                  </Button>)
              }
              <Button  size="sm" round onClick={this.QuickViewToggle} color="primary">
                <Visibility />
                View
              </Button>
              <br />
              <Button size="sm" round onClick={this.CompToggle} color="primary">
                {Comp.icon}
                Compare
              </Button>
              <Button size="sm" round onClick={this.FavToggle} color="primary">
                {Fav.icon}
                Favorite
              </Button>
            </GridItem>
          </GridContainer>
        </Paper>
      </div>
    );
  }
}

ProductList.prototypes = {
  classes: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductList);
