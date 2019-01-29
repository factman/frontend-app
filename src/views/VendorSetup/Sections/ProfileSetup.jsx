import React from "react";
import Typography from "@material-ui/core/Typography";
import AccountCircle from "@material-ui/icons/AccountCircle";
import FastForward from "@material-ui/icons/FastForward";
import withStyles from "@material-ui/core/styles/withStyles";
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import CustomInput from "../../../components/CustomInput/CustomInput";
import Button from "../../../components/CustomButtons/Button";
import {
  validateEmail,
  validateFullName,
  validatePhoneNumber,
} from "../../../components/Auth/DataValidation";
import {
  getUsersToken,
  getIdFromToken,
  getUserProfile,
  setUsersAccount,
} from "../../../components/Auth/AccessControl";
import { API_URL } from "../../../components/Auth/UsersAuth";

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  error: {
    margin: "0px",
    marginTop: "-15px",
  },
});

class ProfileSetup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: {
        value: "",
        valid: true,
        success: false,
        error: false,
      },
      email: {
        value: "",
        valid: true,
        success: false,
        error: false,
      },
      phoneNumber: {
        value: "",
        valid: true,
        success: false,
        error: false,
      },
      loading: false,
      emailExist: false,
      profile: getUserProfile("vendor"),
    };
  }

  setValue = (event) => {
    const field = event.target.id;
    const props = {};
    Object.assign(props, this.state[field]);
    let { value, valid, success, error } = props;

    switch (field) {
      case "fullName":
        value = event.target.value;
        valid = validateFullName(value);
        success = !!validateFullName(value);
        error = !validateFullName(value);
        this.setState({ fullName: { value, valid, success, error } });
        break;
      case "email":
        value = event.target.value.toLowerCase();
        valid = validateEmail(value);
        success = !!validateEmail(value);
        error = !validateEmail(value);
        this.setState({ email: { value, valid, success, error } });
        break;
      case "phoneNumber":
        value = event.target.value;
        valid = validatePhoneNumber(value);
        success = !!validatePhoneNumber(value);
        error = !validatePhoneNumber(value);
        this.setState({ phoneNumber: { value, valid, success, error } });
        break;
      default:
    }
  };

  validate = () => {
    const { fullName, email, phoneNumber } = this.state;
    if (fullName.valid === false || fullName.value.length === 0) {
      return false;
    }
    if (email.valid === false || email.value.length === 0) {
      return false;
    }
    if (phoneNumber.valid === false || phoneNumber.value.length === 0) {
      return false;
    }
    return true;
  };

  submit = () => {
    this.setState({ loading: true });
    const isValid = this.validate();
    const { email } = this.state;
    const { accessToken } = getUsersToken("vendor");
    const id = getIdFromToken(accessToken);

    if (isValid) {
      fetch(`${API_URL}/vendors/verify/email/${email.value}/?key=${process.env.REACT_APP_API_KEY}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        method: "GET",
      })
        .then(response => response.json())
        .then((responseJSON) => {
          if (responseJSON.success && !responseJSON.data.exists) {
            this.updateProfile(id, accessToken);
          } else {
            this.setState({ loading: false, emailExist: true });
          }
        })
        .catch((ex) => {
          console.log(ex.message);
          this.setState({ loading: false });
        });
    } else {
      this.setState({ loading: false });
    }
  };

  updateProfile = (id, accessToken) => {
    const { fullName, email, phoneNumber } = this.state;
    const profile = Object.assign({}, getUserProfile("vendor"), {
      fullname: fullName.value,
      phone: phoneNumber.value,
      email: email.value,
      completeProfile: true,
      emailVerified: true,
      domainNameSet: false,
      businessVerified: false,
    });

    fetch(`${API_URL}/vendors/vendor/?key=${process.env.REACT_APP_API_KEY}`, {
      body: JSON.stringify(profile),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      method: "PUT",
    })
      .then(response => response.json())
      .then((responseJSON) => {
        if (responseJSON.success && Object.keys(responseJSON.data).length > 1) {
          setUsersAccount({ user: "vendor", id, accessToken })
            .then(({ accessToken, profile }) => {
              this.setState({ loading: false });
              this.props.nextStep();
            });
        } else {
          console.log(responseJSON);
          this.props.nextStep();
        }
        this.setState({ loading: false });
      });
  };

  render() {
    const { classes } = this.props;
    const { fullName, email, phoneNumber, loading, emailExist } = this.state;

    return (
      <div className={classes.root}>
        <Typography variant="headline" align="center">
          <AccountCircle style={{ marginBottom: "-10px", fontSize: "1.5em" }} />
          {" "}
Profile Information
        </Typography>
        <GridContainer>
          <GridItem sm={12}>
            <CustomInput
              labelText="Full Name"
              id="fullName"
              success={!!fullName.success}
              error={!!fullName.error}
              formControlProps={{
                fullWidth: true,
                onChange: event => this.setValue(event),
                required: true,
              }}
            />
            {(!fullName.valid)
              ? (
                <Typography className={classes.error} color="secondary" variant="caption">
                            * Invalid name supplied.
                </Typography>
              )
              : null
                    }
          </GridItem>
          <GridItem sm={6}>
            <CustomInput
              labelText="Email Address"
              id="email"
              success={!!email.success}
              error={!!email.error}
              formControlProps={{
                fullWidth: true,
                onChange: event => this.setValue(event),
                required: true,
              }}
            />
            {(!email.valid)
              ? (
                <Typography className={classes.error} color="secondary" variant="caption">
                            * Invalid email address.
                </Typography>
              )
              : null
                    }
            {(emailExist)
              ? (
                <Typography className={classes.error} color="secondary" variant="caption">
                            * Email is already used by another vendor.
                </Typography>
              )
              : null
                    }
          </GridItem>
          <GridItem sm={6}>
            <CustomInput
              labelText="Phone Number"
              id="phoneNumber"
              success={!!phoneNumber.success}
              error={!!phoneNumber.error}
              formControlProps={{
                fullWidth: true,
                onChange: event => this.setValue(event),
                required: true,
              }}
            />
            {(!phoneNumber.valid)
              ? (
                <Typography className={classes.error} color="secondary" variant="caption">
                            * Invalid phone number.
                </Typography>
              )
              : null
                    }
          </GridItem>
          <GridItem xs={12}>
            <Button onClick={() => this.submit()} color="primary" disabled={loading}>
              {(loading)
                ? (
                  <span>
Loading...
                    <i className="fas fa-spinner fa-spin">
&nbsp;
                    </i>
                  </span>
                )
                : (
                  <span>
Update Profile&nbsp;
                    <FastForward />
                  </span>
                )
                        }
            </Button>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default withStyles(styles)(ProfileSetup);
