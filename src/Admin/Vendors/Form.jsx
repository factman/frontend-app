import React from "react";
import classNames from "classnames";
import isEqual from "lodash/isEqual";
import Card from "../../components/Card/Card";
import CardBody from "../../components/Card/CardBody";
import { Grid, FormControl, InputLabel, withStyles, CircularProgress, Snackbar, GridList, GridListTile, FormControlLabel, Switch } from "../../../node_modules/@material-ui/core";
import GridItem from "../../components/Grid/GridItem";
import Button from "../../components/CustomButtons/Button";
import AdminView from "../../bezopComponents/Common/VendorInfo";
import Select from "../../../node_modules/react-select/lib/Select";
import Validator from "../../helpers/validator";
import CardHeader from "../../components/Card/CardHeader";
import BezopSnackBar from "../../assets/jss/bezop-mkr/BezopSnackBar";
import CustomInput from "../../components/CustomInput/CustomInput";


const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    width: "100%",
  },
  fullWidth: {
    width: "100%",
    fontSize: "20px",
  },
  wrapper: {
    margin: theme.spacing.unit,
    position: "relative",
  },
  buttonProgress: {
    position: "absolute",
    marginTop: -12,
    marginLeft: -12,
    color: "#ffffff",
  },
  loadingPosition: {
    top: "50%",
    left: "90%",
  },
});


class AdminUserForm extends React.Component {
  constructor(props) {
    super(props);
    const { eachData } = this.props;
    this.state = {
      adminVendorDetails: eachData,
      selectedStanding: Validator.propertyExist(eachData, "standing")
        ? { value: eachData.standing, label: eachData.standing.replace(/^\w/, c => c.toUpperCase()) } : null,
      selectedStandingStyle: `react-select-label-${Validator.propertyExist(eachData, "standing") ? "visible" : "hidden"}`,
      selectedAction: Validator.propertyExist(eachData, "action")
        ? { value: eachData.action, label: eachData.action.replace(/^\w/, c => c.toUpperCase()) } : null,
      selectedActionStyle: `react-select-label-${Validator.propertyExist(eachData, "action") ? "visible" : "hidden"}`,
      loading: false,
      snackBarOpen: false,
      snackBarMessage: "Default Message",
    };
  }

  componentWillReceiveProps(newProps) {
    const { adminVendor } = this.props;
    if (Validator.propertyExist(newProps, "adminVendor", "patchVendor")
    && !isEqual(adminVendor.patchVendor, newProps.adminVendor.patchVendor)) {
      if (typeof newProps.adminVendor.patchVendor === "string") {
        this.setState({
          snackBarOpen: true,
          snackBarMessage: newProps.adminVendor.patchVendor,
          loading: false,
        });
        return false;
      }
      this.setState({
        loading: false,
      });
      const { closeParentModal } = this.props;
      closeParentModal();
    }
    return false;
  }

  onChangeSelect = (type, selected, parent = null) => {
    this.setState({
      [`selected${type}`]: selected,
      [`selected${type}Style`]: `react-select-label-${selected === null ? "hidden" : "visible"}`,
    });
    const value = selected !== null ? selected.value : "";
    this.setAdminUserDetails(type.toLowerCase(), value, parent);
  }

  onCloseHandler = () => {
    this.setState({
      snackBarOpen: false,
    });
  }

  setAdminUserDetails = (type, value, parent) => {
    const { adminVendorDetails } = this.state;
    const newAdminVendorDetails = JSON.parse(JSON.stringify(adminVendorDetails));
    if (parent === null) {
      newAdminVendorDetails[type] = value;
    } else {
      newAdminVendorDetails[parent][type] = value;
    }

    this.setState({
      adminVendorDetails: newAdminVendorDetails,
    });
  }

  handleBeforeSubmit = () => {
    const { adminVendorDetails } = this.state;
    const newadminVendorDetails = JSON.parse(JSON.stringify(adminVendorDetails));
    newadminVendorDetails.comment = newadminVendorDetails.approval !== "rejected"
      ? "" : adminVendorDetails.comment;
    if (newadminVendorDetails.approval === "rejected" && newadminVendorDetails.comment.length < 4) {
      this.setState({
        snackBarOpen: true,
        snackBarMessage: "Why was the product rejected",
      });
    } else {
      this.setState({
        loading: true,
      });
      this.handVendorStatus();
    }
  }

  handleChange = name => (event) => {
    this.setAdminUserDetails(name, event.target.value);
  }

  handVendorStatus = () => {
    const { patchVendor } = this.props;
    const { adminVendorDetails } = this.state;
    this.setState({
      loading: true,
    });
    patchVendor(adminVendorDetails, adminVendorDetails.id);
  }

  render() {
    const { classes } = this.props;
    const {
      adminVendorDetails,
      selectedAction,
      selectedActionStyle,
      selectedStanding,
      selectedStandingStyle,
      loading,
      snackBarOpen,
      snackBarMessage,
    } = this.state;
    console.log(adminVendorDetails);
    return (
      <div>
        <Card>
          <CardHeader color="primary">
            <h4>
              View Vendor
            </h4>
            <p>
              Change Vendor Status
            </p>
          </CardHeader>
          <CardBody>
            <Grid container>
              <GridItem xs={12} sm={12} md={6}>
                <AdminView
                  eachData={adminVendorDetails}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <GridList
                  cols={2}
                  cellHeight="auto"
                >
                  <GridListTile cols={1}>
                    <FormControlLabel
                      control={(
                        <Switch
                          checked={adminVendorDetails.businessVerified}
                          onChange={this.handleChange("businessVerified")}
                          value="businessVerified"
                          color="primary"
                        />
                      )}
                      label={`Business ${adminVendorDetails.businessVerified === true ? "Verified" : "Unverified"}`}
                    />
                  </GridListTile>
                </GridList>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="selectedAction" className={selectedActionStyle}>
                    Type or Select Vendor Action
                  </InputLabel>
                  <Select
                    id="selectedAction"
                    name="selectedAction"
                    value={selectedAction}
                    placeholder="Type or Select Admin Action"
                    onChange={selected => this.onChangeSelect("Action", selected)}
                    options={["Allow", "Restrict", "Deny"].map(action => ({ value: action.toLowerCase(), label: action }))
                    }
                  />
                </FormControl>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="selectedStanding" className={selectedStandingStyle}>
                   Type or Select Vendor Standing
                  </InputLabel>
                  <Select
                    id="selectedStanding"
                    name="selectedStanding"
                    value={selectedStanding}
                    placeholder="Type or Select Admin Standing"
                    onChange={selected => this.onChangeSelect("Standing", selected)}
                    options={["Active", "Inactive", "Trashed"].map(standing => ({ value: standing.toLowerCase(), label: standing }))
                    }
                  />
                </FormControl>
                {
                    adminVendorDetails.action === "deny"
                      || adminVendorDetails.standing === "inactive"
                      ? (
                        <FormControl className={classes.formControl}>
                          <CustomInput
                            labelText="Comment"
                            id="comment"
                            formControlProps={{
                              fullWidth: true,
                              required: true,
                            }}
                            inputProps={{
                              value: adminVendorDetails.comment,
                              name: "comment",
                              onChange: this.handleChange("comment"),
                              multiline: true,
                              rows: 3,
                            }}
                          />
                        </FormControl>
                      ) : null
                }
                <div className={classes.wrapper}>
                  <Button
                    color="primary"
                    className={classes.fullWidth}
                    onClick={this.handVendorStatus}
                    disabled={loading}
                  >
                    Update Vendor Approval
                  </Button>
                  {loading && (
                  <CircularProgress
                    size={24}
                    className={
                       classNames({
                         [classes.buttonProgress]: true,
                         [classes.loadingPosition]: true,
                       })}
                  />)}
                </div>
              </GridItem>
            </Grid>
          </CardBody>
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={snackBarOpen}
            onClose={this.onCloseHandler}
          >
            <BezopSnackBar
              onClose={this.onCloseHandler}
              variant="error"
              message={snackBarMessage}
            />
          </Snackbar>
        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(AdminUserForm);
