import React from "react";
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";
import isEqual from "lodash/isEqual";
import "react-select/dist/react-select.css";
import Snackbar from "@material-ui/core/Snackbar";

import GridItem from "../../../components/Grid/GridItem";
import Card from "../../../components/Card/Card";
import CardBody from "../../../components/Card/CardBody";
import CardHeader from "../../../components/Card/CardHeader";
import CardFooter from "../../../components/Card/CardFooter";
import CustomInput from "../../../components/CustomInput/CustomInput";
import BezopSnackBar from "../../../assets/jss/bezop-mkr/BezopSnackBar";
import Button from "../../../components/CustomButtons/Button";
import Validator from "../../../helpers/validator";

// The component Style
const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  formControl: {
    margin: theme.spacing.unit,
    width: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
  input: {
    display: "none",
  },
  fluidButton: {
    ...theme.button,
    width: "100%",
  },
});

class AddBrand extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      brandDetails: {
        name: "",
        description: "",
      },
      brandDetailsError: {
        name: false,
        description: false,
      },
      snackBarOpen: true,
      snackBarMessage: "",
      submitButtonDeactive: false,

    };
  }

  componentDidMount() {
    //
  }

  componentWillReceiveProps(newProps) {
    const { productBrand, onHandleModalClose } = this.props;
    if (
      Validator.propertyExist(newProps, "productBrand", "addBrand")
    && (isEqual(productBrand.addBrand, newProps.productBrand.addBrand) === false)) {
      this.setState({
        brandDetails: {
          name: "",
          description: "",
        },
        snackBarOpen: false,
      });
      onHandleModalClose();
    }
  }

  onCloseHandler = () => {
    this.setState({ snackBarOpen: false });
  }

  // Setting the state of all input feilds
  setBrandDetails = (type, value) => {
    const { brandDetails } = this.state;
    const newbrandDetails = JSON.parse(JSON.stringify(brandDetails));
    newbrandDetails[type] = value;
    this.setState({
      brandDetails: newbrandDetails,
    });

    this.setBrandDetailsSpecialError(type, value);
  }


  // Setting the state every fields that have error
  setBrandDetailsSpecialError(type, value) {
    const { brandDetailsError } = this.state;
    const newValue = value === null ? "" : value;
    const newBrandDetailsError = JSON.parse(JSON.stringify(brandDetailsError));
    newBrandDetailsError[type] = this.inputErrorValidation(type, newValue);
    this.setState({
      brandDetailsError: newBrandDetailsError,
    });
    this.changeSubmitButton();
  }

  // Check the imput Error
  inputErrorValidation = (type, value, value2 = null) => {
    let output = false;
    switch (type) {
      case "name":
        output = Validator.minStrLen(value, 3);
        break;
      case "description":
        output = Validator.minStrLen(value, 15);
        break;
      default:
        output = false;
        break;
    }

    return output;
  }

  changeSubmitButton = () => {
    const { brandDetails, brandDetailsError } = this.state;
    const newBrandDetailsError = JSON.parse(JSON.stringify(brandDetailsError));
    const newBrandDetails = JSON.parse(JSON.stringify(brandDetails));
    if (!newBrandDetailsError.name && !newBrandDetailsError.description) {
      if (!Validator.isEmpty(newBrandDetails.name)
      && !Validator.isEmpty(newBrandDetails.description)) {
        this.setState({
          submitButtonDeactive: true,
        });
      } else {
        this.setState({
          submitButtonDeactive: false,
        });
      }
    } else {
      this.setState({
        submitButtonDeactive: false,
      });
    }
  }

  // Get the value of Input Element
  handleChange = (event) => {
    this.setBrandDetails(event.target.name, event.target.value);
  };

  // Create new Brand
  createNewBrand = () => {
    const { brandDetails } = this.state;
    const { addProductBrand } = this.props;
    const newBrandDetails = JSON.parse(JSON.stringify(brandDetails));
    if (!Validator.minStrLen(newBrandDetails.name, 3)
    && !Validator.minStrLen(newBrandDetails.description, 15)) {
      addProductBrand(brandDetails);
    } else {
      this.setState({
        snackBarMessage: "All fields are required",
        snackBarOpen: true,
      });
    }
  }

  render() {
    const { classes } = this.props;
    const {
      brandDetails,
      brandDetailsError,
      snackBarOpen,
      snackBarMessage,
      submitButtonDeactive,
    } = this.state;

    return (
      <div>

        <Card>
          <CardHeader color="primary">
            <div>
              <h4>
Add New Product Brand
              </h4>
            </div>
            <div>
              <p>
Product Brand Details
              </p>
            </div>
          </CardHeader>
          <CardBody>
            <Grid container>
              <GridItem xs={12} sm={12} md={12}>
                <CustomInput
                  labelText={brandDetailsError.name === false ? "Brand Name" : "The length of Brand must not be less than 3 characters"}
                  id="name"
                  error={brandDetailsError.name}
                  inputProps={{
                    value: brandDetails.name,
                    name: "name",
                    onChange: this.handleChange,
                  }}
                  formControlProps={{
                    fullWidth: true,
                    required: true,
                  }}
                />
              </GridItem>
            </Grid>
            <Grid container>
              <GridItem xs={12}>

                <CustomInput
                  error={brandDetailsError.description}
                  labelText={brandDetailsError.description === false ? "Description" : "The length of Brand must not be less than 15 characters"}
                  id="description"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    multiline: true,
                    rows: 5,
                    name: "description",
                    onChange: this.handleChange,
                    value: brandDetails.description,
                  }}
                />
              </GridItem>

            </Grid>
          </CardBody>
          <CardFooter>
            <Grid container>
              <GridItem xs={12}>
                <Button variant="contained" color="primary" component="span" disabled={!submitButtonDeactive} className={classes.fluidButton} onClick={this.createNewBrand}>
                          Create Product Brand
                </Button>
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

export default withStyles(styles)(AddBrand);
