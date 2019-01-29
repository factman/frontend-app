import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import Snackbar from "@material-ui/core/Snackbar";
import Grid from "@material-ui/core/Grid";
import Select2 from "react-select";
import classNames from "classnames";
import isEqual from "lodash/isEqual";
// material-ui components
import GridItem from "../../components/Grid/GridItem";
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardBody from "../../components/Card/CardBody";
import BezopSnackBar from "../../assets/jss/bezop-mkr/BezopSnackBar";
import CardFooter from "../../components/Card/CardFooter";
import "react-select/dist/react-select.css";
// core components
import Button from "../../components/CustomButtons/Button";
import CustomInput from "../../components/CustomInput/CustomInput";
import Validator from "../../helpers/validator";
import { CircularProgress, withStyles, FormControl } from "../../../node_modules/@material-ui/core";

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

class AddCurrency extends React.Component {
  constructor(props) {
    super(props);
    const { currencyDetails } = this.props;
    this.state = {
      storeCurrency: currencyDetails,
      selectedKind: currencyDetails.kind === "" ? null : { value: currencyDetails.kind, label: currencyDetails.kind.replace(/^\w/, c => c.toUpperCase()) },
      selectedKindStyle: `react-select-label-${currencyDetails.kind === "" ? "hidden" : "visible"}`,
      selectedStanding: currencyDetails.standing === "" ? null : { value: currencyDetails.standing, label: currencyDetails.standing.replace(/^\w/, c => c.toUpperCase()) },
      selectedStandingStyle: `react-select-label-${currencyDetails.standing === "" ? "hidden" : "visible"}`,
      snackBarOpen: false,
      snackBarMessage: "",
      loading: false,
    };
  }

  componentWillReceiveProps(newProps) {
    const { adminCurrency } = this.props;
    if (Validator.propertyExist(newProps, "adminCurrency", "addCurrency") && !isEqual(adminCurrency.addCurrency, newProps.adminCurrency.addCurrency)) {
      if (typeof newProps.adminCurrency.addCurrency === "string") {
        this.setState({
          snackBarMessage: newProps.adminCurrency.addCurrency,
          snackBarOpen: true,
          loading: false,
        });
        return false;
      }
      const { onHandleModalClose, currencyDetails } = this.props;
      this.setState({
        storeCurrency: currencyDetails,
        selectedKind: null,
      });
      onHandleModalClose();
    }

    if (Validator.propertyExist(newProps, "adminCurrency", "updateCurrency") && !isEqual(adminCurrency.updateCurrency, newProps.adminCurrency.updateCurrency)) {
      if (typeof newProps.adminCurrency.updateCurrency === "string") {
        this.setState({
          snackBarMessage: newProps.adminCurrency.updateCurrency,
          snackBarOpen: true,
          loading: false,
        });
        return false;
      }
      const { onHandleModalClose } = this.props;
      this.setState({
        loading: false,
      });
      onHandleModalClose();
    }
    return false;
  }

  onCloseHandler = () => {
    this.setState({ snackBarOpen: false });
  }

  onCloseHandler = () => {
    this.setState({ snackBarOpen: false });
  }

  onChangeSelect = (type, selected) => {
    this.setState({
      [`selected${type}`]: selected,
      [`selected${type}Style`]: `react-select-label-${selected === null ? "hidden" : "visible"}`,
    });
    const value = selected !== null ? selected.value : "";
    this.setStoreCurrency(type.toLowerCase(), value);
  }

  // Setting the state of all input feilds
  setStoreCurrency = (type, value) => {
    const { storeCurrency } = this.state;
    const newstoreCurrency = JSON.parse(JSON.stringify(storeCurrency));
    newstoreCurrency[type] = value;
    this.setState({
      storeCurrency: newstoreCurrency,
    });
  }

  // Create new Currency
  createNewCurrency = () => {
    const { addStoreCurrency } = this.props;
    const { storeCurrency } = this.state;
    this.setState({
      loading: true,
    });
    addStoreCurrency(storeCurrency);
  }

  // Update Currency
  handleUpdateCurrency = () => {
    const { putStoreCurrency, eachData } = this.props;
    const { storeCurrency } = this.state;
    this.setState({
      loading: true,
    });
    putStoreCurrency(storeCurrency, eachData.id);
  }

  handleChange = (event) => {
    this.setStoreCurrency(event.target.name, event.target.value);
  };

  render() {
    const {
      storeCurrency,
      selectedKindStyle,
      selectedKind,
      selectedStandingStyle,
      selectedStanding,
      snackBarOpen,
      snackBarMessage,
      loading,
    } = this.state;
    const {
      classes,
      type,
    } = this.props;
    let submitButton;
    let header;
    let subheader;
    switch (type) {
      case "add":
        submitButton = (
          <Button
            color="primary"
            className={classes.fullWidth}
            onClick={this.createNewCurrency}
            disabled={loading}
          >
            Create Currency
          </Button>
        );
        header = "Add New Currency";
        subheader = "All Currencies";
        break;
      case "edit":
        submitButton = (
          <Button
            color="primary"
            className={classes.fullWidth}
            onClick={this.handleUpdateCurrency}
            disabled={loading}
          >
            Update Currency
          </Button>
        );
        header = "Edit Currency";
        subheader = `${storeCurrency.name} Currency`;
        break;
      default:
        return false;
    }
    return (
      <div>
        <Card>
          <CardHeader color="primary">
            <div>
              <h4>
                {header}
              </h4>
            </div>
            <div>
              <p>
                {subheader}
              </p>
            </div>
          </CardHeader>
          <CardBody>
            <Grid container>
              <GridItem xs={12} sm={12} md={type === "edit" ? 4 : 6}>
                <CustomInput
                  labelText="Currency Name"
                  id="name"
                  inputProps={{
                    value: storeCurrency.name,
                    name: "name",
                    onChange: this.handleChange,
                  }}
                  formControlProps={{
                    fullWidth: true,
                    required: true,
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={type === "edit" ? 4 : 6}>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="selectedKind" className={selectedKindStyle}>
                    Type or Select Currency Kind
                  </InputLabel>
                  <Select2
                    id="selectedKind"
                    name="selectedKind"
                    value={selectedKind}
                    placeholder="Type or Select Currency Kind"
                    onChange={selected => this.onChangeSelect("Kind", selected)}
                    options={[
                      { value: "fiat", label: "Fiat" },
                      { value: "digital", label: "Digital" },
                    ]}
                  />
                </FormControl>
              </GridItem>
              { type === "edit" ? (
                <GridItem xs={12} sm={12} md={4}>
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="selectedStanding" className={selectedStandingStyle}>
                      Type or Select Currency Standing
                    </InputLabel>
                    <Select2
                      id="selectedStanding"
                      name="selectedStanding"
                      value={selectedStanding}
                      placeholder="Type or Select Currency Standing"
                      onChange={selected => this.onChangeSelect("Standing", selected)}
                      options={[
                        { value: "active", label: "Active" },
                        { value: "inactive", label: "Inactive" },
                        { value: "trashed", label: "Trashed" },
                      ]}
                    />
                  </FormControl>
                </GridItem>
              ) : null
              }
              <GridItem xs={12} sm={12} md={4}>
                <CustomInput
                  labelText="Currency Code"
                  id="code"
                  inputProps={{
                    name: "code",
                    onChange: this.handleChange,
                    value: storeCurrency.code,
                  }}
                  formControlProps={{
                    fullWidth: true,
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={4}>
                <CustomInput
                  labelText="Currency Symbol"
                  id="symbol"
                  inputProps={{
                    name: "symbol",
                    onChange: this.handleChange,
                    value: storeCurrency.symbol,
                  }}
                  formControlProps={{
                    fullWidth: true,
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={4}>
                <CustomInput
                  labelText="Exchange"
                  id="exchange"
                  inputProps={{
                    name: "exchange",
                    onChange: this.handleChange,
                    type: "number",
                    value: storeCurrency.exchange,
                  }}
                  formControlProps={{
                    fullWidth: true,
                  }}
                />
              </GridItem>
              <GridItem xs={12}>
                <CustomInput
                  labelText="Description"
                  id="description"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    name: "description",
                    onChange: this.handleChange,
                    value: storeCurrency.description,
                    multiline: true,
                    rows: 3,
                  }}
                />
              </GridItem>
            </Grid>
          </CardBody>
          <CardFooter>
            <Grid container>
              <GridItem xs={12}>
                <div className={classes.wrapper}>
                  {submitButton}
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
          </CardFooter>
        </Card>
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
      </div>
    );
  }
}
export default withStyles(styles)(AddCurrency);
