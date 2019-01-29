import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import Icon from "@material-ui/core/Icon";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Business from "@material-ui/icons/Business";
import CameraAlt from "@material-ui/icons/CameraAlt";
import LocationOn from "@material-ui/icons/LocationOn";
import CheckCircle from "@material-ui/icons/CheckCircle";
import DropZone from "react-dropzone";
import countries from "country-list";
import NumberFormat from "react-number-format";
import { isString } from "util";
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import CustomInput from "../../../components/CustomInput/CustomInput";
import Button from "../../../components/CustomButtons/Button";
import { getUsersToken, getIdFromToken, setUsersAccount } from "../../../components/Auth/AccessControl";
import { API_URL } from "../../../components/Auth/UsersAuth";
import { validateLongText, validateDomain, validateShortText, validateZipCode, getZipCode } from "../../../components/Auth/DataValidation";
import { validatioObj } from "../../../helpers/logic";

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
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  logo: {
    width: "200px",
    minHeight: "200px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0px 4px 10px 0px rgba(0,0,0,0.3)",
    overflow: "hidden",
    cursor: "pointer",
    border: "4px solid white",
    padding: "5px",
  },
  select: {
    width: "100%",
    display: "block",
  },
});

class BusinessSetup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      domain: validatioObj("bezop.com"),
      desc: validatioObj("bezop.com"),
      state: validatioObj(),
      businessName: validatioObj(),
      city: validatioObj(),
      street: validatioObj(),
      building: validatioObj(),
      zip: validatioObj(),
      logo: {
        data: "",
        value: "",
        valid: false,
        preview: "",
        error: false,
      },
      country: validatioObj(),
      loading: false,
    };
  }

  onDrop = (files) => {
    const { logo } = this.state;
    const reader = new FileReader();
    try {
      reader.onload = () => {
        const image = new Image();
        image.onload = ({ path: [img] }) => {
          if ((img.naturalWidth === img.naturalHeight) && (img.naturalWidth > 199)) {
            logo.preview = files[0].preview;
            logo.data = reader.result;
            logo.error = false;
            logo.valid = true;
            this.setState({ logo });
          } else {
            logo.preview = "";
            logo.data = "";
            logo.error = true;
            logo.valid = false;
            this.setState({ logo });
          }
        };
        image.src = files[0].preview;
      };

      reader.onabort = () => {
        logo.valid = false;
        logo.preview = "";
        logo.data = "";
        logo.error = true;
        this.setState({ logo });
      };

      reader.onerror = () => {
        logo.preview = "";
        logo.data = "";
        logo.error = true;
        logo.valid = false;
        this.setState({ logo });
      };

      if (files.length > 0) {
        reader.readAsDataURL(files[0]);
      } else {
        logo.data = "";
        logo.error = true;
        logo.preview = "";
        logo.valid = false;
      }
    } catch (ex) {
      console.log(ex.message);
    }
  }

  setValue = (event) => {
    const field = (event.target.id !== undefined) ? event.target.id : event.target.name;

    const props = {};
    Object.assign(props, this.state[field]);
    let { value, valid, success, error } = props;
    const { target } = event;

    switch (field) {
      case "domain":
        value = (`${target.value}.bezop.com`).toLowerCase();
        valid = validateDomain(value);
        success = false;
        error = false;
        this.setState({ domain: { value, valid, success, error } });
        break;
      case "desc":
        value = target.value;
        valid = validateLongText(value);
        success = validateLongText(value);
        error = !validateLongText(value);
        this.setState({ desc: { value, valid, success, error } });
        break;
      case "state":
        value = target.value;
        valid = validateShortText(value);
        success = validateShortText(value);
        error = !validateShortText(value);
        this.setState({ state: { value, valid, success, error } });
        break;
      case "businessName":
        value = target.value;
        valid = validateShortText(value);
        success = validateShortText(value);
        error = !validateShortText(value);
        this.setState({ businessName: { value, valid, success, error } });
        break;
      case "city":
        value = target.value;
        valid = validateShortText(value);
        success = validateShortText(value);
        error = !validateShortText(value);
        this.setState({ city: { value, valid, success, error } });
        break;
      case "street":
        value = target.value;
        valid = validateShortText(value);
        success = validateShortText(value);
        error = !validateShortText(value);
        this.setState({ street: { value, valid, success, error } });
        break;
      case "building":
        value = target.value;
        valid = validateShortText(value);
        success = validateShortText(value);
        error = !validateShortText(value);
        this.setState({ building: { value, valid, success, error } });
        break;
      case "zip":
        value = getZipCode(target.value);
        valid = validateZipCode(value);
        success = validateZipCode(value);
        error = !validateZipCode(value);
        this.setState({ zip: { value, valid, success, error } });
        break;
      case "country":
        if (target.value !== "") {
          value = target.value;
          valid = true;
          success = true;
          error = false;
          this.setState({ country: { value, valid, success, error } });
        } else {
          value = "";
          valid = false;
          success = false;
          error = true;
          this.setState({ country: { value, valid, success, error } });
        }
        break;
      default:
    }
  };

  verifyDomain = () => {
    this.setState({ loading: true });
    let { value, valid, success, error } = this.state.domain;
    const { accessToken } = getUsersToken("vendor");

    if (validateDomain(value)) {
      fetch(`${API_URL}/vendors/verify/domainName/${value}/?key=${process.env.REACT_APP_API_KEY}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        method: "GET",
      })
        .then(response => response.json())
        .then((responseJSON) => {
          if (responseJSON.success && !responseJSON.data.exists) {
            success = true;
            error = false;
            this.setState({ domain: { value, valid, success, error }, loading: false });
          } else {
            success = false;
            error = true;
            this.setState({ domain: { value, valid, success, error }, loading: false });
          }
        })
        .catch((ex) => {
          console.log(ex.message);
          this.setState({ loading: false });
        });
    } else {
      success = false;
      error = true;
      valid = false;
      this.setState({ domain: { value, valid, success, error }, loading: false });
    }
  };

  validate = () => {
    const { desc, domain, state, businessName, building, zip, street, city, country, logo } = this.state;
    if (desc.valid === false || desc.value.length === 0) {
      return false;
    }
    if (domain.valid === false || domain.value.length === 0) {
      return false;
    }
    if (state.valid === false || state.value.length === 0) {
      return false;
    }
    if (businessName.valid === false || businessName.value.length === 0) {
      return false;
    }
    if (building.valid === false || building.value.length === 0) {
      return false;
    }
    if (zip.valid === false || zip.value.length === 0) {
      return false;
    }
    if (street.valid === false || street.value.length === 0) {
      return false;
    }
    if (city.valid === false || city.value.length === 0) {
      return false;
    }
    if (country.valid === false || country.value.length === 0) {
      return false;
    }
    if (logo.valid === false || logo.data.length === 0) {
      return false;
    }
    return true;
  };

  submit = () => {
    this.setState({ loading: true });
    const isValid = this.validate();
    const { accessToken } = getUsersToken("vendor");
    const id = getIdFromToken(accessToken);

    if (isValid) {
      this.uploadLogo(id, accessToken)
        .then((result) => {
          if (!isString(result)) {
            this.updateProfile(id, accessToken, result);
          } else {
            console.log(result);
            this.setState({ loading: false });
          }
        });
    } else {
      this.setState({ loading: false });
    }
  };

  updateProfile = (id, accessToken, result) => {
    const { desc, domain, state, businessName, building, zip, street, city, country } = this.state;
    const profile = Object.assign({}, result, {
      domainName: domain.value.replace(".bezop.com", ""),
      businessName: businessName.value,
      standing: "active",
      address: {
        country: country.value,
        state: state.value,
        city: city.value,
        street: street.value,
        building: building.value,
        zip: Number(zip.value),
      },
      frontend: {
        description: desc.value,
      },
      completeProfile: true,
      emailVerified: true,
      domainNameSet: true,
      businessVerified: true,
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

  uploadLogo = (id, accessToken) => fetch(`${API_URL}/media/${id}/?key=${process.env.REACT_APP_API_KEY}`, {
    body: JSON.stringify({
      label: "logo|frontend",
      collection: "vendor",
      src: this.state.logo.data,
    }),
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
        return responseJSON.data;
      }

      throw new Error(responseJSON.message);
    })
    .catch(ex => ex.message);

  render() {
    const { classes } = this.props;
    const { loading, domain, desc, logo, country, state, businessName, city, street, building, zip } = this.state;
    let uploadAction;

    return (
      <div className={classes.root}>
        <Typography variant="headline" align="center">
          <Business style={{ marginBottom: "-10px", fontSize: "1.5em" }} />
          {" "}
Business Information
        </Typography>
        <br />
        <GridContainer>
          <GridItem sm={12} align="center">
            <Typography variant="subheading" style={{ marginBottom: "20px" }} align="center">
              <Icon style={{ marginBottom: "-6px", fontSize: "1.5em" }}>
add_photo_alternate
              </Icon>
                        &nbsp;Upload Your Business Logo Here
            </Typography>
            <DropZone
              ref={(node) => { uploadAction = node; }}
              className={classes.logo}
              onDrop={this.onDrop.bind(this)}
              disableClick
              multiple={false}
              maxSize={1048576}
              activeStyle={{ borderColor: "skyblue" }}
              accept="image/jpeg, image/png, image/jpg"
            >
              {(!logo.valid)
                ? (
                  <div style={{ width: "100%", paddingTop: "50px" }}>
                    <Typography variant="subheading" align="center">
                                    Drag & Drop Here.
                      {" "}
                      <br />
                      {" "}
OR
                      {" "}
                      <br />
                    </Typography>
                    <Button
                      round
                      color="primary"
                      onClick={() => { uploadAction.open(); }}
                    >
                      <CameraAlt />
                      {" "}
Browse
                    </Button>
                  </div>
                )
                : <img src={logo.preview} width="100%" alt="..." onClick={() => { uploadAction.open(); }} />
                        }
            </DropZone>
            {(logo.valid && !logo.error)
              ? (
                <Typography variant="caption" align="center" style={{ marginTop: "10px" }}>
                  Drag & Drop or Click on the image to change the image
                </Typography>
              )
              : null
                    }
            {(!logo.valid && logo.error)
              ? (
                <Typography color="error" variant="caption" align="center" style={{ marginTop: "10px" }}>
                  * Only (jpeg & png) Maximum size 1MB with equal width and height not less than 200px.
                </Typography>
              )
              : null
                    }
          </GridItem>
          <GridItem sm={12}>
            <CustomInput
              labelText="Business Name"
              id="businessName"
              success={!!businessName.success}
              error={!!businessName.error}
              formControlProps={{
                fullWidth: true,
                onBlur: event => this.setValue(event),
                required: true,
              }}
            />
            {(!businessName.valid)
              ? (
                <Typography className={classes.error} color="secondary" variant="caption">
                            * Invalid value.
                </Typography>
              )
              : null
                    }
          </GridItem>
          <GridItem sm={12}>
            <CustomInput
              labelText="Domain Name"
              id="domain"
              success={!!domain.success}
              error={!!domain.error}
              formControlProps={{
                fullWidth: true,
                onChange: event => this.setValue(event),
                onBlur: () => this.verifyDomain(),
                required: true,
              }}
            />
            <Typography color={domain.valid ? "default" : "error"} className={classes.error} variant="body1">
                        Your shop address: https://
              {domain.value}
            </Typography>
          </GridItem>
          <GridItem xs={12}>
            <Button onClick={() => this.verifyDomain()} color="primary" size="sm" disabled={loading}>
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
Verify Name
                  </span>
                )
                        }
            </Button>
          </GridItem>
          <GridItem sm={12}>
            <CustomInput
              labelText="Business Description"
              id="desc"
              success={!!desc.success}
              error={!!desc.error}
              formControlProps={{
                fullWidth: true,
                onBlur: event => this.setValue(event),
                required: true,
              }}
              inputProps={{
                multiline: true,
                rows: 2,
                rowsMax: 4,
              }}
            />
            <Typography color={desc.valid ? "default" : "error"} className={classes.error} variant="caption">
              {(!desc.valid) ? "* Minimum 20 characters." : null}
            </Typography>
          </GridItem>
          <GridItem sm={12}>
            <br />
            <Typography variant="headline" align="center">
              <LocationOn style={{ marginBottom: "-10px", fontSize: "1.5em" }} />
              {" "}
Business Location
            </Typography>
          </GridItem>
          <GridItem sm={6}>
            <TextField
              id="country"
              name="country"
              select
              label="Country"
              error={!!country.error}
              value={country.value}
              onChange={event => this.setValue(event)}
              fullWidth
              helperText="Please select business country"
              margin="normal"
              required
            >
              <MenuItem value="">
Select a country...
              </MenuItem>
              {countries().getData().map(({ name, code }) => (
                <MenuItem key={code} value={name}>
                  {name}
                </MenuItem>
              ))}
            </TextField>
          </GridItem>
          <GridItem sm={6}>
            <NumberFormat
              value={zip.value}
              error={!!zip.error}
              customInput={TextField}
              id="zip"
              name="zip"
              label="Zip Code"
              onValueChange={(value, event) => this.setValue(event)}
              fullWidth
              helperText={(!zip.valid) ? "* Invalid value." : null}
              margin="normal"
              required
              format="###-###"
              mask="_"
            />
          </GridItem>
          <GridItem sm={6}>
            <CustomInput
              labelText="State"
              id="state"
              success={!!state.success}
              error={!!state.error}
              formControlProps={{
                fullWidth: true,
                onBlur: event => this.setValue(event),
                required: true,
              }}
            />
            {(!state.valid)
              ? (
                <Typography className={classes.error} color="secondary" variant="caption">
                            * Invalid value.
                </Typography>
              )
              : null
                    }
          </GridItem>
          <GridItem sm={6}>
            <CustomInput
              labelText="City"
              id="city"
              success={!!city.success}
              error={!!city.error}
              formControlProps={{
                fullWidth: true,
                onBlur: event => this.setValue(event),
                required: true,
              }}
            />
            {(!city.valid)
              ? (
                <Typography className={classes.error} color="secondary" variant="caption">
                            * Invalid value.
                </Typography>
              )
              : null
                    }
          </GridItem>
          <GridItem sm={6}>
            <CustomInput
              labelText="Street"
              id="street"
              success={!!street.success}
              error={!!street.error}
              formControlProps={{
                fullWidth: true,
                onBlur: event => this.setValue(event),
                required: true,
              }}
            />
            {(!street.valid)
              ? (
                <Typography className={classes.error} color="secondary" variant="caption">
                            * Invalid value.
                </Typography>
              )
              : null
                    }
          </GridItem>
          <GridItem sm={6}>
            <CustomInput
              labelText="Building"
              id="building"
              success={!!building.success}
              error={!!building.error}
              formControlProps={{
                fullWidth: true,
                onBlur: event => this.setValue(event),
                required: true,
              }}
            />
            {(!building.valid)
              ? (
                <Typography className={classes.error} color="secondary" variant="caption">
                            * Invalid value.
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
Complete Setup&nbsp;
                    <CheckCircle />
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

export default withStyles(styles)(BusinessSetup);
