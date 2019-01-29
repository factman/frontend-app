import React from "react";
import Link from "react-router-dom/Link";
import Carousel from "react-slick";
// material-ui components
import withStyles from "@material-ui/core/styles/withStyles";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
// @material-ui/icons
import ShoppingCart from "@material-ui/icons/ShoppingCart";
import Compare from "@material-ui/icons/Compare";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import Favorite from "@material-ui/icons/Favorite";
import ShoppingBasket from "@material-ui/icons/ShoppingBasket";
import RateReview from "@material-ui/icons/RateReview";
import StarRatings from "react-star-ratings";
import isEqual from "lodash/isEqual";
import NumberFormat from "react-number-format";
import Button from "../CustomButtons/Button";
import Typo from "../../assets/jss/material-kit-react/components/typographyStyle";
import modalStyle from "../../assets/jss/material-kit-react/modalStyle";
import GridContainer from "../Grid/GridContainer";
import GridItem from "../Grid/GridItem";
import Badge from "../Badge/Badge";
import Arithmetics from "../../helpers/arithmetics";
import ProductInfo from "./ProductInfo";
import Validator from "../../helpers/validator";
import { getAverageReview, checkUserItemRating, getUserId } from "../../helpers/logic";
import defaultProductImage from "../../assets/img/default-product.jpg";
import { userIs } from "../Auth/AccessControl";
import ProductSpec from "./ProductSpec";
import Rating from "../../bezopComponents/Review/Rating";
import ZoomImage from "./ZoomImage";
import { primaryColor } from "../../assets/jss/material-kit-react";
import MinSearch from "../Search/MinSearch";
import OtherProducts from "./OtherProducts";
import CartObject, { WishlistObject } from "../../helpers/customerOperations";

const viewStyles = {
  ...modalStyle,
  slide: {
    height: "fit-content !important",
  },
  thumb: {
    position: "static !important",
    "& li": {
      width: "60px !important",
      height: "60px !important",
    },
  },
  dividingHeader: {
    backgroundColor: "white",
    textAlign: "center",
    border: "1px solid lightgray",
    width: "190px",
    margin: "auto",
  },
  divider: {
    marginBottom: "-15px",
    border: "0px",
    borderColor: "lightgray",
    borderStyle: "solid",
    borderTopWidth: "1px",
  },
};

class DetailView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: props.product,
      rating: getAverageReview(props.product.review),
      openCurrentPanel: null,
      Cart: CartObject.getCart(),
      Compared: (localStorage.getItem("compare")) ? JSON.parse(localStorage.getItem("compare")) : [],
      wishlist: WishlistObject.getWishlist(),
      review: props.product.review,
    };

    this.cart = {
      checkProduct: () => {
        const { product } = this.state;
        return CartObject.checkProduct(product.id);
      },
      addProduct: () => {
        try {
          const { product } = this.state;
          const { events } = this.props;
          CartObject.addProduct(product.id, this, events);
        } catch (ex) {
          console.log(ex.message);
        }
      },
      getQuantity: () => {
        try {
          const { product } = this.state;
          return CartObject.getQuantity(product);
        } catch (ex) {
          console.log(ex.message);
        }
        return 1;
      },
      setQuantity: (num) => {
        try {
          const { product } = this.state;
          CartObject.setQuantity(product, num, this);
        } catch (ex) {
          console.log(ex.message);
        }
      },
    };

    this.compare = {
      addCompare: () => {
        const { product } = this.state;
        const { events } = this.props;
        const compareData = (localStorage.getItem("compare")) ? JSON.parse(localStorage.getItem("compare")) : [];
        compareData.push(product.id);
        localStorage.compare = JSON.stringify(compareData);
        this.setState({ Compared: compareData });
        events.emit("add-to-compare");
      },
      checkCompare: () => {
        const { product } = this.state;
        const compareData = (localStorage.getItem("compare")) ? JSON.parse(localStorage.getItem("compare")) : [];
        return compareData.includes(product.id);
      },
      removeCompare: () => {
        const { events } = this.props;
        const { product } = this.state;
        const compareData = (localStorage.getItem("compare")) ? JSON.parse(localStorage.getItem("compare")) : [];
        compareData.splice(compareData.indexOf(product.id), 1);
        localStorage.compare = JSON.stringify(compareData);
        this.setState({ Compared: compareData });
        events.emit("add-to-compare");
      },
    };
  }

  componentWillReceiveProps(newProps) {
    this.setState({ product: newProps.product });

    const { customerReview } = this.props;
    if (Validator.propertyExist(newProps, "customerReview", "reviewItem")
      && !isEqual(newProps.customerReview.reviewItem, customerReview.reviewItem)
    ) {
      if (typeof newProps.customerReview.reviewItem === "string") {
        return false;
      }
      const { review } = this.state;
      review.push(newProps.customerReview.reviewItem);
      this.setState({
        review,
        rating: getAverageReview(review),
      });
    }
    return false;
  }

    FavToggle = () => {
      const { product } = this.state;
      this.setState({ wishlist: WishlistObject.toggle(product.id) });
    };

    CompToggle = () => {
      if (this.compare.checkCompare()) {
        this.compare.removeCompare();
      } else {
        this.compare.addCompare();
      }
    };

    GetFav = id => WishlistObject.checkWishlist(id);

    writeReview = () => {
      this.setState({
        openCurrentPanel: "rankPanel",
      });
    }

    render() {
      const { classes, product, events, dispatch, customerReview, data } = this.props;
      const { rating, openCurrentPanel, review } = this.state;

      const styles = {
        cols: {
          display: "block",
          marginBottom: "30px",
        },
        container: {
          padding: "0px 30px",
        },
        header: {
          borderBottom: "1px solid lightgray",
          paddingBottom: "0px",
        },
        bigMore: {
          float: "right", fontSize: "0.4em",
        },
        smallMore: {
          fontSize: "0.5em",
          marginTop: "0px",
        },
        productArea: {
          padding: "30px 0px",
        },
        productPrice: {
          marginTop: "0px",
        },
      };

      const settings = {
        dots: true,
        dotsClass: `slick-dots slick-thumb ${classes.thumb}`,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        arrows: false,
        className: classes.slide,
        customPaging: (i) => {
          switch (i) {
            case 0:
              return (
                !product.images.image_lg.includes("default-product-")
                  ? <img src={product.images.image_lg} width="100%" alt="product_lg" />
                  : <img src={defaultProductImage} width="100%" alt="product_lg" />
              );
            case 1:
              return (<img src={product.images.image_front} width="100%" alt="product_front" />);
            case 2:
              return (<img src={product.images.image_back} width="100%" alt="product_front" />);
            case 3:
              return (<img src={product.images.image_left} width="100%" alt="product_front" />);
            case 4:
              return (<img src={product.images.image_right} width="100%" alt="product_front" />);
            case 5:
              return (<img src={product.images.image_top} width="100%" alt="product_front" />);
            case 6:
              return (<img src={product.images.image_bottom} width="100%" alt="product_front" />);
            default:
              return (<div />);
          }
        },
      };

      const style = {
        productTitle: {
          margin: "0px",
          fontWeight: "bold",
        },
        chip: {
          margin: "0px 4px 4px 0px",
        },
        formControl: {
          minWidth: "130px",
        },
      };

      const quantity = [];
      for (let q = 1; q <= product.available; q += 1) {
        quantity.push(
          <MenuItem value={q} key={q}>
            {q}
          </MenuItem>,
        );
      }

      const cartButton = (product.available !== 0) ? (
        <Button color="primary" size="md" onClick={this.cart.addProduct} round className={classes.Cart}>
          <ShoppingCart />
          {" "}
          Add To Cart
        </Button>)
        : (
          <Button color="primary" size="md" disabled round className={classes.Cart}>
            <ShoppingCart />
            {" "}
            Out of Stock
          </Button>);
      return (
        <div>
          <GridContainer
            spacing={40}
            style={{
              borderBottom: "1px solid lightgray",
              marginBottom: "20px",
              paddingBottom: "0px",
            }}
          >
            <GridItem xs={12} sm={12} md={9} style={{ paddingBottom: "0px" }}>
              <MinSearch location="stage" />
              <Typography variant="body2" gutterBottom paragraph noWrap style={style.header}>
                <Link to={`/${data.vendor.domainName}`} style={{ color: primaryColor }}>
                  {`${data.vendor.businessName}`}
                </Link>
                &nbsp;{">"}&nbsp;
                <span style={{ color: "rgba(0,0,0,0.3)" }}>
                  {product.name}
                </span>
              </Typography>
            </GridItem>
            <GridItem xs={12} sm={12} md={3} style={{ marginTop: "-40px", marginBottom: "0px", paddingBottom: "0px" }}>
              <MinSearch location="sidebar" naked />
            </GridItem>
          </GridContainer>
          {product.images ? (
            <GridContainer justify="center" spacing={40}>
              <GridItem xs={12} md={6}>
                <Carousel {...settings}>
                  {!product.images.image_lg.includes("default-product-") ? (
                    <ZoomImage className="slick-image" src={product.images.image_lg} alt="product_lg" />)
                    : (<ZoomImage className="slick-image" src={defaultProductImage} alt="product_lg" />)
                  }
                  {!product.images.image_front.includes("default-product-") ? (
                    <ZoomImage className="slick-image" src={product.images.image_front} alt="product_front" />)
                    : null
                  }
                  {!product.images.image_back.includes("default-product-") ? (
                    <ZoomImage className="slick-image" src={product.images.image_back} alt="product_back" />)
                    : null
                  }
                  {!product.images.image_left.includes("default-product-") ? (
                    <ZoomImage className="slick-image" src={product.images.image_left} alt="product_left" />)
                    : null
                  }
                  {!product.images.image_right.includes("default-product-") ? (
                    <ZoomImage className="slick-image" src={product.images.image_right} alt="product_right" />)
                    : null
                  }
                  {!product.images.image_top.includes("default-product-") ? (
                    <ZoomImage className="slick-image" src={product.images.image_top} alt="product_top" />)
                    : null
                  }
                  {!product.images.image_bottom.includes("default-product-") ? (
                    <ZoomImage className="slick-image" src={product.images.image_bottom} alt="product_bottom" />)
                    : null
                  }
                </Carousel>
              </GridItem>
              <GridItem xs={12} md={6}>
                <h4 style={style.productTitle}>
                  {product.name}
                </h4>
                <br />
                <StarRatings
                  rating={rating}
                  starRatedColor="gold"
                  numberOfStars={5}
                  starDimension="15px"
                  starSpacing="0px"
                  name="rating"
                />
                <span>
                  &nbsp;
                  {rating.toFixed(2) === 1.00 ? "1 star " : `${rating.toFixed(2)} stars`}
                </span>
                {rating === 0
                  ? (
                    <Button
                      color="primary"
                      simple
                      size="md"
                      style={{ textTransform: "capitalize" }}
                      onClick={() => (userIs(["customer"]) ? this.writeReview() : events.emit("usersLogin", "Customer"))}
                    >
                      <RateReview />
                        Be the first to rate this product
                    </Button>)
                  : null}
                {rating > 0 && checkUserItemRating(review, getUserId("customer"), product.id) === false
                  ? (
                    <Button
                      color="primary"
                      simple
                      size="md"
                      style={{ textTransform: "capitalize" }}
                      onClick={() => (userIs(["customer"]) ? this.writeReview() : events.emit("usersLogin", "Customer"))}
                    >
                      <RateReview />
                        Write a Review
                    </Button>)
                  : null}
                <br />
                <sup style={{ display: "block", marginTop: "10px" }}>
                  {(product.analytics.featured) ? (
                    <Badge style={{ fontWeight: "bold", fontSize: "smaller" }} color="primary">
                        Featured
                    </Badge>
                  ) : null}
                  {(product.price.discount > 0 && product.price.discountType !== "fixed") ? (
                    <Badge style={{ fontWeight: "bold", fontSize: "smaller" }} color="danger">
                      {product.price.discount}
                        % OFF
                    </Badge>) : null}
                  {(product.price.discount > 0 && product.price.discountType === "fixed") ? (
                    <Badge style={{ fontWeight: "bold", fontSize: "smaller" }} color="danger">
                      {Arithmetics.getPricePercentage(
                        product.price.discount,
                        product.price.unitPrice,
                      )}
                        % OFF
                    </Badge>) : null}
                  {/* {(product.latest) ? (
                      <Badge style={{ fontWeight: "bold", fontSize: "small" }} color="primary">
                      Latest
                      </Badge>
                    ) : null} */}
                  {(product.available === 0) ? (
                    <Badge style={{ fontWeight: "bold", fontSize: "small" }} color="danger">
                        Out of Stock
                    </Badge>
                  ) : null}
                </sup>
                <br />
                <GridContainer>
                  <GridItem md={6}>
                    <h3 style={styles.productPrice}>
                      <del style={Typo.mutedText}>
                        <small>
                          <NumberFormat
                            value={product.price.slashPrice}
                            displayType="text"
                            thousandSeparator
                            prefix="$&nbsp;"
                            decimalScale={2}
                            fixedDecimalScale
                            renderText={value => (
                              <strong>
                                {value}
                              </strong>)}
                          />
                        </small>
                      </del>
                      {" "}
                      <span style={Typo.primaryText}>
                        <NumberFormat
                          value={product.price.unitPrice}
                          displayType="text"
                          thousandSeparator
                          prefix="$&nbsp;"
                          decimalScale={2}
                          fixedDecimalScale
                          renderText={value => (
                            <strong>
                              {value}
                            </strong>)}
                        />
                      </span>
                    </h3>
                    {/* <form className={classes.root} autoComplete="off">
                      <FormControl style={style.formControl}>
                        <InputLabel htmlFor="product-quantity">
                          Product Quantity
                        </InputLabel>
                        <Select
                          value={this.cart.getQuantity()}
                          onChange={this.quantityChange}
                          inputProps={{
                            name: "quantity",
                            id: "product-quantity",
                          }}
                        >
                          {quantity}
                        </Select>
                      </FormControl>
                    </form> */}
                    {(this.cart.checkProduct())
                      ? (
                        <Link to="/cart">
                          <Button size="md" color="primary" round className={classes.Cart}>
                            <ShoppingBasket />
                            Checkout
                          </Button>
                        </Link>
                      )
                      : cartButton}
                    <br />
                    <Button simple onClick={this.FavToggle} color="primary" round>
                      {(this.GetFav(product.id)) ? (
                        <span>
                          <Favorite />
                          Remove From Wishlist
                        </span>
                      ) : (
                        <span>
                          <FavoriteBorder />
                          Add To Wishlist
                        </span>
                      )}
                    </Button>
                    <Button
                      onClick={this.CompToggle}
                      color="primary"
                      round
                      simple
                    >
                      {(this.compare.checkCompare()) ? (
                        <span>
                          <Compare />
                          Remove From Compare
                        </span>)
                        : (
                          <span>
                            <span className="fas fa-exchange-alt">
                              {""}
                            </span>
                            Add To Compare
                          </span>)}
                    </Button>
                  </GridItem>
                  <GridItem md={6}>
                    <Rating review={review} />
                    { checkUserItemRating(review, getUserId("customer"), product.id) === false
                      ? (
                        <div style={{ textAlign: "center" }}>
                          <Button
                            color="primary"
                            round
                            className={classes.Cart}
                            onClick={() => (userIs(["customer"]) ? this.writeReview() : events.emit("usersLogin", "Customer"))}
                          >
                              Write Review
                          </Button>
                        </div>
                      )
                      : (
                        <p style={{ textAlign: "center" }}>
                          <strong>
                              You have already review this product
                          </strong>
                        </p>
                      )
                    }
                  </GridItem>
                </GridContainer>
                <br />
                <Typography>
                  {product.descriptionShort}
                </Typography>
                <br />
                <ProductInfo
                  product={product}
                  events={events}
                  openCurrentPanel={openCurrentPanel}
                  dispatch={dispatch}
                  customerReview={customerReview}
                  data={data}
                />
                {/* <h3>
                  Product Tags
                </h3>
                {(product.description) ? product.descriptionTag.map(tag => (
                  <Chip
                    label={tag}
                    style={style.chip}
                    component="a"
                    href=""
                    clickable
                    key={tag}
                  />
                )) : null} */}
              </GridItem>
            </GridContainer>)
            : null}
          <GridContainer spacing={40} justify="center">
            <GridItem md={12}>
              <br />
              <hr className={classes.divider} />
              <h4 className={classes.dividingHeader}>
                Other Products
              </h4>
              <OtherProducts products={data.otherProducts} id={product.id} />
            </GridItem>
          </GridContainer>
          <GridContainer spacing={40} justify="center">
            <GridItem md={6}>
              <ProductSpec product={product} />
            </GridItem>
          </GridContainer>
        </div>
      );
    }
}

export default withStyles(viewStyles)(DetailView);
