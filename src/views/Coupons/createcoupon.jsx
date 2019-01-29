import React from "react";
import Grid from "@material-ui/core/Grid";
import Datetime from "react-datetime";
import FormControl from "@material-ui/core/FormControl";
import withStyles from "@material-ui/core/styles/withStyles";

import GridItem from "../../components/Grid/GridItem";
import Card from "../../components/Card/Card";
import CardBody from "../../components/Card/CardBody";
import CardHeader from "../../components/Card/CardHeader";
import CardFooter from "../../components/Card/CardFooter";
import CustomInput from "../../components/CustomInput/CustomInput";
import checkboxAdnRadioStyle from "../../assets/jss/material-kit-react/checkboxAdnRadioStyle";
import Validator from "../../helpers/validator";


const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  formControl: {
    margin: theme.spacing.unit,
    width: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
  floatRight: {
    float: "right",
    margin: "5px",
    ...theme.button,
  },
  marginTopFormControl: {
    marginTop: "20px",
    ...theme.MuiFormControl,
  },
  ...checkboxAdnRadioStyle,
});
class AddCoupon extends React.Component {
  constructor(props) {
    super(props);
    const { couponDetails } = this.props;
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      couponDetails,
    };
  }

  componentWillReceiveProps(newProps) {
    if (Validator.propertyExist(newProps, "coupon", "addCoupon")) {
      // Check if the coupon was created successfuly
      if (typeof newProps.coupon.addCoupon === "string") {
        return false;
      }
      const { couponDetails } = this.state;
      // Clear the inputted value after creating coupon
      this.setState({
        couponDetails,
      });
    }
    return false;
  }

  setCouponDetails = (type, value, parent = null) => {
    const { setParentCouponDetails } = this.props;
    const { couponDetails } = this.state;
    const newCounponDetails = JSON.parse(JSON.stringify(couponDetails));
    if (parent === null) {
      newCounponDetails[type] = type === "code" ? value.toUpperCase() : value;
    } else {
      newCounponDetails[parent][type] = value;
    }
    this.setState({
      couponDetails: newCounponDetails,
    });
    setParentCouponDetails(newCounponDetails);
  }

  handleChange = (event) => {
    this.setCouponDetails(event.target.name, event.target.value);
  };

  // Begining of Coupon Validation
  handleSpecialCouponChange = (newDateTime) => {
    if (typeof newDateTime === "object") {
      this.setCouponDetails("till", newDateTime.format("YYYY-MM-DD"));
    } else if (typeof newDateTime === "string") {
      this.setCouponDetails("till", newDateTime);
    }
  }

  // End of coupon date validation
  render() {
    const { classes } = this.props;
    const { couponDetails } = this.state;

    return (
      <div>
        <div>
          <Card>
            <CardHeader color="primary">
              <h4>
                 Create New Coupon
              </h4>
              <p>
                Discount Coupons
              </p>
            </CardHeader>
            <CardBody>
              <Grid container>
                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                    labelText="Title"
                    id="title"
                    formControlProps={{
                      fullWidth: true,
                      required: true,
                    }}
                    inputProps={{
                      type: "text",
                      name: "title",
                      value: couponDetails.title,
                      onChange: this.handleChange,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                    labelText="Code"
                    id="code"
                    formControlProps={{
                      fullWidth: true,
                      required: true,
                    }}
                    inputProps={{
                      type: "text",
                      name: "code",
                      value: couponDetails.code,
                      onChange: this.handleChange,
                      className: "textUpperCase",
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Amount"
                    id="amount"
                    formControlProps={{
                      fullWidth: true,
                      required: true,
                    }}
                    inputProps={{
                      type: "number",
                      name: "amount",
                      value: couponDetails.amount,
                      onChange: this.handleChange,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <FormControl fullWidth>
                    <Datetime
                      className={classes.marginTopFormControl}
                      dateFormat="YYYY-MM-DD"
                      timeFormat={false}
                      value={couponDetails.till}
                      onChange={this.handleSpecialCouponChange}
                      inputProps={{
                        placeholder: "Coupon Duratiion",
                        name: "till",

                      }}
                    />
                  </FormControl>
                </GridItem>
              </Grid>
            </CardBody>
            <CardFooter />
          </Card>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(AddCoupon);
