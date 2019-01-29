import React from "react";
// @material-ui/core components
import Grid from "@material-ui/core/Grid";
import Snackbar from "@material-ui/core/Snackbar";
import Hidden from "@material-ui/core/Hidden";
import isEqual from "lodash/isEqual";
// core components
import GridItem from "../../components/Grid/GridItem";
import CustomInput from "../../components/CustomInput/CustomInput";
import Button from "../../components/CustomButtons/Button";
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardBody from "../../components/Card/CardBody";
import CardFooter from "../../components/Card/CardFooter";
import BezopSnackBar from "../../assets/jss/bezop-mkr/BezopSnackBar";
import Validator from "../../helpers/validator";

class AdminProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      adminProfile: {
        fullname: "",
        phone: "",
        address: "",
        username: "",
        email: "",
      },
      // completeProfile: JSON.parse(localStorage["bezop-login:admin"]).profile.completeProfile,
      snackBarMessage: "",
      snackBarOpen: false,
      snackBarVariant: "success",
    };
  }

  componentDidMount() {
    const adminCurrentProfile = JSON.parse(localStorage["bezop-login:admin"]).profile;
    const newCurrentAdminProfile = {
      fullname: Validator.propertyExist(adminCurrentProfile, "fullname") ? adminCurrentProfile.fullname : "",
      username: Validator.propertyExist(adminCurrentProfile, "username") ? adminCurrentProfile.username : "",
      email: Validator.propertyExist(adminCurrentProfile, "email") ? adminCurrentProfile.email : "",
      phone: Validator.propertyExist(adminCurrentProfile, "phone") ? adminCurrentProfile.phone : "",
      address: Validator.propertyExist(adminCurrentProfile, "address") ? adminCurrentProfile.address : "",
    };
    this.setState({
      adminProfile: newCurrentAdminProfile,
    });
  }

  componentWillReceiveProps(newProps) {
    const { adminProfile } = this.props;
    if (Validator.propertyExist(newProps, "adminProfile", "updateProfile")
     && !isEqual(adminProfile.updateProfile, newProps.adminProfile.updateProfile)) {
      if (typeof newProps.adminProfile.updateProfile === "string") {
        this.setState({
          snackBarVariant: "error",
          snackBarOpen: true,
          snackBarMessage: newProps.adminProfile.updateProfile,
        });
        return false;
      }
      this.setState({
        adminProfile: newProps.adminProfile.updateProfile,
        snackBarVariant: "success",
        snackBarOpen: true,
        snackBarMessage: "You have successfully updated your profile",
      });
      const updatedAdminProfile = { ...JSON.parse(localStorage["bezop-login:admin"]), ...{ profile: newProps.adminProfile.updateProfile } };
      localStorage.setItem("bezop-login:admin", JSON.stringify(updatedAdminProfile));
    }
    return false;
  }

  onCloseHandler = () => {
    this.setState({
      snackBarOpen: false,
    });
  }

  setAdminProfile = (type, value) => {
    const { adminProfile } = this.state;
    const newAdminProfile = JSON.parse(JSON.stringify(adminProfile));
    newAdminProfile[type] = value;
    this.setState({
      adminProfile: newAdminProfile,
    });
  }

  handleChange = (e) => {
    this.setAdminProfile(e.target.name, e.target.value);
  }

  updateAdminProfile = () => {
    const { updatedAdminProfile } = this.props;
    const { adminProfile } = this.state;
    updatedAdminProfile(adminProfile);
  }

  render() {
    const { classes } = this.props;
    const {
      adminProfile,
      snackBarMessage,
      snackBarOpen,
      snackBarVariant,
    } = this.state;
    const { profile } = JSON.parse(localStorage["bezop-login:admin"]);
    return (
      <div>
        <Grid container>
          <GridItem xs={12} sm={12} md={8}>
            <Card>
              <CardHeader color="primary">
                <h4>
                  Edit Profile
                </h4>
                <p>
                  Complete your profile
                </p>
              </CardHeader>
              <CardBody>
                <Grid container>
                  <GridItem xs={12} sm={12} md={7}>
                    <CustomInput
                      labelText="Fullname"
                      id="fullname"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        value: adminProfile.fullname,
                        name: "fullname",
                        onChange: this.handleChange,
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={5}>
                    <CustomInput
                      labelText="Phone Number"
                      id="phone"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        value: adminProfile.phone,
                        name: "phone",
                        onChange: this.handleChange,
                      }}
                    />
                  </GridItem>
                  <Hidden xsUp={Validator.propertyExist(profile, "username") && profile.username !== ""}>
                    <GridItem xs={12} sm={12} md={5}>
                      <CustomInput
                        labelText="Username"
                        id="username"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          value: adminProfile.username,
                          name: "username",
                          onChange: this.handleChange,
                        }}
                      />
                    </GridItem>
                  </Hidden>
                  <Hidden xsUp={Validator.propertyExist(profile, "username") && profile.username !== ""}>
                    <GridItem xs={12} sm={12} md={7}>
                      <CustomInput
                        labelText="Email"
                        id="email"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          value: adminProfile.email,
                          name: "email",
                          onChange: this.handleChange,
                        }}
                      />
                    </GridItem>
                  </Hidden>
                  <GridItem xs={12} sm={12}>
                    <CustomInput
                      labelText="Address"
                      id="address"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        value: adminProfile.address,
                        name: "address",
                        onChange: this.handleChange,
                      }}
                    />
                  </GridItem>
                </Grid>
              </CardBody>
              <CardFooter>
                <Button color="primary" onClick={this.updateAdminProfile}>
                  Update Profile
                </Button>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card>
              <CardBody>
                <h4 className={classes.cardTitle}>
                  {adminProfile.fullname}
                </h4>
                <h4 className={classes.cardTitle}>
                  {profile.usename}
                </h4>
                <h4 className={classes.cardTitle}>
                  {profile.username}
                </h4>
              </CardBody>
            </Card>
          </GridItem>
          {/**
          <GridItem xs={12} sm={12} md={8}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Manage Password</h4>
                <p className={classes.cardCategoryWhite}>Update Your Password</p>
              </CardHeader>
              <CardBody>
                <Grid container>
                  <GridItem >
                    <CustomInput
                      labelText="Current Password"
                      id="password"
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>
                  <GridItem>
                    <CustomInput
                      labelText="New Password"
                      id="password_new"
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Confirm New Password"
                      id="email-address"
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>
                </Grid>
              </CardBody>
              <CardFooter>
                <Button color="primary">Update Password</Button>
              </CardFooter>
            </Card>
          </GridItem>
          */}
        </Grid>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={snackBarOpen}
          onClose={this.onCloseHandler}
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
export default AdminProfile;
