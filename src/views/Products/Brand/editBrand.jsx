import React from "react";
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";
import "react-select/dist/react-select.css";
import isEqual from "lodash/isEqual";


import Snackbar from "@material-ui/core/Snackbar";
import GridItem from "../../../components/Grid/GridItem";
import Card from "../../../components/Card/Card";
import CardBody from "../../../components/Card/CardBody";
import CardHeader from "../../../components/Card/CardHeader";
import CardFooter from "../../../components/Card/CardFooter";
import CustomInput from "../../../components/CustomInput/CustomInput";
import validator from "../../../helpers/validator";
import BezopSnackBar from "../../../assets/jss/bezop-mkr/BezopSnackBar";
import Button from "../../../components/CustomButtons/Button";

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

class EditBrand extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      brandDetails: {
        name: props.eachData.name,
        description: props.eachData.description,
      },
      brandDetailsError: {
        name: false,
        description: false,
        kind: false,
      },
      snackBarOpen: true,
      snackBarMessage: "",
      snackBarOpenSuccess: false,

    };
    this.fileInput = React.createRef();
    this.thumbnail = React.createRef();
  }

  componentWillReceiveProps(newProps) {
    const { productBrand } = this.state;
    if (validator.propertyExist(newProps, "productBrand", "updateBrand")
    && (isEqual(productBrand.updateBrand, newProps.productBrand.updateBrand) === false)) {
      const { onHandleModalClose } = this.props;
      this.setState({
        snackBarOpenSuccess: true,
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

  onCloseHandlerSuccess = () => {
    this.setState({ snackBarOpenSuccess: false });
  }


  // Setting the state every fields that have error
  setBrandDetailsSpecialError(type, value, value1 = null) {
    const { brandDetailsError } = this.state;
    const newBrandDetailsError = JSON.parse(JSON.stringify(brandDetailsError));
    newBrandDetailsError[type] = this.inputErrorValidation(type, value, value1);
    this.setState({
      brandDetailsError: newBrandDetailsError,
    });
  }

  // Check the imput Error
  inputErrorValidation = (type, value, value2 = null) => {
    let output = false;
    switch (type) {
      case "name":
        output = validator.minStrLen(value, 2);
        break;
      case "description":
        output = validator.minStrLen(value, 15);
        break;
      default:
        output = false;
        break;
    }
    return output;
  }

  // Get the value of Input Element
  handleChange = (event) => {
    this.setBrandDetails(event.target.name, event.target.value);
  };

  // Create new Brand
  updateBrand = () => {
    const { specialMethod, eachData } = this.props;
    const { brandDetails } = this.state;
    specialMethod(brandDetails, eachData.id);
  }

  render() {
    const { classes } = this.props;
    const {
      brandDetails,
      brandDetailsError,
      snackBarOpen,
      snackBarMessage,
      snackBarOpenSuccess,
    } = this.state;

    return (
      <div>

        <Card>
          <CardHeader color="info">
            <div>
              <h4>
Edit Product Brand
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
                  labelText={brandDetailsError.name === false ? "Brand Name" : "The length of Brand must not be less than 2 characters"}
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
                    value: brandDetails.description,
                    onChange: this.handleChange,
                  }}
                />
              </GridItem>

            </Grid>
          </CardBody>
          <CardFooter>
            <Grid container>
              <GridItem xs={12}>
                <Button variant="contained" color="primary" component="span" className={classes.fluidButton} onClick={this.updateBrand}>
                          Update Product Brand
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
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={snackBarOpenSuccess}
          onClose={this.onCloseHandlerSuccess}
        >
          <BezopSnackBar
            onClose={this.onCloseHandlerSuccess}
            variant="success"
            message="You have successfully updated product brand"
          />
        </Snackbar>
      </div>
    );
  }
}

export default withStyles(styles)(EditBrand);
