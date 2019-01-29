import React from "react";
import Link from "react-router-dom/Link";
// @material-ui/core components
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import Select2 from "react-select";
import FormControl from "@material-ui/core/FormControl";
import countries from "country-list";
import Snackbar from "@material-ui/core/Snackbar";
// core components
import GridItem from "../../components/Grid/GridItem";
import CustomInput from "../../components/CustomInput/CustomInput";
import Button from "../../components/CustomButtons/Button";
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardAvatar from "../../components/Card/CardAvatar";
import CardBody from "../../components/Card/CardBody";
import CardFooter from "../../components/Card/CardFooter";
import BezopSnackBar from "../../assets/jss/bezop-mkr/BezopSnackBar";
import Validator from "../../helpers/validator";

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userProfile: {
        fullname: "",
        email: "",
        phone: "",
        address: {
          country: "",
          state: "",
          city: "",
          zip: "",
          street: "",
          building: "",
        },
        frontend: {
          description: "",
        },
      },
      selectedCountry: null,
      countrySelect: "react-select-label-hidden",
      snackBarMessageSuccess: "",
      snackBarOpenSuccess: false,
      snackBarVariant: "success",
    };
  }

  componentDidMount() {
    const { fetchUserProfile } = this.props;
    fetchUserProfile(JSON.parse(localStorage["bezop-login:vendor"]).profile.id);
  }

  componentWillReceiveProps(newProps) {
    const { userProfile } = this.state;
    if (Validator.propertyExist(newProps.vendorProfile, "updateProfile")) {
      if (typeof newProps.vendorProfile.updateProfile === "string") {
        this.setState({
          snackBarOpenSuccess: true,
          snackBarMessageSuccess: newProps.vendorProfile.updateProfile,
          snackBarVariant: "error",
        });
        return false;
      }

      const newUserProfile = { ...userProfile, ...newProps.vendorProfile.updateProfile };
      this.setState({
        userProfile: newUserProfile,
        snackBarOpenSuccess: true,
        snackBarMessageSuccess: "You have successfully updated your profile",
        snackBarVariant: "success",
      });
      const updatedVendorProfile = { ...JSON.parse(localStorage["bezop-login:vendor"]), ...{ profile: newProps.vendorProfile.updateProfile } };
      localStorage.setItem("bezop-login:vendor", JSON.stringify(updatedVendorProfile));
    }

    if (Validator.propertyExist(newProps.vendorProfile, "getProfile")) {
      if (typeof newProps.vendorProfile.getProfile === "string") {
        return false;
      }

      const newUserProfile = { ...userProfile, ...newProps.vendorProfile.getProfile };
      this.setState({
        userProfile: newUserProfile,
        selectedCountry: Validator.propertyExist(newUserProfile, "address", "country") ? { value: newUserProfile.address.country, label: newUserProfile.address.country.replace(/^\w/, c => c.toUpperCase()) } : null,
        countrySelect: `react-select-label-${Validator.propertyExist(newUserProfile, "address", "country") ? "visible" : "hidden"}`,
      });
    }
    return false;
  }

  onCloseHandlerSuccess = () => {
    this.setState({
      snackBarOpenSuccess: false,
    });
  }

  setUserProfile = (type, value) => {
    const { userProfile } = this.state;
    const names = type.split("|");
    const newUserProfile = JSON.parse(JSON.stringify(userProfile));
    switch (names.length) {
      case 1:
        newUserProfile[names[0]] = value;
        break;
      case 2:
        newUserProfile[names[1]][names[0]] = value;
        break;
      case 3:
        newUserProfile[names[2]][names[1]][names[0]] = value;
        break;
      default:
        return false;
    }
    return this.setState({
      userProfile: newUserProfile,
    });
  }

  updateUserProfile = () => {
    const { updatedVendorProfile } = this.props;
    const { userProfile } = this.state;
    updatedVendorProfile(userProfile);
  }

  handleChange = (e) => {
    this.setUserProfile(e.target.name, e.target.value);
  }

  handleCountryChange = (selectedCountry) => {
    this.setState({ selectedCountry });
    if (selectedCountry !== null) {
      this.setUserProfile("country|address", selectedCountry.value);
      this.setState({
        countrySelect: "react-select-label-visible",
      });
    } else {
      this.setState({
        countrySelect: "react-select-label-hidden",
      });
      this.setUserProfile("country|address", "");
    }
  }

  render() {
    const { classes } = this.props;
    const {
      userProfile, selectedCountry, countrySelect, avatar,
      snackBarMessageSuccess, snackBarOpenSuccess, snackBarVariant,
    } = this.state;
    return (
      <div>
        <Grid container>
          <GridItem xs={12} sm={12} md={8}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>
                  Edit Profile
                </h4>
                <p className={classes.cardCategoryWhite}>
                  Complete your profile
                </p>
              </CardHeader>
              <CardBody>
                <Grid container>
                  <GridItem xs={12} sm={12}>
                    <CustomInput
                      labelText="Fullname"
                      id="fullname"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        value: userProfile.fullname,
                        name: "fullname",
                        onChange: this.handleChange,
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Email address"
                      id="email"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        value: userProfile.email,
                        name: "email",
                        onChange: this.handleChange,
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <FormControl className={classes.formControl} style={{ marginLeft: "0px" }}>
                      <InputLabel htmlFor="selectedCountry" className={countrySelect}>
                        Type or Select Country
                      </InputLabel>
                      <Select2
                        id="selectedCountry"
                        name="selectedCountry"
                        value={selectedCountry}
                        placeholder="Type or Select Country"
                        onChange={this.handleCountryChange}
                        options={
                          countries().getNames().map((country) => {
                            const list = { value: country.toLowerCase(), label: country };
                            return list;
                          })
                          }
                      />
                    </FormControl>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="State"
                      id="state"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        value: userProfile.address.state,
                        name: "state|address",
                        onChange: this.handleChange,
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="City"
                      id="city"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        value: userProfile.address.city,
                        name: "city|address",
                        onChange: this.handleChange,
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Zip"
                      id="zip"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        value: userProfile.address.zip,
                        name: "zip|address",
                        onChange: this.handleChange,
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Phone Number"
                      id="phone"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        value: userProfile.phone,
                        name: "phone",
                        onChange: this.handleChange,
                      }}
                    />
                  </GridItem>
                </Grid>
              </CardBody>
              <CardFooter>
                <Button color="primary" onClick={this.updateUserProfile}>
                  Update Profile
                </Button>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card>
              <CardAvatar profile>
                <Link to="#pablo" onClick={e => e.preventDefault()}>
                  <img src={avatar} alt="..." />
                </Link>
              </CardAvatar>
              <CardBody>
                <h6 className={classes.cardCategory}>
                  {userProfile.domainName}
                </h6>
                <h4 className={classes.cardTitle}>
                  {userProfile.fullname}
                </h4>
                <p className={classes.description}>
                  {userProfile.frontend.description}
                </p>
                <Button color="primary" round>
                  Change Profile Picture
                </Button>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={8}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>
                  Manage Password
                </h4>
                <p className={classes.cardCategoryWhite}>
                  Update Your Password
                </p>
              </CardHeader>
              <CardBody>
                <Grid container>
                  <GridItem>
                    <CustomInput
                      labelText="Current Password"
                      id="password"
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                  <GridItem>
                    <CustomInput
                      labelText="New Password"
                      id="password_new"
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Confirm New Password"
                      id="email-address"
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                </Grid>
              </CardBody>
              <CardFooter>
                <Button color="primary">
                  Update Password
                </Button>
              </CardFooter>
            </Card>
          </GridItem>
        </Grid>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={snackBarOpenSuccess}
          onClose={this.onCloseHandlerSuccess}
        >
          <BezopSnackBar
            onClose={this.onCloseHandlerSuccess}
            variant={snackBarVariant}
            message={snackBarMessageSuccess}
          />
        </Snackbar>
      </div>

    );
  }
}

export default UserProfile;
