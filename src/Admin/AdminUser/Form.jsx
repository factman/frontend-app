import React from "react";
import classNames from "classnames";
import isEqual from "lodash/isEqual";
import Card from "../../components/Card/Card";
import CardBody from "../../components/Card/CardBody";
import { Grid, FormControl, InputLabel, withStyles, CircularProgress, Snackbar } from "../../../node_modules/@material-ui/core";
import GridItem from "../../components/Grid/GridItem";
import Button from "../../components/CustomButtons/Button";
import AdminView from "../../bezopComponents/Common/AdminInfo";
import Select from "../../../node_modules/react-select/lib/Select";
import Validator from "../../helpers/validator";
import CardHeader from "../../components/Card/CardHeader";
import BezopSnackBar from "../../assets/jss/bezop-mkr/BezopSnackBar";


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
      adminUserDetails: eachData,
      selectedRole: Validator.propertyExist(eachData, "role")
        ? { value: eachData.role, label: eachData.role.replace(/^\w/, c => c.toUpperCase()) } : null,
      selectedRoleStyle: `react-select-label-${Validator.propertyExist(eachData, "role") ? "visible" : "hidden"}`,
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
    const { adminUser } = this.props;
    if (Validator.propertyExist(newProps, "adminUser", "patchAdmin") && !isEqual(adminUser.patchAdmin, newProps.adminUser.patchAdmin)) {
      if (typeof newProps.adminUser.patchAdmin === "string") {
        this.setState({
          snackBarOpen: true,
          snackBarMessage: newProps.adminUser.patchAdmin,
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

  onChangeSelect = (type, selected) => {
    this.setState({
      [`selected${type}`]: selected,
      [`selected${type}Style`]: `react-select-label-${selected === null ? "hidden" : "visible"}`,
    });
    const value = selected !== null ? selected.value : "";
    this.setAdminUserDetails(type.toLowerCase(), value);
  }

  onCloseHandler = () => {
    this.setState({
      snackBarOpen: false,
    });
  }

  setAdminUserDetails = (type, value) => {
    const { adminUserDetails } = this.state;
    const newAdminUserDetails = JSON.parse(JSON.stringify(adminUserDetails));
    newAdminUserDetails[type] = value;
    this.setState({
      adminUserDetails: newAdminUserDetails,
    });
  }

  handleUpdateRole = () => {
    const { patchAdmin } = this.props;
    const { adminUserDetails } = this.state;
    this.setState({
      loading: true,
    });
    patchAdmin(adminUserDetails, adminUserDetails.id);
  }

  render() {
    const { classes } = this.props;
    const {
      adminUserDetails,
      selectedRole,
      selectedRoleStyle,
      selectedAction,
      selectedActionStyle,
      selectedStanding,
      selectedStandingStyle,
      loading,
      snackBarOpen,
      snackBarMessage,
    } = this.state;
    return (
      <div>
        <Card>
          <CardHeader color="primary">
            <h4>
              View Admin
            </h4>
            <p>
              Change Admin Role
            </p>
          </CardHeader>
          <CardBody>
            <Grid container>
              <GridItem xs={12} sm={12} md={6}>
                <AdminView
                  eachData={adminUserDetails}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="selectedDiscount" className={selectedRoleStyle}>
                    Type or Select Admin Role
                  </InputLabel>
                  <Select
                    id="selectedDiscount"
                    name="selectedDiscount"
                    value={selectedRole}
                    placeholder="Type or Select Admin Role"
                    onChange={selected => this.onChangeSelect("Role", selected)}
                    options={["Super", "Master", "Support", "Finance", "Technical"].map(role => ({ value: role.toLowerCase(), label: role }))
                    }
                  />
                </FormControl>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="selectedAction" className={selectedActionStyle}>
                    Type or Select Admin Action
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
                   Type or Select Admin Standing
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
                <div className={classes.wrapper}>
                  <Button
                    color="primary"
                    className={classes.fullWidth}
                    onClick={this.handleUpdateRole}
                    disabled={loading}
                  >
                    Update Admin Role
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
