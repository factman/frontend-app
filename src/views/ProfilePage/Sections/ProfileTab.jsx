import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Paper from "@material-ui/core/Paper";
import Countries from "country-list";
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import CustomInput from "../../../components/CustomInput/CustomInput";
import Button from "../../../components/CustomButtons/Button";
import { validateFullName } from "../../../components/Auth/DataValidation";
import { ProfileObject } from "../../../helpers/customerOperations";

function TabContainer(props) {
  const { children } = props;
  return (
    <div style={{ padding: 8 * 3 }}>
      {children}
    </div>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});

class ScrollableTabsButtonAuto extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      profileData: props.profile,
      loader: false,
      reset: {
        password: "",
        valid: true,
        confirm_password: "",
        match: true,
      },
    };
  }

  componentWillReceiveProps(newProps) {
    this.setState({ profileData: newProps.profile });
  }

  setValue = (event) => {
    const field = event.target.id;
    const { target } = event;
    const { reset } = this.state;

    switch (field) {
      case "password":
        reset.password = target.value;
        reset.valid = validateFullName(reset.password);
        this.setState({ reset });
        break;
      default:
        reset.confirm_password = target.value;
        reset.match = reset.password === reset.confirm_password;
        this.setState({ reset });
    }
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  validateForm = () => {
    const { reset } = this.state;
    if ((reset.valid === true) && (reset.match === true) && (reset.confirm_password !== "") && (reset.password !== "")) {
      return true;
    }
    return false;
  };

  updateProfile = () => {
    this.setState({ loader: true });
    const { profileData } = this.state;
    const { handleUpdate } = this.props;
    handleUpdate(profileData);
  };

  resetPassword = () => {
    if (!this.validateForm()) {
      console.log("invalid form");
    } else {
      this.setState({ loader: true });
      const { reset: { password, confirm_password }, reset } = this.state;
      ProfileObject.passwordReset({ password, confirm_password })
        .then((res) => {
          if (res) {
            window.location.reload();
          } else {
            reset.valid = false;
            reset.match = false;
            this.setState({ reset, loader: false });
          }
        });
    }
  };

  render() {
    const { classes } = this.props;
    const { value, profileData, loader, reset } = this.state;

    return (
      <div className={classes.root}>
        <Paper>
          <Tabs
            value={value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            scrollable
            fullWidth
            scrollButtons="auto"
          >
            <Tab label="profile" />
            <Tab label="Shipment" />
            <Tab label="Reset Password" />
          </Tabs>
        </Paper>
        {value === 0 && (
        <TabContainer>
          <form>
            <Typography variant="headline" align="left">
                profile&nbsp;Information
            </Typography>
            <GridContainer>
              <GridItem md={8}>
                <CustomInput
                  labelText="Full Name"
                  id="name"
                  inputProps={{
                    value: profileData.fullname || "",
                  }}
                  formControlProps={{
                    fullWidth: true,
                    onChange: (event) => {
                      profileData.fullname = event.target.value;
                      this.setState({ profileData });
                    },
                  }}
                />
              </GridItem>
              <GridItem md={4}>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="gender">
                    Gender
                  </InputLabel>
                  <Select
                    value={profileData.gender || ""}
                    onChange={(event) => {
                      profileData.gender = event.target.value;
                      this.setState({ profileData });
                    }}
                    placeholder="Gender"
                    inputProps={{
                      name: "gender",
                      id: "gender",
                    }}
                  >
                    <MenuItem value="male">
                      Male
                    </MenuItem>
                    <MenuItem value="female">
                      Female
                    </MenuItem>
                  </Select>
                </FormControl>
              </GridItem>
              <GridItem md={12}>
                <CustomInput
                  labelText="Email Address"
                  id="email"
                  inputProps={{
                    value: profileData.email || "",
                  }}
                  formControlProps={{
                    fullWidth: true,
                    onChange: (event) => {
                      profileData.email = event.target.value;
                      this.setState({ profileData });
                    },
                  }}
                />
              </GridItem>
              <GridItem md={12}>
                <CustomInput
                  labelText="Phone Number"
                  id="tel"
                  inputProps={{
                    value: profileData.phone || "",
                  }}
                  formControlProps={{
                    fullWidth: true,
                    onChange: (event) => {
                      profileData.phone = event.target.value;
                      this.setState({ profileData });
                    },
                  }}
                />
              </GridItem>
              <GridItem md={12}>
                <CustomInput
                  labelText="Username"
                  id="username"
                  inputProps={{
                    value: profileData.username || "",
                  }}
                  formControlProps={{
                    fullWidth: true,
                    onChange: (event) => {
                      profileData.username = event.target.value;
                      this.setState({ profileData });
                    },
                  }}
                />
              </GridItem>
              <GridItem md={12}>
                <CustomInput
                  labelText="BTC Address"
                  id="btcAddress"
                  inputProps={{
                    value: profileData.btcAddress || "",
                  }}
                  formControlProps={{
                    fullWidth: true,
                    onChange: (event) => {
                      profileData.btcAddress = event.target.value;
                      this.setState({ profileData });
                    },
                  }}
                />
              </GridItem>
              <GridContainer justify="center">
                <GridItem
                  xs={10}
                  className={classes.textCenter}
                >
                  <Button
                    color="primary"
                    onClick={this.updateProfile}
                  >
                    {loader ? "Loading..." : "Update"}
                  </Button>
                </GridItem>
              </GridContainer>
            </GridContainer>
          </form>
        </TabContainer>
        )}
        {value === 1 && (
        <TabContainer>
          <form>
            <Typography variant="headline" align="left">
              Shipment&nbsp;Information
            </Typography>
            <GridContainer>
              <GridItem md={6}>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="country">
                    Country
                  </InputLabel>
                  <Select
                    value={profileData.shipping.country || ""}
                    onChange={(event) => {
                      profileData.shipping.country = event.target.value;
                      this.setState({ profileData });
                    }}
                    placeholder="Country"
                    inputProps={{
                      name: "country",
                      id: "country",
                    }}
                  >
                    <MenuItem value="">
                      <em>
                        None
                      </em>
                    </MenuItem>
                    {Countries().getData().map(item => (
                      <MenuItem key={item.code} value={item.name}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </GridItem>
              <GridItem md={6}>
                <CustomInput
                  labelText="State"
                  id="state"
                  inputProps={{
                    value: profileData.shipping.state || "",
                  }}
                  formControlProps={{
                    fullWidth: true,
                    onChange: (event) => {
                      profileData.shipping.state = event.target.value;
                      this.setState({ profileData });
                    },
                  }}
                />
              </GridItem>
              <GridItem md={6}>
                <CustomInput
                  labelText="City"
                  id="city"
                  inputProps={{
                    value: profileData.shipping.city || "",
                  }}
                  formControlProps={{
                    fullWidth: true,
                    onChange: (event) => {
                      profileData.shipping.city = event.target.value;
                      this.setState({ profileData });
                    },
                  }}
                />
              </GridItem>
              <GridItem md={6}>
                <CustomInput
                  labelText="Street"
                  id="street"
                  inputProps={{
                    value: profileData.shipping.street || "",
                  }}
                  formControlProps={{
                    fullWidth: true,
                    onChange: (event) => {
                      profileData.shipping.street = event.target.value;
                      this.setState({ profileData });
                    },
                  }}
                />
              </GridItem>
              <GridItem md={6}>
                <CustomInput
                  labelText="Building"
                  id="building"
                  inputProps={{
                    value: profileData.shipping.building || "",
                  }}
                  formControlProps={{
                    fullWidth: true,
                    onChange: (event) => {
                      profileData.shipping.building = event.target.value;
                      this.setState({ profileData });
                    },
                  }}
                />
              </GridItem>
              <GridItem md={6}>
                <CustomInput
                  labelText="Zip Code"
                  id="zip"
                  inputProps={{
                    value: profileData.shipping.zip || "",
                  }}
                  formControlProps={{
                    fullWidth: true,
                    onChange: (event) => {
                      profileData.shipping.zip = event.target.value;
                      this.setState({ profileData });
                    },
                  }}
                />
              </GridItem>
              <GridContainer justify="center">
                <GridItem
                  xs={10}
                  className={classes.textCenter}
                >
                  <Button
                    color="primary"
                    onClick={this.updateProfile}
                  >
                    {loader ? "Loading..." : "Update"}
                  </Button>
                </GridItem>
              </GridContainer>
            </GridContainer>
          </form>
        </TabContainer>
        )}
        {value === 2 && (
        <TabContainer>
          <form>
            <Typography variant="headline" align="left">
              Reset Password
            </Typography>
            <GridContainer>
              <GridItem md={12}>
                <CustomInput
                  labelText="Password"
                  id="password"
                  color="primary"
                  error={!reset.valid}
                  formControlProps={{
                    fullWidth: true,
                    onChange: event => this.setValue(event),
                    required: true,
                  }}
                  inputProps={{
                    type: "password",
                    style: {
                      boxSizing: "content-box",
                      marginTop: "20px",
                    },
                  }}
                />
                <CustomInput
                  labelText="Confirm Password"
                  id="confirm_password"
                  color="primary"
                  error={!reset.match}
                  formControlProps={{
                    fullWidth: true,
                    onChange: event => this.setValue(event),
                    required: true,
                  }}
                  inputProps={{
                    type: "password",
                    style: {
                      boxSizing: "content-box",
                      marginTop: "20px",
                    },
                  }}
                />
              </GridItem>
              <GridContainer justify="center">
                <GridItem
                  xs={10}
                  className={classes.textCenter}
                >
                  <Button color="primary" onClick={this.resetPassword}>
                    {loader ? "Loading..." : "Reset Password"}
                  </Button>
                </GridItem>
              </GridContainer>
            </GridContainer>
          </form>
        </TabContainer>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(ScrollableTabsButtonAuto);
