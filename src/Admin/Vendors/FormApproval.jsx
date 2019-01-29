import React from "react";
import classNames from "classnames";
import isEqual from "lodash/isEqual";
import Card from "../../components/Card/Card";
import CardBody from "../../components/Card/CardBody";
import { Grid, FormControl, InputLabel, withStyles, CircularProgress, Snackbar } from "../../../node_modules/@material-ui/core";
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
      selectedApproval: Validator.propertyExist(eachData, "approval")
        ? { value: eachData.approval, label: eachData.approval.replace(/^\w/, c => c.toUpperCase()) } : null,
      selectedApprovalStyle: `react-select-label-${Validator.propertyExist(eachData, "approval") ? "visible" : "hidden"}`,
      loading: false,
      snackBarOpen: false,
      snackBarMessage: "Default Message",
    };
  }

  componentWillReceiveProps(newProps) {
    const { adminVendor } = this.props;
    if (Validator.propertyExist(newProps, "adminVendor", "approvalVendor")
    && !isEqual(adminVendor.approvalVendor, newProps.adminVendor.approvalVendor)) {
      if (typeof newProps.adminVendor.approvalVendor === "string") {
        this.setState({
          snackBarOpen: true,
          snackBarMessage: newProps.adminVendor.approvalVendor,
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

  handleChange = (event) => {
    this.setAdminUserDetails(event.target.name, event.target.value, null);
  };

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
      selectedApproval,
      selectedApprovalStyle,
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
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="selectedApproval" className={selectedApprovalStyle}>
                    Type or Select Vendor Approval
                  </InputLabel>
                  <Select
                    id="selectedApproval"
                    name="selectedApproval"
                    value={selectedApproval}
                    placeholder="Type or Select Admin Approval"
                    onChange={selected => this.onChangeSelect("Approval", selected)}
                    options={["Pending", "Accepted", "Rejected"].map(role => ({ value: role.toLowerCase(), label: role }))
                    }
                  />
                </FormControl>
                {
                    adminVendorDetails.approval === "rejected"
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
                              onChange: this.handleChange,
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
                    onClick={this.handleBeforeSubmit}
                    disabled={loading}
                  >
                    Vendor Payment Approval
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
