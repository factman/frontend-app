import React from "react";
import NumberFormat from "react-number-format";
import Link from "react-router-dom/Link";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Visibility from "@material-ui/icons/Visibility";
import ShoppingCart from "@material-ui/icons/ShoppingCart";
import StarRatings from "react-star-ratings";
import GridContainer from "../../../../components/Grid/GridContainer";
import Button from "../../../../components/CustomButtons/Button";
import GridItem from "../../../../components/Grid/GridItem";
import Validator from "../../../../helpers/validator";
import { warningColor, primaryBackground } from "../../../../assets/jss/material-kit-react";

class SearchDataStructure extends React.Component {
  viewItemDetails = (item) => {
    const { viewItemDetails } = this.props;
    viewItemDetails(item);
  };

  render() {
    const { displayItems, classes, rowsPerPage, page } = this.props;
    const websiteOrigin = window.location.origin;
    return displayItems
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .map(item => (
        <Paper elevation={1} className={classes.marginSpacer} key={item.id} style={{ marginBottom: "30px" }}>
          <GridContainer spacing={40}>
            {
              Validator.propertyExist(item, "image")
                ? (
                  <GridItem xs={12} sm={3} style={{ height: "150px", overflow: "hidden" }}>
                    <img
                      src={item.image}
                      alt={item.title}
                      style={{ height: "100%", display: "block", margin: "auto", cursor: "pointer" }}
                    />
                  </GridItem>
                ) : null
            }
            <GridItem
              style={{ overflow: "hidden" }}
              xs={12}
              sm={Validator.propertyExist(item, "image") ? 5 : 8}
            >
              <Link to={item.link}>
                <Typography
                  style={{ fontWeight: "bold" }}
                  variant="subheading"
                  classes={{
                    colorPrimary: classes.colorPrimaryCustom,
                  }}
                >
                  {item.title}
                </Typography>
              </Link>
              <Typography
                color="secondary"
                classes={{
                  colorSecondary: classes.colorSecondaryCustom,
                }}
                gutterBottom
                noWrap
              >
                {`${websiteOrigin}${item.link}`}
              </Typography>
              <Typography gutterBottom noWrap>
                {item.description}
              </Typography>
              {
                  Validator.propertyExist(item, "price") && Validator.propertyExist(item, "rating")
                    ? (
                      <GridContainer>
                        <hr />
                        <GridItem sm={6}>
                          <Typography variant="subheading" style={{ color: warningColor }}>
                            <NumberFormat
                              value={item.price.unitPrice}
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
                          </Typography>
                        </GridItem>
                        <GridItem sm={6}>
                          <div style={{ padding: "7px 0px", float: "right" }}>
                            <span>
                              &nbsp;
                              {item.rating.toFixed(2) === 1.00 ? "1 star " : `${item.rating.toFixed(2)} stars`}
                            </span>
                            <StarRatings
                              rating={item.rating}
                              starRatedColor="gold"
                              numberOfStars={5}
                              starDimension="15px"
                              starSpacing="0px"
                              name="rating"
                            />
                          </div>
                        </GridItem>
                      </GridContainer>
                    ) : null
                }

            </GridItem>
            <GridItem xs={12} sm={4}>
              <GridContainer>
                <GridItem xs={6}>
                  {Validator.propertyExist(item, "price")
                    ? (
                      <Link to={item.link}>
                        <Button color="primary" fullWidth round className={classes.Cart}>
                          <ShoppingCart />
                          &nbsp;Buy
                        </Button>
                      </Link>)
                    : null }
                  <Button
                    onClick={() => this.viewItemDetails(item)}
                    round
                    fullWidth
                    style={{
                      color: "#fff",
                    }}
                  >
                    {/* {`View ${item.type}`} */}
                    <Visibility />
                    &nbsp;
                    View
                  </Button>
                </GridItem>
                <GridItem xs={6}>
                  <Avatar style={{ ...primaryBackground, margin: "auto", marginBottom: "10px", fontSize: "3em", padding: "30px" }}>V</Avatar>
                  <Typography noWrap variant="subheading" align="center">Vendor</Typography>
                </GridItem>
              </GridContainer>
            </GridItem>
            {/*
            {
              Validator.propertyExist(item, "link")
                ? (
                  <GridItem
                    sm={Validator.propertyExist(item, "rating") ? 6 : 12}
                    className={classes.buttonWrapperAlign}
                  >
                  </GridItem>
                ) : null
            } */}
          </GridContainer>
        </Paper>
      ));
  }
}

export default SearchDataStructure;
