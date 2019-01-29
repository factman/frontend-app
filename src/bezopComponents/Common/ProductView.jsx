import React from "react";
import Grid from "@material-ui/core/Grid";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Desc from "@material-ui/icons/Description";
import Info from "@material-ui/icons/Info";
import Detail from "@material-ui/icons/Assessment";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import GridItem from "../../components/Grid/GridItem";
import Validator from "../../helpers/validator";

const styles = theme => ({
  displayMargin: {
    marginTop: "10px",
    marginBottom: "10px",
  },
  russoOneFF: {
    fontFamily: "'Russo One', 'Open Sans'",
  },
  TypePoMariginTop: {
    marginTop: "15px !important",
  },
  TypePoMariginBottom: {
    marginBottom: "10px !important",
  },
  fullWidth: {
    width: "100%",
    fontSize: "20px",
  },
  iconPositionBottom: {
    verticalAlign: "bottom",
  },
});

class ProductView extends React.Component {
  constructor(props) {
    super(props);
    const { eachData } = this.props;
    this.state = {
      expanded: null,
      productDetails: eachData,
    };
  }

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

  render() {
    const {
      productDetails,
      expanded,
    } = this.state;
    const {
      classes,
      children,
    } = this.props;
    const imageStyle = { width: "100%", padding: "5px", border: "1px solid" };
    return (
      <Grid container>
        <GridItem xs={12} sm={12} md={6} style={{ height: "fit-content" }}>
          <img
            src={productDetails.images.image_lg}
            style={imageStyle}
            alt={productDetails.name}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <ExpansionPanel expanded={expanded === "panel1"} onChange={this.handleChange("panel1")}>
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
                {Validator.propertyExist(productDetails, "description", "long") ? productDetails.descriptionLong : null}
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
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
                {Validator.propertyExist(productDetails, "vendor", "businessName") ? productDetails.vendor.businessName : null}
              </p>
              <p>
                Shop Link:&nbsp;
                {Validator.propertyExist(productDetails, "vendor", "url") ? productDetails.vendor.url : null}
              </p>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel expanded={expanded === "panel3"} onChange={this.handleChange("panel3")}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>
                <Detail
                  className={classes.iconPositionBottom}
                />
                &nbsp;Product Details
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <ul>
                {
                  Validator.propertyExist(productDetails, "brand", "name")
                    ? (
                      <li>
                        <strong>
                        Brand:&nbsp;
                        </strong>
                        {productDetails.brand.name}
                      </li>
                    ) : null
                }
                {
                  Validator.propertyExist(productDetails, "shippingDetails", "length")
                    ? (
                      <li>
                        <strong>
                        Length:&nbsp;
                        </strong>
                        {productDetails.shippingDetails.length}
                      </li>
                    ) : null
                }
                {
                  Validator.propertyExist(productDetails, "shippingDetails", "width")
                    ? (
                      <li>
                        <strong>
                        Width:&nbsp;
                        </strong>
                        {productDetails.shippingDetails.width}
                      </li>
                    ) : null
                }
                {
                  Validator.propertyExist(productDetails, "shippingDetails", "height")
                    ? (
                      <li>
                        <strong>
                        Height:&nbsp;
                        </strong>
                        {productDetails.shippingDetails.height}
                      </li>
                    ) : null
                }
                {
                  Validator.propertyExist(productDetails, "shippingDetails", "weight")
                    ? (
                      <li>
                        <strong>
                        Weight:&nbsp;
                        </strong>
                        {productDetails.shippingDetails.weight}
                      </li>
                    ) : null
                }
                {
                  Validator.propertyExist(productDetails, "description", "color")
                    ? (
                      <li>
                        <strong>
                        Unit:&nbsp;
                        </strong>
                        {productDetails.descriptionUnit}
                      </li>
                    ) : null
                }
                {
                  Validator.propertyExist(productDetails, "description", "color")
                    ? (
                      <li>
                        <strong>
                          Color:&nbsp;
                        </strong>
                        {productDetails.descriptionColor.join(", ")}
                      </li>
                    ) : null
                }
              </ul>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          {children !== undefined ? children : null}
        </GridItem>
      </Grid>
    );
  }
}

export default withStyles(styles)(ProductView);
