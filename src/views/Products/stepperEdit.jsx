import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import isEqual from "lodash/isEqual";
import StepLabel from "@material-ui/core/StepLabel";
import Typography from "@material-ui/core/Typography";
import AddPage from "./productDetails";
import BusinessDetails from "./businessdetails";


import Button from "../../components/CustomButtons/Button";
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

class ProductStepperEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      skipped: new Set(),
      productDetails: {
        name: Validator.propertyExist(props.eachData, "name") ? props.eachData.name : "",
        code: Validator.propertyExist(props.eachData, "code") ? props.eachData.code : "",
        upc: Validator.propertyExist(props.eachData, "upc") ? props.eachData.upc : "",
        sku: Validator.propertyExist(props.eachData, "sku") ? props.eachData.sku : "",
        collections: Validator.propertyExist(props.eachData, "collections", "id") ? props.eachData.collections.id : "",
        category: Validator.propertyExist(props.eachData, "category", "id") ? props.eachData.category.id : "",
        brand: Validator.propertyExist(props.eachData, "brand", "id") ? props.eachData.brand.id : "",
        description: {
          color: Validator.propertyExist(props.eachData, "description", "color") ? props.eachData.descriptionColor : [],
          unit: Validator.propertyExist(props.eachData, "description", "unit") ? props.eachData.descriptionUnit : "",
          long: Validator.propertyExist(props.eachData, "description", "long") ? props.eachData.descriptionLong : "",
          short: Validator.propertyExist(props.eachData, "description", "short") ? props.eachData.descriptionShort : "",
          tag: Validator.propertyExist(props.eachData, "description", "tag") ? props.eachData.descriptionTag : [],
        },
        variety: {
          options: Validator.propertyExist(props.eachData, "variety", "options") ? props.eachData.variety.options : false,
          parent: Validator.propertyExist(props.eachData, "variety", "parent") ? props.eachData.variety.parent : "",
        },
        price: {
          deal: Validator.propertyExist(props.eachData, "price", "deal") ? props.eachData.price.deal : false,
          valuation: Validator.propertyExist(props.eachData, "price", "valuation") ? props.eachData.price.valuation : "FIFO",

          costPrice: Validator.propertyExist(props.eachData, "price", "costPrice") ? props.eachData.price.costPrice : 0.00,
          unitPrice: Validator.propertyExist(props.eachData, "price", "unitPrice") ? props.eachData.price.unitPrice : 0.00,
          slashPrice: Validator.propertyExist(props.eachData, "price", "slashPrice") ? props.eachData.price.slashPrice : 0.00,
          discount: Validator.propertyExist(props.eachData, "price", "discount") ? props.eachData.price.discount : 0.00,
          discountType: Validator.propertyExist(props.eachData, "price", "discountType") ? props.eachData.price.discountType : "fixed",
          tax: Validator.propertyExist(props.eachData, "price", "tax") ? props.eachData.price.tax : 0.00,
          taxType: Validator.propertyExist(props.eachData, "price", "taxType") ? props.eachData.price.taxType : "fixed",
        },
        shippingDetails: {
          cost: Validator.propertyExist(props.eachData, "shippingDetails", "cost") ? props.eachData.shippingDetails.cost : 0.00,
          length: Validator.propertyExist(props.eachData, "shippingDetails", "length") ? props.eachData.shippingDetails.length : 0,
          height: Validator.propertyExist(props.eachData, "shippingDetails", "height") ? props.eachData.shippingDetails.height : 0,
          width: Validator.propertyExist(props.eachData, "shippingDetails", "width") ? props.eachData.shippingDetails.width : 0,
          weight: Validator.propertyExist(props.eachData, "shippingDetails", "weight") ? props.eachData.shippingDetails.weight : 0,
        },
        manufactureDetails: {
          make: Validator.propertyExist(props.eachData, "manufactureDetails", "make") ? props.eachData.manufactureDetails.make : "",
          modelNumber: Validator.propertyExist(props.eachData, "manufactureDetails", "modelNumber") ? props.eachData.manufactureDetails.modelNumber : "",
          releaseDate: Validator.propertyExist(props.eachData, "manufactureDetails", "releaseDate") ? props.eachData.manufactureDetails.releaseDate.match(/^\d{4}[/-](0?[1-9]|1[012])[/-](0?[1-9]|[12][0-9]|3[01])/)[0] : "",
        },
        download: {
          downloadable: Validator.propertyExist(props.eachData, "download", "downloadable") ? props.eachData.download.downloadable : false,
          downloadName: Validator.propertyExist(props.eachData, "download", "downloadName") ? props.eachData.download.downloadName : "",
        },
        analytics: {
          featured: Validator.propertyExist(props.eachData, "analytics", "featured")
            ? props.eachData.analytics.featured : false,
        },
        extraFields: Validator.propertyExist(props.eachData, "extraFields") ? props.eachData.extraFields : [],

      },
      selectElements: {
        selectedOption: Validator.propertyExist(props.eachData, "description", "tag") ? props.eachData.descriptionTag.map(tag => ({ value: tag, label: tag })) : [],
        selectedColors: Validator.propertyExist(props.eachData, "description", "color") ? props.eachData.descriptionColor.map(color => ({ value: color, label: color })) : [],
        selectedBrand: Validator.propertyExist(props.eachData, "brand", "id") ? { value: props.eachData.brand.id, label: props.eachData.brand.name } : null,
        selectedCategory: Validator.propertyExist(props.eachData, "collections", "id") ? { value: props.eachData.collections.id, label: props.eachData.collections.name } : null,
        selectedSubCategory: Validator.propertyExist(props.eachData, "category", "id") ? { value: props.eachData.category.id, label: props.eachData.category.name } : null,
        selectedDiscount: Validator.propertyExist(props.eachData, "price", "discountType") ? { value: props.eachData.price.discountType, label: props.eachData.price.discountType.replace(/^\w/, c => c.toUpperCase()) } : null,
        selectedTax: Validator.propertyExist(props.eachData, "price", "taxType") ? { value: props.eachData.price.taxType, label: props.eachData.price.taxType.replace(/^\w/, c => c.toUpperCase()) } : null,
        selectedValuation: Validator.propertyExist(props.eachData, "price", "valuation") ? { value: props.eachData.price.valuation, label: props.eachData.price.valuation } : null,
      },
      selectStyle: {
        taxSelect: `react-select-label-${Validator.propertyExist(props.eachData, "price", "taxType") ? "visible" : "hidden"}`,
        discountSelect: `react-select-label-${Validator.propertyExist(props.eachData, "price", "discountType") > 0 ? "visible" : "hidden"}`,
        brandSelect: `react-select-label-${Validator.propertyExist(props.eachData, "brand") ? "visible" : "hidden"}`,
        categorySelect: `react-select-label-${Validator.propertyExist(props.eachData, "collections") ? "visible" : "hidden"}`,
        subCategorySelect: `react-select-label-${Validator.propertyExist(props.eachData, "category") ? "visible" : "hidden"}`,
        tagsSelect: `react-select-label-${Validator.propertyExist(props.eachData, "description", "tag") ? "visible" : "hidden"}`,
        colorsSelect: `react-select-label-${Validator.propertyExist(props.eachData, "description", "color") ? "visible" : "hidden"}`,
        valuationSelect: `react-select-label-${Validator.propertyExist(props.eachData, "price", "valuation") ? "visible" : "hidden"}`,
      },
      productId: props.eachData.id,
    };
  }

  componentWillReceiveProps(newProps) {
    const { product, onCloseModal } = this.props;
    if (
      Validator.propertyExist(newProps, "product", "updateProduct")
    && isEqual(product.updateProduct, newProps.product.updateProduct) === false) {
      onCloseModal();
    }
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
            product={product}
            productDetails={productDetails}
            setParentProductDetails={this.setParentProductDetails}
            selectElements={selectElements}
            fetchProductCollections={fetchProductCollections}
            // collections={collections}
            setParentSelectElements={this.setParentSelectElements}
            selectStyle={selectStyle}
            setParentSelectStyle={this.setParentSelectStyle}
          />
        );
      case 1:
        return (
          <BusinessDetails
            productDetails={productDetails}
            product={product}
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

  setParentSelectStyle = (type, selectStyles) => {
    const { selectStyle } = this.state;
    const newSelectStyle = JSON.parse(JSON.stringify(selectStyle));
    newSelectStyle[type] = selectStyles;
    this.setState({
      selectStyle: newSelectStyle,
    });
  }

  updateProduct = () => {
    const { putProductDetails } = this.props;
    const { productDetails, productId } = this.state;
    putProductDetails(productDetails, productId);
  }

  isStepSkipped(step) {
    const { skipped } = this.state;
    return skipped.has(step);
  }

  render() {
    const { classes } = this.props;
    const steps = this.getSteps();
    const { activeStep } = this.state;

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
                          onClick={this.updateProduct}
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

      </div>
    );
  }
}

ProductStepperEdit.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(ProductStepperEdit);
