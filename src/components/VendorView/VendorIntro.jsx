import React from "react";
// import Link from "react-router-dom/Link";
import StarRatings from "react-star-ratings";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import Paper from "@material-ui/core/Paper";
// import Stars from "@material-ui/icons/Stars";
// import Home from "@material-ui/icons/Home";
// import Call from "@material-ui/icons/Call";
// import Email from "@material-ui/icons/Email";
// import Warning from "@material-ui/icons/Warning";
// // import StarRatings from "react-star-ratings";
import typographyStyle from "../../assets/jss/material-kit-react/components/typographyStyle";
import GridContainer from "../Grid/GridContainer";
import GridItem from "../Grid/GridItem";
import { getAverageReview } from "../../helpers/logic";
// import Rating from "../../bezopComponents/Review/Rating";
// import Button from "../CustomButtons/Button";
// import SnackbarContent from "../Snackbar/SnackbarContent";
import { primaryColor, boxShadow, warningColor } from "../../assets/jss/material-kit-react";
import Ad1 from "../../assets/img/ads/1.jpg";
import Ad2 from "../../assets/img/ads/2.jpg";
import Ad3 from "../../assets/img/ads/3.jpg";
import Ad4 from "../../assets/img/ads/4.jpg";

const styles = {
  ...typographyStyle,
  container: {
    backgroundColor: "transparent",
    margin: "-57px 30px 30px",
    flexGrow: 1,
    position: "relative",
    zIndex: 1,
  },
  card: {
    borderRadius: "5px",
    padding: "10px 20px",
    height: "300px",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  },
  videoCard: {
    borderRadius: "5px",
    padding: "0px",
    height: "300px",
    overflow: "hidden",
  },
  star: {
    color: "#ffe358",
    fontSize: "8em",
    textAlign: "center",
    display: "block",
    margin: "0px auto",
    position: "absolute",
    top: "15px",
    left: "20px",
  },
  rating: {
    top: "47px",
    position: "absolute",
    fontSize: "xx-large",
    textAlign: "center",
    left: "74px",
  },
  modal_iframe: {
    width: "100%",
    height: "100%",
    border: "0",
  },
  text: {
    fontSize: "medium",
    lineHeight: "40px",
  },
  name_card: {
    backgroundColor: "white",
    display: "inline-block",
    padding: "10px 30px",
    borderRadius: "15px 15px 0% 0%",
    fontSize: "2em",
    color: primaryColor,
    fontWeight: "bold",
  },
  sub_heading: {
    padding: "10px 0px 10px",
    fontSize: "1.3em",
    color: primaryColor,
  },
  rating_text: {
    color: primaryColor,
    padding: "15px 0px 5px",
    fontSize: "medium",
    display: "block",
  },
  vendor_logo: {
    backgroundColor: "white",
    padding: "8px",
    borderRadius: "10px",
    ...boxShadow,
    position: "absolute",
    bottom: "10px",
    zIndex: "1",
  },
};

class VendorIntro extends React.Component {
  state = {};

  render() {
    const { classes, videoLink, vendor } = this.props;
    const rating = getAverageReview(vendor.review);
    const vendorAddress = vendor.address;
    return (
      <div className={classes.container}>
        <GridContainer>
          <GridItem xs={6} sm={3} md={2}>
            <div className={classes.vendor_logo}>
              <img src={vendor.frontend.logo} alt="..." width="100%" />
            </div>
          </GridItem>
          <GridItem xs={12} sm={9} md={10}>
            <GridContainer>
              <GridItem xs={12}>
                <Typography variant="title" className={classes.name_card}>
                  {vendor.businessName}
                </Typography>
              </GridItem>
              <GridItem xs={12} style={{ backgroundColor: "white" }}>
                <GridContainer>
                  <GridItem sm={6}>
                    <Typography variant="subheading" className={classes.sub_heading}>
                      <a href={`tel:${vendor.phone}`} style={{ color: primaryColor }}>
                        {vendor.phone}
                      </a>
                      &nbsp;|&nbsp;
                      {`${vendorAddress.state},`}
                      &nbsp;
                      {`${vendorAddress.country}`}
                    </Typography>
                  </GridItem>
                  <GridItem sm={6}>
                    <span align="right" className={classes.rating_text}>
                      <i className="fas fa-check-circle" style={{ color: warningColor }} />
                      <strong>{` (${vendor.review.length})`}</strong>
                      &nbsp;Reviews&nbsp;|&nbsp;Ratings&nbsp;
                      <StarRatings
                        rating={rating}
                        starRatedColor="gold"
                        numberOfStars={5}
                        starDimension="15px"
                        starSpacing="0px"
                        name="rating"
                      />
                      <strong>{` (${rating})`}</strong>
                    </span>
                  </GridItem>
                </GridContainer>
              </GridItem>
            </GridContainer>
            <hr />
          </GridItem>
        </GridContainer>
        <br />
        <GridContainer>
          <GridItem xs={12}>
            <GridContainer spacing={32} justify="center" alignItems="stretch">
              <GridItem md={4}>
                <Paper className={classes.card} style={{ backgroundImage: `url("${[Ad1, Ad2].sort((a, b) => 0.5 - Math.random())[0]}")` }}>
                  {/* <h3>
                    {vendor.businessName}
                  </h3>
                  <p className={classes.text}>
                    <Home style={{ fontSize: "1.2em", verticalAlign: "sub" }} />
                    &nbsp;
                    <span style={{ color: "#3C4858", fontSize: "0.9em", fontWeight: "bolder", width: "100%" }}>
                      Address:&nbsp;
                      {`${vendorAddress.building}, ${vendorAddress.street}, ${vendorAddress.city}, ${vendorAddress.state}, ${vendorAddress.country}`}
                    </span>
                    <br />
                    <Call style={{ fontSize: "1.2em", verticalAlign: "sub" }} />
                    &nbsp;
                    <span style={{ color: "#3C4858", fontSize: "0.9em", fontWeight: "bolder", width: "100%" }}>
                      Phone Number:&nbsp;
                      <a href={`tel:${vendor.phone}`} style={{ color: "#3C4858" }}>
                        {vendor.phone}
                      </a>
                    </span>
                    <br />
                    <Email style={{ fontSize: "1.2em", verticalAlign: "sub" }} />
                    &nbsp;
                    <span style={{ color: "#3C4858", fontSize: "0.9em", fontWeight: "bolder", width: "100%" }}>
                      Email:&nbsp;
                      <a href={`mailto:${vendor.email}`} style={{ color: "#3C4858" }}>
                        {vendor.email}
                      </a>
                    </span>
                    <br />
                    {(vendor.profile.facebook !== "") ? (
                      <Link to={vendor.profile.facebook}>
                        <Button color="facebook" justIcon>
                          <i className=" fab fa-facebook" />
                        </Button>
                      </Link>)
                      : null}
                    {(vendor.profile.googlePlus !== "") ? (
                      <Link to={vendor.profile.googlePlus}>
                        <Button color="google" justIcon>
                          <i className=" fab fa-google-plus-g" />
                        </Button>
                      </Link>)
                      : null}
                    {(vendor.profile.instagram !== "") ? (
                      <Link to={vendor.profile.instagram}>
                        <Button color="facebook" justIcon>
                          <i className=" fab fa-instagram" />
                        </Button>
                      </Link>)
                      : null}
                    {(vendor.profile.linkedin !== "") ? (
                      <Link to={vendor.profile.linkedin}>
                        <Button color="facebook" justIcon>
                          <i className=" fab fa-linkedin-in" />
                        </Button>
                      </Link>)
                      : null}
                    {(vendor.profile.pinterest !== "") ? (
                      <Link to={vendor.profile.pinterest}>
                        <Button color="google" justIcon>
                          <i className=" fab fa-pinterest-p" />
                        </Button>
                      </Link>)
                      : null}
                    {(vendor.profile.skype !== "") ? (
                      <Link to={vendor.profile.skype}>
                        <Button color="twitter" justIcon>
                          <i className=" fab fa-skype" />
                        </Button>
                      </Link>)
                      : null}
                    {(vendor.profile.twitter !== "") ? (
                      <Link to={vendor.profile.twitter}>
                        <Button color="twitter" justIcon>
                          <i className=" fab fa-twitter" />
                        </Button>
                      </Link>)
                      : null}
                    {(vendor.profile.youtube !== "") ? (
                      <Link to={vendor.profile.youtube}>
                        <Button color="google" justIcon>
                          <i className=" fab fa-youtube" />
                        </Button>
                      </Link>)
                      : null}
                    {(vendor.profile.website !== "") ? (
                      <Link to={vendor.profile.website}>
                        <Button color="github" justIcon>
                          <i className=" fas fa-globe" />
                        </Button>
                      </Link>)
                      : null}
                  </p> */}
                </Paper>
              </GridItem>
              <GridItem md={4}>
                <Paper className={classes.videoCard}>
                  <iframe
                    id="videoFrame"
                    className={classes.modal_iframe}
                    src={videoLink}
                    frameBorder="0"
                    allowFullScreen
                    title="E-Commerce Revolutionized by Bezop Blockchain Ltd"
                  />
                </Paper>
              </GridItem>
              <GridItem md={4}>
                <Paper className={classes.card} style={{ backgroundImage: `url("${[Ad3, Ad4].sort((a, b) => 0.5 - Math.random())[0]}")` }}>
                  {/* <h3>
                    Vendor Rating
                  </h3>
                  <GridContainer spacing={16} justify="center" alignItems="flex-start">
                    <GridItem sm={5}>
                      <Stars className={classes.star} />
                      <h4 className={classes.rating}>
                        {rating}
                      </h4>
                    </GridItem>
                    <GridItem sm={7}>
                      <Rating review={vendor.review} />
                    </GridItem>
                  </GridContainer>
                  {rating === 0
                    ? (
                      <div>
                        <SnackbarContent
                          style={{
                            padding: "5px",
                            margin: "10px auto",
                            borderRadius: "3px",
                          }}
                          message={(
                            <span>
                              <b>
                                This vendor is not yet reviewed.
                              </b>
                            </span>
                        )}
                          color="warning"
                          icon={Warning}
                        />
                      </div>)
                    : null} */}
                </Paper>
              </GridItem>
            </GridContainer>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default withStyles(styles)(VendorIntro);
