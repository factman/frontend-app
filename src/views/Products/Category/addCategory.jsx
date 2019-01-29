import React from "react";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select2 from "react-select";
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

class AddCategory extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      categoryDetails: {
        name: "",
        description: "",
        parent: "0",
        kind: "",
      },
      selectedCategoryKind: null,
      categoryKindSelect: "react-select-label-hidden",
      selectedCategoryParent: null,
      categoryParentSelect: "react-select-label-hidden",
      selectedCategoryCollection: null,
      categoryCollectionSelect: "react-select-label-hidden",
      snackBarOpen: false,
      snackBarMessage: "",
    };
  }

  componentWillReceiveProps(newProps) {
    const { productCategory, onHandleModalClose } = this.props;
    if (Validator.propertyExist(newProps, "productCategory", "addCategory")
    && (isEqual(productCategory.addCategory, newProps.productCategory.addCategory) === false)) {
      if (typeof newProps.productCategory.addCategory === "string") {
        this.setState({
          snackBarOpen: true,
          snackBarMessage: newProps.productCategory.addCategory,
        });
        return false;
      }
      this.setState({
        categoryDetails: {
          name: "",
          description: "",
          parent: "0",
          kind: "",
          collections: "",
        },
        selectedCategoryKind: null,
        categoryKindSelect: "react-select-label-hidden",
        selectedCategoryParent: null,
        categoryParentSelect: "react-select-label-hidden",
      });

      onHandleModalClose();
    }
    return false;
  }

  onCloseHandler = () => {
    this.setState({ snackBarOpen: false });
  }

  onOpenHandler = () => {
    this.setState({ snackBarOpen: false });
  }

  // Setting the state of all input feilds
  setCategoryDetails = (type, value) => {
    const { categoryDetails } = this.state;
    const newcategoryDetails = JSON.parse(JSON.stringify(categoryDetails));
    newcategoryDetails[type] = value;
    this.setState({
      categoryDetails: newcategoryDetails,
    });
  }

  // Get the value of Input Element
  handleChange = (event) => {
    this.setCategoryDetails(event.target.name, event.target.value);
  };

  // This handles the categoryy select element
  handleCategoryKindChange = (selectedCategoryKind) => {
    this.setState({ selectedCategoryKind });
    if (selectedCategoryKind !== null) {
      this.setCategoryDetails("kind", selectedCategoryKind.value);
      this.setState({
        categoryKindSelect: "react-select-label-visible",
      });
    } else {
      this.setState({
        categoryKindSelect: "react-select-label-hidden",
      });
      this.setCategoryDetails("kind", "");
      this.setCategoryDetailsSpecialError("kind", null);
    }
  }

  handleCategoryParentChange = (selectedCategoryParent) => {
    this.setState({ selectedCategoryParent });
    if (selectedCategoryParent !== null) {
      this.setCategoryDetails("parent", selectedCategoryParent.value);
      this.setState({
        categoryParentSelect: "react-select-label-visible",
      });
    } else {
      this.setState({
        categoryParentSelect: "react-select-label-hidden",
      });
      this.setCategoryDetails("parent", "0");
    }
  }

  handleCategoryCollectionChange = (selectedCategoryCollection) => {
    this.setState({ selectedCategoryCollection });
    if (selectedCategoryCollection !== null) {
      this.setCategoryDetails("collections", selectedCategoryCollection.value);
      this.setState({
        categoryCollectionSelect: "react-select-label-visible",
      });
    } else {
      this.setState({
        categoryCollectionSelect: "react-select-label-hidden",
      });
      this.setCategoryDetails("collections", null);
    }
  }

  // Create new Category
  createNewCategory = () => {
    const { categoryDetails } = this.state;
    const { addProductCategory } = this.props;
    addProductCategory(categoryDetails);
  }

  render() {
    const { classes, categories, collections } = this.props;
    const {
      categoryDetails,
      categoryKindSelect,
      selectedCategoryKind,
      categoryParentSelect,
      selectedCategoryParent,
      snackBarOpen,
      snackBarMessage,
      selectedCategoryCollection,
      categoryCollectionSelect,
    } = this.state;
    return (
      <div>

        <Card>
          <CardHeader color="primary">
            <div>
              <h4>
                Add New Product Category
              </h4>
            </div>
            <div>
              <p>
                Product Category Details
              </p>
            </div>
          </CardHeader>
          <CardBody>
            <Grid container>
              <GridItem xs={12} sm={12} md={4}>
                <CustomInput
                  labelText="Category Name"
                  id="name"
                  inputProps={{
                    value: categoryDetails.name,
                    name: "name",
                    onChange: this.handleChange,
                  }}
                  formControlProps={{
                    fullWidth: true,
                    required: true,
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={4}>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="selectedCategoryKind" className={categoryKindSelect}>
                    Type or Select Category Kind
                  </InputLabel>
                  <Select2
                    id="selectedCategoryKind"
                    name="selectedCategoryKind"
                    value={selectedCategoryKind}
                    placeholder="Type or Select Category Kind"
                    onChange={this.handleCategoryKindChange}
                    options={[
                      { value: "digital", label: "Digital" },
                      { value: "physical", label: "Physical" },
                    ]}
                  />
                </FormControl>
              </GridItem>
              <GridItem xs={12} sm={12} md={4}>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="selectedCategoryCollection" className={categoryCollectionSelect}>
                    Type or Select Collection
                  </InputLabel>
                  <Select2
                    id="selectedCategoryCollection"
                    name="selectedCategoryCollection"
                    value={selectedCategoryCollection}
                    placeholder="Type or Select Collection Category"
                    onChange={this.handleCategoryCollectionChange}
                    options={
                      collections
                        .map(collection => ({
                          value: collection.id,
                          label: collection.name.replace(/\^w/, c => c.toUpperCase()),
                        }))}
                  />
                </FormControl>
              </GridItem>
              <GridItem xs={12} sm={12} md={4}>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="selectedCategoryParent" className={categoryParentSelect}>
                    Type or Select Parent Category
                  </InputLabel>
                  <Select2
                    id="selectedCategoryParent"
                    name="selectedCategoryParent"
                    value={selectedCategoryParent}
                    placeholder="Type or Select Parent Category"
                    onChange={this.handleCategoryParentChange}
                    options={categories
                      .filter(category => category.parent === "0")
                      .map(category => ({ value: category.id, label: category.name }))}
                  />
                </FormControl>
              </GridItem>
            </Grid>
            <Grid container>
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
                    value: categoryDetails.description,
                  }}
                />
              </GridItem>

            </Grid>
          </CardBody>
          <CardFooter>
            <Grid container>
              <GridItem xs={12}>
                <Button variant="contained" color="primary" component="span" className={classes.fluidButton} onClick={this.createNewCategory}>
                  Create Product Category
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

export default withStyles(styles)(AddCategory);
