import React from "react";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select2 from "react-select";
import withStyles from "@material-ui/core/styles/withStyles";
import Snackbar from "@material-ui/core/Snackbar";
import isEqual from "lodash/isEqual";
import "react-select/dist/react-select.css";

import GridItem from "../../../components/Grid/GridItem";
import Card from "../../../components/Card/Card";
import CardBody from "../../../components/Card/CardBody";
import CardHeader from "../../../components/Card/CardHeader";
import CardFooter from "../../../components/Card/CardFooter";
import CustomInput from "../../../components/CustomInput/CustomInput";
import Validator from "../../../helpers/validator";
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

const stockDetailInitials = {
  product: "",
  orderNum: "",
  description: "",
  quantity: "",
  kind: "",
  unitCost: "",
  unitPrice: "",
};

class AddStock extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      stockDetails: stockDetailInitials,
      selectedKind: null,
      selectedProduct: null,
      selectedKindStyle: "react-select-label-hidden",
      selectedProductStyle: "react-select-label-hidden",
      snackBarOpen: true,
      snackBarMessage: "",
    };
  }

  componentWillReceiveProps(newProps) {
    const { productStock } = this.props;
    if (Validator.propertyExist(newProps, "productStock", "addProductStock")
     && !isEqual(newProps.productStock.addProductStock, productStock.addProductStock)) {
      if (typeof newProps.productStock.addProductStock === "string") {
        this.setState({
          snackBarMessage: newProps.productStock.addProductStock,
          snackBarOpen: true,
        });
        return false;
      }
      this.setState({
        stockDetails: stockDetailInitials,
        selectedKind: null,
        selectedProduct: null,
        selectedKindStyle: "react-select-label-hidden",
        selectedProductStyle: "react-select-label-hidden",
      });
    }
    return false;
  }

  onCloseHandler = () => {
    this.setState({ snackBarOpen: false });
  }

  // Setting the state of all input feilds
  setStockDetails = (type, value) => {
    const { stockDetails } = this.state;
    const newstockDetails = JSON.parse(JSON.stringify(stockDetails));
    newstockDetails[type] = value;
    this.setState({
      stockDetails: newstockDetails,
    });
  }

  // This handles the categoryy select element
  handleSelectChange = (type, selected, property) => {
    this.setState({ [type]: selected });
    let optValue;
    if (selected !== null) {
      this.setState({
        [`${type}Style`]: "react-select-label-visible",
      });
      optValue = selected.value;
    } else {
      this.setState({
        [`${type}Style`]: "react-select-label-hidden",
      });
      optValue = "";
    }
    this.setStockDetails(property, optValue);
  }

  // Create new Stock
  createNewStock = () => {
    const { addProductStock } = this.props;
    const { stockDetails } = this.state;
    addProductStock(stockDetails);
  }

  // Get the value of Input Element
  handleChange = (event) => {
    this.setStockDetails(event.target.name, event.target.value);
  };

  render() {
    const { classes, products } = this.props;
    const {
      stockDetails,
      selectedKind,
      selectedProduct,
      selectedKindStyle,
      selectedProductStyle,
      snackBarOpen,
      snackBarMessage,
    } = this.state;
    return (
      <div>
        <Card>
          <CardHeader color="primary">
            <div>
              <h4>
                Add New Product Stock
              </h4>
            </div>
            <div>
              <p>
                Product Stock Details
              </p>
            </div>
          </CardHeader>
          <CardBody>
            <Grid container>
              <GridItem xs={12} sm={12} md={12}>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="selectedProduct" className={selectedProductStyle}>
                    Type or Select Product
                  </InputLabel>
                  <Select2
                    id="selectedProduct"
                    name="selectedProduct"
                    value={selectedProduct}
                    placeholder="Type or Select Product"
                    onChange={selected => this.handleSelectChange("selectedProduct", selected, "product")}
                    options={products.map((product) => {
                      const option = { value: product.id, label: product.name };
                      return option;
                    })}
                  />
                </FormControl>
              </GridItem>
              <GridItem xs={12} sm={12} md={12}>
                <CustomInput
                  labelText="Order Number"
                  id="orderNum"
                  inputProps={{
                    value: stockDetails.orderNum,
                    name: "orderNum",
                    onChange: this.handleChange,
                  }}
                  formControlProps={{
                    fullWidth: true,
                    required: true,
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={12}>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="selectedKind" className={selectedKindStyle}>
                    Type or Select Kind
                  </InputLabel>
                  <Select2
                    id="selectedKind"
                    name="selectedKind"
                    value={selectedKind}
                    placeholder="Type or Select Kind"
                    onChange={selected => this.handleSelectChange("selectedKind", selected, "kind")}
                    options={[
                      { value: "addition", label: "Addition" },
                      { value: "subtraction", label: "Subtraction" },
                    ]}
                  />
                </FormControl>
              </GridItem>
              <GridItem xs={12} sm={12} md={12}>
                <CustomInput
                  labelText="Quantity"
                  id="quantity"
                  inputProps={{
                    value: stockDetails.quantity,
                    name: "quantity",
                    onChange: this.handleChange,
                    type: "number",
                  }}
                  formControlProps={{
                    fullWidth: true,
                    required: true,
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={12}>
                <CustomInput
                  labelText="Unit Cost"
                  id="unitCost"
                  inputProps={{
                    value: stockDetails.unitCost,
                    name: "unitCost",
                    onChange: this.handleChange,
                    type: "number",
                  }}
                  formControlProps={{
                    fullWidth: true,
                    required: true,
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={12}>
                <CustomInput
                  labelText="Unit Price"
                  id="unitPrice"
                  inputProps={{
                    value: stockDetails.unitPrice,
                    name: "unitPrice",
                    onChange: this.handleChange,
                    type: "number",
                  }}
                  formControlProps={{
                    fullWidth: true,
                    required: true,
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
                    multiline: true,
                    rows: 5,
                    name: "description",
                    onChange: this.handleChange,
                    value: stockDetails.description,
                  }}
                />
              </GridItem>
            </Grid>
          </CardBody>
          <CardFooter>
            <Grid container>
              <GridItem xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  component="span"
                  className={classes.fluidButton}
                  onClick={this.createNewStock}
                >
                  Create Product Stock
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

export default withStyles(styles)(AddStock);
