import React from "react";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select2 from "react-select";
import isEqual from "lodash/isEqual";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import Check from "@material-ui/icons/Check";
import Datetime from "react-datetime";

import GridItem from "../../components/Grid/GridItem";
import Card from "../../components/Card/Card";
import CardBody from "../../components/Card/CardBody";
import CardHeader from "../../components/Card/CardHeader";
import CardFooter from "../../components/Card/CardFooter";
// core components
import checkboxAdnRadioStyle from "../../assets/jss/material-kit-react/checkboxAdnRadioStyle";

import CustomInput from "../../components/CustomInput/CustomInput";

import Button from "../../components/CustomButtons/Button";
import Validator from "../../helpers/validator";


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
  floatRight: {
    float: "right",
    margin: "5px",
    ...theme.button,
  },
  marginTopFormControl: {
    marginTop: "15px",
    ...theme.MuiFormControl,
  },
  ...checkboxAdnRadioStyle,
});


class BusinessDetails extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      productDetails: props.productDetails,
      taxSelect: props.selectStyle.taxSelect,
      selectedValuation: props.selectElements.selectedValuation,
      valuationSelect: props.selectStyle.valuationSelect,
      selectedTax: props.selectElements.selectedTax,
      discountSelect: props.selectStyle.discountSelect,
      selectedDiscount: props.selectElements.selectedDiscount,
      selected: [],
    };
  }

  componentDidMount() {
    const { productDetails } = this.props;
    if (productDetails.extraFields.length === 0) {
      this.handleAddExtraField();
    }
  }

  componentWillReceiveProps(newProps) {
    const { onCloseModal, product } = this.props;
    if (Validator.propertyExist(newProps, "product", "addProduct")
    && isEqual(product.addProduct, newProps.product.addProduct) === false) {
      if (typeof newProps.product.addProduct === "string") {
        return false;
      }
      onCloseModal();
    }
    return false;
  }

  // This handles the discount select element
  handleDiscountChange = (selectedDiscount) => {
    const { setParentSelectElements, setParentSelectStyle } = this.props;
    setParentSelectElements("selectedDiscount", selectedDiscount);
    this.setState({ selectedDiscount });
    let currentStyle = "";
    if (selectedDiscount !== null) {
      this.setProductDetails("discountType", selectedDiscount.value, "price");
      this.setState({
        discountSelect: "react-select-label-visible",
      });
      currentStyle = "visible";
    } else {
      this.setProductDetails("discountType", "percent", "price");
      this.setState({
        discountSelect: "react-select-label-hidden",
      });
      currentStyle = "hidden";
    }

    setParentSelectStyle("discountSelect", `react-select-label-${currentStyle}`);
  }

  handleValuationChange = (selectedValuation) => {
    const { setParentSelectElements, setParentSelectStyle } = this.props;
    setParentSelectElements("selectedValuation", selectedValuation);
    this.setState({ selectedValuation });
    let currentStyle = "";
    if (selectedValuation !== null) {
      this.setProductDetails("valuation", selectedValuation.value, "price");
      this.setState({
        valuationSelect: "react-select-label-visible",
      });
      currentStyle = "visible";
    } else {
      this.setProductDetails("valuation", "LIFO", "price");
      this.setState({
        valuationSelect: "react-select-label-hidden",
      });
      currentStyle = "hidden";
    }

    setParentSelectStyle("valuationSelect", `react-select-label-${currentStyle}`);
  }

  // This handles the tax select element
  handleTaxChange = (selectedTax) => {
    const { setParentSelectElements, setParentSelectStyle } = this.props;
    this.setState({ selectedTax });
    setParentSelectElements("selectedTax", selectedTax);
    let currentStyle = "";
    if (selectedTax !== null) {
      this.setProductDetails("taxType", selectedTax.value, "price");
      this.setState({
        taxSelect: "react-select-label-visible",
      });
      currentStyle = "visible";
    } else {
      this.setProductDetails("taxType", "percent", "price");
      this.setState({
        taxSelect: "react-select-label-hidden",
      });
      currentStyle = "hidden";
    }

    setParentSelectStyle("taxSelect", `react-select-label-${currentStyle}`);
  }

  handleChange = (event) => {
    const names = event.target.name.split("|");
    if (names.length === 1) {
      this.setProductDetails(names[0], event.target.value);
    } else {
      this.setProductDetails(names[0], event.target.value, names[1]);
    }
  };

  handleCheckboxChange = (event) => {
    const names = event.target.name.split("|");
    const boolVal = event.target.value === "unchecked";
    if (names.length === 1) {
      this.setProductDetails(names[0], boolVal);
    } else {
      this.setProductDetails(names[0], boolVal, names[1]);
    }
  }

  setProductDetails = (type, value, parent = null) => {
    const { productDetails } = this.state;
    const { setParentProductDetails } = this.props;
    const newProductDetails = JSON.parse(JSON.stringify(productDetails));
    if (parent === null) {
      newProductDetails[type] = value;
    } else {
      newProductDetails[parent][type] = value;
    }
    this.setState({
      productDetails: newProductDetails,
    });

    setParentProductDetails(newProductDetails);
  }


  filterSelectedOption = (type, options, selected, parent = null) => {
    const { setParentSelectStyle } = this.props;
    const newSelectedOpt = options.map(opt => opt.value);
    this.setState({
      [selected]: options.length > 0 ? "react-select-label-visible" : "react-select-label-hidden",
    });
    const currentStyle = options.length > 0 ? "react-select-label-visible" : "react-select-label-hidden";

    setParentSelectStyle(selected, currentStyle);
    this.setProductDetails(type, newSelectedOpt, parent);
  }

  handleAddExtraField = () => {
    const { productDetails } = this.state;
    const { setParentProductDetails } = this.props;
    const newProductDetails = JSON.parse(JSON.stringify(productDetails));

    newProductDetails.extraFields.push({ name: "", value: "" });
    this.setState({
      productDetails: newProductDetails,
    });

    setParentProductDetails(newProductDetails);
  }

  handleDeletedExtraField = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    this.setState({ selected: newSelected });
  };

  isSelected = (id) => {
    const { selected } = this.state;
    return selected.includes(id);
  }

  handleSelectedDeleted = () => {
    const { productDetails, selected } = this.state;
    const { setParentProductDetails } = this.props;
    const newProductDetails = JSON.parse(JSON.stringify(productDetails));
    newProductDetails.extraFields = productDetails.extraFields
      .filter((field, key) => selected.indexOf(key) === -1);

    this.setState({
      productDetails: newProductDetails,
      selected: [],
    });
    setParentProductDetails(newProductDetails);
  }

  handleReleaseDateChange = (newDateTime) => {
    this.setProductDetails("releaseDate", newDateTime.format("YYYY-MM-DD"), "manufactureDetails");
  }

  handleExtraChange = (event) => {
    const { productDetails } = this.state;
    const { setParentProductDetails } = this.props;
    const names = event.target.name.split("|");
    const newProductDetails = JSON.parse(JSON.stringify(productDetails));
    newProductDetails.extraFields.map((field, key) => {
      if (key === parseInt(names[1], 10)) {
        field[names[0]] = event.target.value;
      }
      return field;
    });
    this.setState({
      productDetails: newProductDetails,
    });

    setParentProductDetails(newProductDetails);
  }


  render() {
    const { classes, productDetails } = this.props;
    const {
      selectedDiscount,
      selectedTax,
      taxSelect,
      discountSelect,
      valuationSelect,
      selectedValuation,
    } = this.state;
    let counter;

    return (
      <div>
        <div>
          <Card>
            <CardHeader color="primary">
              <h4>
                Add New Product
              </h4>
              <p>
                Business Details
              </p>
            </CardHeader>
            <CardBody>
              <h3>
                Price
              </h3>
              <Grid container>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Cost Price"
                    id="costPrice"
                    formControlProps={{
                      fullWidth: true,
                      required: true,
                    }}
                    inputProps={{
                      type: "number",
                      value: productDetails.price.costPrice,
                      name: "costPrice|price",
                      onChange: this.handleChange,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Unit Price"
                    id="unitPrice"
                    formControlProps={{
                      fullWidth: true,
                      required: true,
                    }}
                    inputProps={{
                      type: "number",
                      value: productDetails.price.unitPrice,
                      name: "unitPrice|price",
                      onChange: this.handleChange,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Slash Price"
                    id="slashPrice"
                    formControlProps={{
                      fullWidth: true,
                      required: true,
                    }}
                    inputProps={{
                      type: "number",
                      value: productDetails.price.slashPrice,
                      name: "slashPrice|price",
                      onChange: this.handleChange,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={5}>
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="selectedDiscount" className={discountSelect}>
                      Type or Select Product Discount Type
                    </InputLabel>
                    <Select2
                      id="selectedDiscount"
                      name="selectedDiscount"
                      value={selectedDiscount}
                      placeholder="Type or Select Discount Type"
                      onChange={this.handleDiscountChange}
                      options={["Fixed", "Percent"].map((discount, key) => ({ value: discount.toLowerCase(), label: discount }))
                      }
                    />
                  </FormControl>
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <CustomInput
                    labelText="Discount"
                    id="discount"
                    formControlProps={{
                      fullWidth: true,
                      required: true,
                    }}
                    inputProps={{
                      type: "number",
                      value: productDetails.price.discount,
                      name: "discount|price",
                      onChange: this.handleChange,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={5}>
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="selectedTax" className={taxSelect}>
                      Type or Select Product Tax Type
                    </InputLabel>
                    <Select2
                      id="selectedTax"
                      name="selectedTax"
                      value={selectedTax}
                      placeholder="Type or Select Tax Type"
                      onChange={this.handleTaxChange}
                      options={["Fixed", "Percent"].map((tax, key) => ({ value: tax.toLowerCase(), label: tax }))
                      }
                    />
                  </FormControl>
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <CustomInput
                    labelText="Tax"
                    id="tax"
                    formControlProps={{
                      fullWidth: true,
                      required: true,
                    }}
                    inputProps={{
                      type: "number",
                      name: "tax|price",
                      value: productDetails.price.tax,
                      onChange: this.handleChange,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={5}>
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="selectedValuation" className={valuationSelect}>
                      Type or Select Product Valuation
                    </InputLabel>
                    <Select2
                      id="selectedValuation"
                      name="selectedValuation"
                      value={selectedValuation}
                      placeholder="Type or Select Valuation"
                      onChange={this.handleValuationChange}
                      options={["FIFO", "LIFO", "AVCO"].map((valuation, key) => ({ value: valuation, label: valuation }))
                      }
                    />
                  </FormControl>
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <FormControlLabel
                    control={(
                      <Checkbox
                        onClick={this.handleCheckboxChange}
                        checkedIcon={<Check className={classes.checkedIcon} />}
                        icon={<Check className={classes.uncheckedIcon} />}
                        classes={{
                          checked: classes.checked,
                        }}
                        value={productDetails.deal === true ? "checked" : "unchecked"}
                        inputProps={{
                          name: "deal|price",
                        }}
                      />
)}
                    label="Deal of the Day"
                  />
                </GridItem>

              </Grid>
              <h3>
                Shipping Details
              </h3>
              <Grid container>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Shipping Cost"
                    id="shippingCost"
                    formControlProps={{
                      fullWidth: true,
                      required: true,
                    }}
                    inputProps={{
                      type: "number",
                      value: productDetails.shippingDetails.cost,
                      name: "cost|shippingDetails",
                      onChange: this.handleChange,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Length (Inches)"
                    id="length"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "text",
                      value: productDetails.shippingDetails.length,
                      name: "length|shippingDetails",
                      onChange: this.handleChange,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Width (Inches)"
                    id="width"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "text",
                      value: productDetails.shippingDetails.width,
                      name: "width|shippingDetails",
                      onChange: this.handleChange,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Height (Inches)"
                    id="height"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "text",
                      value: productDetails.shippingDetails.height,
                      name: "height|shippingDetails",
                      onChange: this.handleChange,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Weight (kilogram)"
                    id="weight"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "text",
                      value: productDetails.shippingDetails.weight,
                      name: "weight|shippingDetails",
                      onChange: this.handleChange,
                    }}
                  />
                </GridItem>
              </Grid>
              <h3>
                Downloadable Product
              </h3>
              <Grid container>
                <GridItem xs={12} sm={12} md={4}>
                  <FormControlLabel
                    control={(
                      <Checkbox
                        checked={productDetails.download.downloadable}
                        tabIndex={-1}
                        onClick={this.handleCheckboxChange}
                        checkedIcon={<Check className={classes.checkedIcon} />}
                        icon={<Check className={classes.uncheckedIcon} />}
                        classes={{
                          checked: classes.checked,
                        }}
                        value={productDetails.download.downloadable === true ? "checked" : "unchecked"}
                        inputProps={{
                          name: "downloadable|download",
                        }}
                      />
                      )}
                    label="Downloadable Product"
                    className={classes.marginTopFormControl}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Download Filename"
                    id="downloadFilename"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "text",
                      value: productDetails.download.downloadName,
                      name: "downloadName|download",
                      onChange: this.handleChange,
                    }}
                  />
                </GridItem>
              </Grid>
              <h3>
                Variety
              </h3>
              <Grid container>
                <GridItem xs={12} sm={12} md={4}>
                  <FormControlLabel
                    control={(
                      <Checkbox
                        checked={productDetails.variety.options}
                        tabIndex={-1}
                        onClick={this.handleCheckboxChange}
                        checkedIcon={<Check className={classes.checkedIcon} />}
                        icon={<Check className={classes.uncheckedIcon} />}
                        classes={{
                          checked: classes.checked,
                        }}
                        value={productDetails.variety.options === true ? "checked" : "unchecked"}
                        inputProps={{
                          name: "options|variety",
                        }}
                      />
                      )}
                    label="Variety Options"
                    className={classes.marginTopFormControl}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Parent Product"
                    id="parent"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "text",
                      value: productDetails.variety.parent,
                      name: "parent|variety",
                      onChange: this.handleChange,
                    }}
                  />
                </GridItem>
              </Grid>
              <h3>
                Analytics
              </h3>
              <Grid container>
                <GridItem xs={12} sm={12} md={4}>
                  <FormControlLabel
                    control={(
                      <Checkbox
                        checked={productDetails.featured}
                        tabIndex={-1}
                        onClick={this.handleCheckboxChange}
                        checkedIcon={<Check className={classes.checkedIcon} />}
                        icon={(
                          <Check className={classes.uncheckedIcon} />
                          )}
                        classes={{
                          checked: classes.checked,
                        }}
                        value={productDetails.analytics.featured === true ? "checked" : "unchecked"}
                        inputProps={{
                          name: "featured|analytics",
                        }}
                      />
                      )}
                    label="Feature Product"
                  />
                </GridItem>
              </Grid>
              <h3>
                Manufacture Details
              </h3>
              <Grid container>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Make"
                    id="make"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "text",
                      value: productDetails.manufactureDetails.make,
                      name: "make|manufactureDetails",
                      onChange: this.handleChange,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Model Number"
                    id="modelNumber"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "text",
                      value: productDetails.manufactureDetails.modelNumber,
                      name: "modelNumber|manufactureDetails",
                      onChange: this.handleChange,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <FormControl fullWidth>
                    <Datetime
                      dateFormat="YYYY-MM-DD"
                      timeFormat={false}
                      onChange={this.handleReleaseDateChange}
                      value={productDetails.manufactureDetails.releaseDate}
                      inputProps={{
                        placeholder: "Datetime Picker Here",
                        name: "releaseDate|manufactureDetails",
                      }}
                    />
                  </FormControl>
                </GridItem>
              </Grid>
              <h3>
                Product Extra Fields
                <Button
                  justIcon
                  round
                  color="danger"
                  onClick={this.handleSelectedDeleted}
                  className={classes.floatRight}
                >
                  <DeleteIcon />
                </Button>

                <Button
                  justIcon
                  round
                  color="primary"
                  onClick={this.handleAddExtraField}
                  className={classes.floatRight}
                >
                  <AddIcon />
                </Button>
              </h3>

              {
                productDetails.extraFields.map((field, key) => {
                  const selected = this.isSelected(key);
                  counter += 1;
                  return (
                    <Grid container key={counter}>
                      <GridItem xs={12} sm={12} md={5}>
                        <CustomInput
                          labelText="Extra Field Name"
                          id={`name${key}`}
                          formControlProps={{
                            fullWidth: true,
                            required: true,
                          }}
                          inputProps={{
                            type: "text",
                            value: field.name,
                            name: `name|${key}|extraFields`,
                            onChange: this.handleExtraChange,
                          }}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={5}>
                        <CustomInput
                          labelText="Extra Field Value"
                          id={`value${key}`}
                          formControlProps={{
                            fullWidth: true,
                            required: true,
                          }}
                          inputProps={{
                            type: "text",
                            value: field.value,
                            name: `value|${key}|extraFields`,
                            onChange: this.handleExtraChange,
                          }}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={2}>
                        <FormControlLabel
                          control={(
                            <Checkbox
                              checked={selected}
                              tabIndex={-1}
                              onClick={event => this.handleDeletedExtraField(event, key)}
                            />
                          )}
                        />
                      </GridItem>
                    </Grid>
                  );
                })
              }
            </CardBody>
            <CardFooter />
          </Card>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(BusinessDetails);
