import React from "react";
import Link from "react-router-dom/Link";
import Carousel from "react-slick";
// material-ui components
import withStyles from "@material-ui/core/styles/withStyles";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";
// @material-ui/icons
import Close from "@material-ui/icons/Close";
import ShoppingCart from "@material-ui/icons/ShoppingCart";
import Pageview from "@material-ui/icons/Pageview";
import Compare from "@material-ui/icons/Compare";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import Favorite from "@material-ui/icons/Favorite";
import ShoppingBasket from "@material-ui/icons/ShoppingBasket";
import RateReview from "@material-ui/icons/RateReview";
import NumberFormat from "react-number-format";
import StarRatings from "react-star-ratings";
import Button from "../CustomButtons/Button";
import Typo from "../../assets/jss/material-kit-react/components/typographyStyle";
import modalStyle from "../../assets/jss/material-kit-react/modalStyle";
import GridContainer from "../Grid/GridContainer";
import GridItem from "../Grid/GridItem";
import ProductInfo from "./ProductInfo";
import Badge from "../Badge/Badge";
import Arithmetics from "../../helpers/arithmetics";
import LinkManager from "../../helpers/linkManager";
import defaultProductImage from "../../assets/img/default-product.jpg";
import { getAverageReview, checkUserItemRating, getUserId } from "../../helpers/logic";
import { userIs } from "../Auth/AccessControl";
import Rating from "../../bezopComponents/Review/Rating";
import ZoomImage from "./ZoomImage";

function Transition(props) {
  return <Slide direction="down" {...props} />;
}

class QuickView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.quantityChange = this.quantityChange.bind(this);
  }

  quantityChange = (event) => {
    const { cart } = this.props;
    cart.setQuantity(event.target.value);
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const {
      classes,
      param,
      event,
      fav,
      product,
      cart,
      compare,
      compToggle,
      data,
    } = this.props;

    const rating = getAverageReview(product.review);
    const { review } = product;

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
      <Button color="primary" onClick={cart.addProduct} round>
        <ShoppingCart />
        Add To Cart
      </Button>)
      : (
        <Button color="primary" disabled round>
          <ShoppingCart />
          Out of Stock
        </Button>);

    return (
      <div>
        <Dialog
          classes={{
            root: classes.center,
            paper: classes.modal,
          }}
          open={param}
          TransitionComponent={Transition}
          keepMounted
          onClose={event}
          aria-labelledby="modal-slide-title"
          aria-describedby="modal-slide-description"
        >

          <DialogTitle id="classic-modal-slide-title" disableTypography className={classes.modalHeader}>
            <IconButton className={classes.modalCloseButton} key="close" aria-label="Close" color="inherit" onClick={event}>
              <Close className={classes.modalClose} />
            </IconButton>
            <h3 className={classes.modalTitle}>
              Quick View
            </h3>
          </DialogTitle>

          <DialogContent id="modal-slide-description" className={classes.modalBody}>
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
                      onClick={() => (userIs(["customer"]) ? this.writeReview() : event.emit("usersLogin", "Customer"))}
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
                      onClick={() => (userIs(["customer"]) ? this.writeReview() : event.emit("usersLogin", "Customer"))}
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
                  {(product.available === 0) ? (
                    <Badge style={{ fontWeight: "bold", fontSize: "small" }} color="danger">
                        Out of Stock
                    </Badge>
                  ) : null}
                </sup>
                <br />
                <GridContainer>
                  <GridItem md={6}>
                    <h3 style={{ marginTop: "0px" }}>
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
                    {(cart.checkProduct())
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
                    <Button simple onClick={fav.FavToggle} color="primary" round>
                      {(fav.GetFav(product.id)) ? (
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
                      onClick={compToggle}
                      color="primary"
                      round
                      simple
                    >
                      {(compare.checkCompare()) ? (
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
                            onClick={() => (userIs(["customer"]) ? this.writeReview() : event.emit("usersLogin", "Customer"))}
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
                  data={data}
                />
              </GridItem>
            </GridContainer>
          </DialogContent>
          <DialogActions className={classes.modalFooter}>
            <Link to={`/${product.vendor.domainName}/product/${LinkManager.parse(product.name, product.id)}`}>
              <Button onClick={event} round>
                <Pageview />
                View Details
              </Button>
            </Link>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(modalStyle)(QuickView);
