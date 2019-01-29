import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Typography from "@material-ui/core/Typography";
import isEqual from "lodash/isEqual";
import Snackbar from "@material-ui/core/Snackbar";
import AddPage from "./productDetails";
import BusinessDetails from "./businessdetails";

import Button from "../../components/CustomButtons/Button";
import BezopSnackBar from "../../assets/jss/bezop-mkr/BezopSnackBar";
import Validator from "../../helpers/validator";

const styles = theme => ({
  root: {
    width: "90%",
  },
  button: {
    marginRight: theme.spacing.unit,
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
});

const productInformation = {
  name: "",
  code: "",
  upc: "",
  sku: "",
  collections: "",
  category: "",
  brand: "",
  description: {
    color: [],
    unit: "",
    long: "",
    short: "",
    tag: [],
  },
  variety: {
    options: false,
    parent: "",
  },
  price: {
    deal: false,
    valuation: "FIFO",
    costPrice: "",
    unitPrice: "",
    slashPrice: "",
    discount: 0.0,
    discountType: "",
    tax: 0.0,
    taxType: "",
  },
  shippingDetails: {
    cost: 0.0,
    length: "",
    height: "",
    width: "",
    weight: "",
  },
  manufactureDetails: {
    make: "",
    modelNumber: "",
    releaseDate: null,
  },
  download: {
    downloadable: false,
    downloadName: "",
  },
  analytics: {
    featured: false,
  },
  extraFields: [],

};

const selectElementsDropdown = {
  selectedOption: [],
  selectedColors: [],
  selectedBrand: null,
  selectedCategory: null,
  selectedSubCategory: null,
  selectedDiscount: null,
  selectedTax: null,
  selectedValuation: null,
};

const selectStyleDropdown = {
  taxSelect: "react-select-label-hidden",
  discountSelect: "react-select-label-hidden",
  brandSelect: "react-select-label-hidden",
  categorySelect: "react-select-label-hidden",
  subCategorySelect: "react-select-label-hidden",
  tagsSelect: "react-select-label-hidden",
  colorsSelect: "react-select-label-hidden",
  valuationSelect: "react-select-label-hidden",
};

class ProductStepper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      skipped: new Set(),
      productDetails: productInformation,
      selectElements: selectElementsDropdown,
      selectStyle: selectStyleDropdown,
      snackBarVariant: "success",
      snackBarOpenSuccess: false,
      snackBarMessageSuccess: "Alright",
    };
  }

  componentWillReceiveProps(newProps) {
    const { product, onCloseModal } = this.props;
    if (
      Validator.propertyExist(newProps, "modalStatus")
    && !newProps.modalStatus
    ) {
      this.handleReset();
    }

    if (
      Validator.propertyExist(newProps, "addProduct")
      && isEqual(product.addProduct, newProps.product.addProduct) === false) {
      if (typeof newProps.product.addProduct === "string") {
        this.setState({
          snackBarVariant: "error",
          snackBarMessageSuccess: newProps.product.addProduct,
          snackBarOpenSuccess: true,
        });
        return false;
      }
      this.setState({
        productDetails: productInformation,
        selectElements: selectElementsDropdown,
        selectStyle: selectStyleDropdown,
      });
      onCloseModal();
    }
    return false;
  }


  getSteps = () => (["Product Details", "Business Details"]);

  getStepContent(step) {
    const {
      fetchProductBrands,
      fetchProductCategories,
      fetchProductCollections,
      product,
      onCloseModal,
      // collections,
    } = this.props;
    const { productDetails, selectElements, selectStyle } = this.state;
    switch (step) {
      case 0:
        return (
          <AddPage
            fetchProductBrands={fetchProductBrands}
            fetchProductCategories={fetchProductCategories}
            fetchProductCollections={fetchProductCollections}
            product={product}
            // collections={collections}
            productDetails={productDetails}
            setParentProductDetails={this.setParentProductDetails}
            selectElements={selectElements}
            setParentSelectElements={this.setParentSelectElements}
            selectStyle={selectStyle}
            setParentSelectStyle={this.setParentSelectStyle}
          />
        );
      case 1:
        return (
          <BusinessDetails
            product={product}
            productDetails={productDetails}
            setParentProductDetails={this.setParentProductDetails}
            selectElements={selectElements}
            setParentSelectElements={this.setParentSelectElements}
            selectStyle={selectStyle}
            setParentSelectStyle={this.setParentSelectStyle}
            onCloseModal={onCloseModal}
          />
        );
      default:
        return "Unknown step";
    }
  }

  isStepOptional = step => step === 1;

  handleNext = () => {
    const { activeStep } = this.state;
    let { skipped } = this.state;
    if (this.isStepSkipped(activeStep)) {
      skipped = new Set(skipped.values());
      skipped.delete(activeStep);
    }
    this.setState({
      activeStep: activeStep + 1,
      skipped,
    });
  };

  handleBack = () => {
    const { activeStep } = this.state;
    this.setState({
      activeStep: activeStep - 1,
    });
  };

  handleSkip = () => {
    const { activeStep } = this.state;
    if (!this.isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone"s actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    this.setState((state) => {
      const skipped = new Set(state.skipped.values());
      skipped.add(activeStep);
      return {
        activeStep: state.activeStep + 1,
        skipped,
      };
    });
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };

  isStepSkipped = (step) => {
    const { skipped } = this.state;
    return skipped.has(step);
  }

 setParentProductDetails = (productDetails) => {
   this.setState({
     productDetails,
   });
 }

  setParentSelectElements = (type, selectElements) => {
    const newSelectElement = JSON.parse(JSON.stringify(this.state.selectElements));
    newSelectElement[type] = selectElements;
    this.setState({
      selectElements: newSelectElement,
    });
  }

  setParentSelectStyle = (type, selectStyle) => {
    const newSelectStyle = JSON.parse(JSON.stringify(this.state.selectStyle));
    newSelectStyle[type] = selectStyle;
    this.setState({
      selectStyle: newSelectStyle,
    });
  }

  onCloseHandlerSuccess = () => {
    this.setState({
      snackBarOpenSuccess: false,
    });
  }

  createProduct = () => {
    const { postProductDetails } = this.props;
    const { productDetails } = this.state;
    postProductDetails(productDetails);
  }

  render() {
    const { classes } = this.props;
    const steps = this.getSteps();
    const {
      activeStep,
      snackBarMessageSuccess,
      snackBarOpenSuccess,
      snackBarVariant,
    } = this.state;

    return (
      <div className={classes.root}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const props = {};
            const labelProps = {};
            if (this.isStepOptional(index)) {
              labelProps.optional = <Typography variant="caption" />;
            }
            if (this.isStepSkipped(index)) {
              props.completed = false;
            }
            return (
              <Step key={label} {...props}>
                <StepLabel {...labelProps}>
                  {label}
                </StepLabel>
              </Step>
            );
          })}
        </Stepper>

        <div>
          {activeStep === steps.length ? (
            <div>
              <Typography className={classes.instructions}>
                All steps completed - your product has been added
              </Typography>
              <Button onClick={this.handleReset} className={classes.button}>
                Add New
              </Button>
            </div>
          ) : (
            <div>
              {this.getStepContent(activeStep)}
              <div>
                <Button
                  disabled={activeStep === 0}
                  onClick={this.handleBack}
                  className={classes.button}
                >
                  Back
                </Button>
                {this.isStepOptional(activeStep) && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={this.handleSkip}
                    className={classes.button}
                  >
                    Skip
                  </Button>
                )}
                {
                  activeStep === steps.length - 1
                    ? (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={this.createProduct}
                        className={classes.button}
                      >
                 Finish
                      </Button>
                    )
                    : (<Button
                      variant="contained"
                      color="primary"
                      onClick={this.handleNext}
                      className={classes.button}
                    >
                   Next
                    </Button>
                    )
                }
              </div>
            </div>
          )}
        </div>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={snackBarOpenSuccess}
          onClose={this.onCloseHandlerSuccess}
        >
          <BezopSnackBar
            onClose={this.onCloseHandlerSuccess}
            variant={snackBarVariant}
            message={snackBarMessageSuccess}
          />
        </Snackbar>
      </div>
    );
  }
}

ProductStepper.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(ProductStepper);
