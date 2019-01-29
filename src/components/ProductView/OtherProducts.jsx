import React from "react";
import Link from "react-router-dom/Link";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import Carousel from "react-slick";
import StarRatings from "react-star-ratings";
import NumberFormat from "react-number-format";
import GridContainer from "../Grid/GridContainer";
import GridItem from "../Grid/GridItem";
import defaultProductImage from "../../assets/img/default-product.jpg";
import Badge from "../Badge/Badge";
import Arithmetics from "../../helpers/arithmetics";
import { primaryColor } from "../../assets/jss/material-kit-react";
import { getAverageReview } from "../../helpers/logic";
import LinkManager from "../../helpers/linkManager";

const styles = {
  carousel: {
    padding: "10px",
    height: "fit-content",
    overflow: "Hidden",
  },
  productContainer: {
    padding: "10px",
  },
  productImage: {
    width: "100%",
    height: "auto",
    borderRadius: "5px",
    marginBottom: "10px",
    border: "1px solid rgba(0,0,0,0.05)",
  },
  badge: {
    marginTop: "-35px",
    position: "relative",
    borderRadius: "5px",
    padding: "5px",
    fontWeight: "bold",
    fontSize: "smaller",
    float: "right",
  },
};

class OtherProducts extends React.Component {
  state={};

  render() {
    const { classes, products, id } = this.props;
    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 6,
      slidesToScroll: 1,
      initialSlide: 0,
      vertical: false,
      rows: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
            rows: 1,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            rows: 1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            rows: 1,
          },
        },
      ],
    };

    if (products.length === 0) return (<div />);

    const boxProducts = products.slice(0, 30);
    boxProducts.sort((a, b) => 0.5 - Math.random());

    const content = (
      <Carousel {...settings} className={classes.carousel}>
        {boxProducts.map((product) => {
          if (product.id !== id) {
            return (
              <Link to={`/${product.vendor.domainName}/product/${LinkManager.parse(product.name, product.id)}`} className={`${classes.productContainer}`} key={product.id}>
                <img
                  src={
                    !product.images.image_lg.includes("default-product-")
                      ? product.images.image_lg
                      : defaultProductImage
                  }
                  alt={product.id}
                  className={classes.productImage}
                />
                {(product.price.discount > 0 && product.price.discountType !== "fixed") ? (
                  <Badge style={styles.badge} color="danger">
                    -
                    {product.price.discount}
                    %
                  </Badge>) : null}
                {(product.price.discount > 0 && product.price.discountType === "fixed") ? (
                  <Badge style={styles.badge} color="danger">
                    -
                    {Arithmetics.getPricePercentage(
                      product.price.discount,
                      product.price.unitPrice,
                    )}
                    %
                  </Badge>) : null}
                <Typography noWrap variant="body2">
                  {product.name}
                </Typography>
                <Typography noWrap variant="body2" align="center">
                  <h5 style={{ fontSize: "small", margin: "0px" }}>
                    <span style={{ color: primaryColor }}>
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
                  </h5>
                </Typography>
                <StarRatings
                  rating={getAverageReview(product.review)}
                  starRatedColor="gold"
                  numberOfStars={5}
                  starDimension="15px"
                  starSpacing="0px"
                  name="rating"
                />
                <small>
                  &nbsp;
                  {getAverageReview(product.review).toFixed(2) === 1.00 ? "1 star " : `${getAverageReview(product.review).toFixed(2)} stars`}
                </small>
              </Link>
            );
          }
          return 0;
        })}
      </Carousel>
    );

    return (
      <GridContainer spacing={40} justify="center">
        <GridItem lg={12}>
          {content}
        </GridItem>
      </GridContainer>
    );
  }
}

export default withStyles(styles)(OtherProducts);
