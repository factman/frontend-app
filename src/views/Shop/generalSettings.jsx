import React from "react";
import isEqual from "lodash/isEqual";
import ImagePlaceholder from "../../bezopComponents/Images/ImagePlaceholder";
import { getJsonString } from "../../helpers/logic";
import Validator from "../../helpers/validator";
import { Grid, withStyles, Paper } from "../../../node_modules/@material-ui/core";
import GridItem from "../../components/Grid/GridItem";
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardBody from "../../components/Card/CardBody";
import CustomInput from "../../components/CustomInput/CustomInput";
import Button from "../../components/CustomButtons/Button";

const ProductsStyle = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "white",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0",
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF",
    },
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1",
    },
  },
  spacer: {
    marginTop: "10px",
    marginBottom: "10px",
  },
  innerSpacer: {
    padding: "15px",
  },
  buttonPosition: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  propertyPosition: {
    display: "flex",
    alignItems: "center",
  },
};
class GeneralSettings extends React.Component {
  constructor(props) {
    super(props);
    const vendorProfile = getJsonString(localStorage["bezop-login:vendor"], "profile");
    this.state = {
      vendor: vendorProfile,
      generalSetting: {
        email: Validator.propertyExist(vendorProfile, "email") ? vendorProfile.email : "",
        googleAnalytics: {
          trackingId: Validator.propertyExist(vendorProfile, "googleAnalytics", "trackingId") ? vendorProfile.googleAnalytics.trackingId : "",
        },
      },
    };
  }

  componentWillReceiveProps(newProps) {
    const { vendorProfile } = this.props;
    if (Validator.propertyExist(newProps, "vendorProfile", "getImageUpdate")
&& !isEqual(newProps.vendorProfile.getImageUpdate, vendorProfile.getImageUpdate)) {
      if (typeof newProps.vendorProfile.getImageUpdate === "string") {
        return false;
      }

      this.setState({
        vendor: newProps.vendorProfile.getImageUpdate,
      });
      const updatedAdminProfile = { ...JSON.parse(localStorage["bezop-login:vendor"]), ...{ profile: newProps.vendorProfile.getImageUpdate } };
      localStorage.setItem("bezop-login:vendor", JSON.stringify(updatedAdminProfile));
    }

    if (Validator.propertyExist(newProps, "vendorProfile", "updateProfile")
&& !isEqual(newProps.vendorProfile.updateProfile, vendorProfile.updateProfile)) {
      if (typeof newProps.vendorProfile.updateProfile === "string") {
        return false;
      }
      const updatedVendorProfile = { ...JSON.parse(localStorage["bezop-login:vendor"]), ...{ profile: newProps.vendorProfile.updateProfile } };
      localStorage.setItem("bezop-login:vendor", JSON.stringify(updatedVendorProfile));
    }
    return false;
  }

  handleChange = (e) => {
    this.setGeneralSettings(e.target.name, e.target.value);
  }

  setGeneralSettings = (name, value) => {
    const { generalSetting } = this.state;
    const newGeneralSettings = JSON.parse(JSON.stringify(generalSetting));
    const names = name.split("|");
    switch (names.length) {
      case 1:
        newGeneralSettings[names[0]] = value;
        break;
      case 2:
        newGeneralSettings[names[1]][names[0]] = value;
        break;
      case 3:
        newGeneralSettings[names[2]][names[1]][names[0]] = value;
        break;
      default:
        break;
    }
    this.setState({
      generalSetting: newGeneralSettings,
    });
  }

  onSubmitGeneralSettings = () => {
    const { updatedVendorProfile } = this.props;
    const { generalSetting } = this.state;
    if (updatedVendorProfile) {
      updatedVendorProfile(generalSetting);
    }
  }

  render() {
    const { vendor, generalSetting } = this.state;
    const { postImage, classes } = this.props;
    return (
      <Grid container>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>
                General Settings
              </h4>
            </CardHeader>
            <CardBody>
              <Paper className={classes.innerSpacer}>
                {
                  vendor
                    ? (
                      <ImagePlaceholder
                        srcImage={vendor.frontend.logo}
                        postImage={postImage}
                        eachData={vendor}
                        collection="vendor"
                        label="logo|frontend"
                        fileInput="logoFrontend"
                        height={200}
                        width={200}
                        aspect
                        imageCenter
                      />
                    ) : null
                }
              </Paper>
              <Paper className={`${classes.spacer} ${classes.innerSpacer}`}>
                <Grid container>
                  <GridItem xs={12} sm={12} md={5} className={classes.propertyPosition}>
                    <h4>
                      Google Analytics Tracking ID
                    </h4>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={5}>
                    <CustomInput
                      labelText="Google Analytics Tracking ID"
                      id="trackingID"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        value: generalSetting.googleAnalytics.trackingId,
                        name: "trackingId|googleAnalytics",
                        onChange: this.handleChange,
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={2} className={classes.buttonPosition}>
                    <Button
                      color="primary"
                      style={{ marginTop: "20px" }}
                      onClick={this.onSubmitGeneralSettings}
                    >
                      Update
                    </Button>
                  </GridItem>
                </Grid>
              </Paper>
            </CardBody>
          </Card>
        </GridItem>
      </Grid>
    );
  }
}

export default withStyles(ProductsStyle)(GeneralSettings);
