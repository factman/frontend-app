import React from "react";
import Link from "react-router-dom/Link";
import withStyles from "@material-ui/core/styles/withStyles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import isEqual from "lodash/isEqual";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import StarRatings from "react-star-ratings";
// import Desc from "@material-ui/icons/Description";
import Info from "@material-ui/icons/Info";
// import Detail from "@material-ui/icons/Assessment";
import RateReview from "@material-ui/icons/RateReview";
import Snackbar from "@material-ui/core/Snackbar";
import GridContainer from "../Grid/GridContainer";
import GridItem from "../Grid/GridItem";
// import LinkManager from "../../helpers/linkManager";
import { userIs } from "../Auth/AccessControl";
import CustomInput from "../CustomInput/CustomInput";
import Button from "../CustomButtons/Button";
import { reviewItem } from "../../actions/actions_customer_review";
import Validator from "../../helpers/validator";
import { checkUserItemRating, getUserId, getAverageReview } from "../../helpers/logic";
import BezopSnackBar from "../../assets/jss/bezop-mkr/BezopSnackBar";

const styles = theme => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "50%",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  iconPositionBottom: {
    verticalAlign: "bottom",
  },
});

class ProductInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: null,
      reviewDetails: {
        rating: 0,
        comment: "",
        subject: "product",
        subjectId: props.product.id,
      },
      review: props.product.review,
      snackBarOpen: false,
      snackBarMessage: "",
      snackBarVariant: "success",
    };
  }

  componentWillReceiveProps(newProps) {
    const { openCurrentPanel, customerReview, product } = this.props;
    if (openCurrentPanel !== newProps.openCurrentPanel) {
      this.setState({
        expanded: newProps.openCurrentPanel,
      });
    }

    if (Validator.propertyExist(newProps, "customerReview", "reviewItem")
      && !isEqual(newProps.customerReview.reviewItem, customerReview.reviewItem)
    ) {
      if (typeof newProps.customerReview.reviewItem === "string") {
        this.setState({
          snackBarOpen: true,
          snackBarMessage: newProps.customerReview.reviewItem,
          snackBarVariant: "error",
        });
        return false;
      }
      const { review } = this.state;
      review.push(newProps.customerReview.reviewItem);
      this.setState({
        snackBarOpen: true,
        snackBarMessage: "You have successfully review the product",
        snackBarVariant: "success",
        reviewDetails: {
          rating: 0,
          comment: "",
          subject: "product",
          subjectId: product.id,
        },
        review,
      });
    }
    return false;
  }

  onCloseHandler = () => {
    this.setState({
      snackBarOpen: false,
    });
  }

  onReviewProduct = () => {
    const { reviewDetails } = this.state;
    const { dispatch } = this.props;
    dispatch(reviewItem(reviewDetails));
  }

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

  changeRating = (newRating, name) => {
    this.updateReviewDetails(name, newRating);
  }

  changeReviewWriteUp = (e) => {
    this.updateReviewDetails("comment", e.target.value);
  }

  updateReviewDetails = (name, value) => {
    const { reviewDetails } = this.state;
    const newReviewDetails = JSON.parse(JSON.stringify(reviewDetails));
    newReviewDetails[name] = value;
    this.setState({
      reviewDetails: newReviewDetails,
    });
  }

  render() {
    const { classes, product, data } = this.props;
    const {
      expanded,
      reviewDetails,
      snackBarOpen,
      snackBarVariant,
      snackBarMessage,
      review,
    } = this.state;
    const rating = getAverageReview(data.vendor.review);

    return (
      <div className={classes.root}>
        { userIs(["customer"])
          && (checkUserItemRating(review, getUserId("customer"), product.id) === false)
          ? (
            <ExpansionPanel expanded={expanded === "rankPanel"} onChange={this.handleChange("rankPanel")}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>
                  <RateReview
                    className={classes.iconPositionBottom}
                  />
                  &nbsp;Write Review
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <GridContainer style={{ width: "100%" }}>
                  <GridItem md={12}>
                    <StarRatings
                      rating={reviewDetails.rating}
                      starRatedColor="gold"
                      changeRating={this.changeRating}
                      starHoverColor="gold"
                      numberOfStars={5}
                      starDimension="25px"
                      starSpacing="2px"
                      name="rating"
                    />
                    <CustomInput
                      labelText="Write Review"
                      id="write"
                      formControlProps={{
                        fullWidth: true,
                        style: {
                          width: "100%",
                        },
                      }}
                      inputProps={{
                        multiline: true,
                        rows: 3,
                        name: "comment",
                        value: reviewDetails.comment,
                        onChange: this.changeReviewWriteUp,
                      }}
                    />
                    <Button
                      color="primary"
                      round
                      onClick={this.onReviewProduct}
                    >
                      Review Product
                    </Button>
                  </GridItem>
                </GridContainer>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          ) : null
        }
        {/* <ExpansionPanel expanded={expanded === "panel1"} onChange={this.handleChange("panel1")}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>
              <Desc
                className={classes.iconPositionBottom}
              />
              &nbsp;Description
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              {product.descriptionLong}
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel> */}
        <ExpansionPanel expanded={expanded === "panel2"} onChange={this.handleChange("panel2")}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>
              <Info
                className={classes.iconPositionBottom}
              />
              &nbsp;Vendor Information
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails style={{ display: "block" }}>
            <h3>
              Vendor
            </h3>
            <p>
              Shop Name:&nbsp;
              {data.vendor.businessName}
            </p>
            <p>
              Shop Link:&nbsp;
              <Link to={`/${product.vendor.domainName}`}>
                {`${window.location.protocol}//${window.location.host}/${product.vendor.domainName}`}
              </Link>
            </p>
            Vendor Rating:&nbsp;
            <StarRatings
              rating={rating}
              starRatedColor="gold"
              numberOfStars={5}
              starDimension="15px"
              starSpacing="0px"
              name="rating"
            />
            <small>
              &nbsp;
              {rating.toFixed(2) === 1.00 ? "1 star " : `${rating.toFixed(2)} stars`}
            </small>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        {/* <ExpansionPanel expanded={expanded === "panel3"} onChange={this.handleChange("panel3")}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>
              <Detail
                className={classes.iconPositionBottom}
              />
              &nbsp;Product Specifications
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <ul>
              <li>
                <strong>
                  Brand:&nbsp;
                </strong>
                {(product.brand) ? (
                  <Link to={`/${product.vendor.domainName}/brand/${LinkManager.parse(product.brand.name, product.id)}`}>
                    {product.brand.name}
                  </Link>)
                  : null}
              </li>
              <li>
                <strong>
                  Length:&nbsp;
                </strong>
                {product.shippingDetails.length}
                &nbsp;Inches
              </li>
              <li>
                <strong>
                  Width:&nbsp;
                </strong>
                {product.shippingDetails.width}
                &nbsp;Inches
              </li>
              <li>
                <strong>
                  Height:&nbsp;
                </strong>
                {product.shippingDetails.height}
                &nbsp;Inches
              </li>
              <li>
                <strong>
                  Weight:&nbsp;
                </strong>
                {product.shippingDetails.weight}
                &nbsp;Inches
              </li>
              <li>
                <strong>
                  Unit:&nbsp;
                </strong>
                {product.descriptionUnit}
              </li>
              <li>
                <strong>
                  Color:&nbsp;
                </strong>
                {product.descriptionColor.join(", ")}
              </li>
            </ul>
          </ExpansionPanelDetails>
        </ExpansionPanel> */}
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={snackBarOpen}
          onClose={this.onCloseHandler}
          style={{
            zIndex: 5000,
            top: "100px",
          }}
        >
          <BezopSnackBar
            onClose={this.onCloseHandler}
            variant={snackBarVariant}
            message={snackBarMessage}
          />
        </Snackbar>
      </div>
    );
  }
}

export default withStyles(styles)(ProductInfo);
