import React from "react";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select2 from "react-select";
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
import { inputErrorValidation } from "../../../helpers/logic";

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

class EditCategory extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      categoryDetails: {
        name: props.eachData.name,
        description: props.eachData.description,
        kind: props.eachData.kind,
        parent: props.eachData.parent,
        collections: props.eachData.collections,
      },
      categoryDetailsError: {
        name: false,
        description: false,
        kind: false,
      },
      selectedCategoryKind: { value: props.eachData.kind, label: props.eachData.kind.replace(/^\w/, c => c.toUpperCase()) },
      selectedCategoryCollection: props.eachData.collections !== "0"
        ? props.collections
          .filter(collection => collection.id === props.eachData.collections)
          .map(collection => ({ value: collection.id, label: collection.name.replace(/\^w/, c => c.toUpperCase()) }))[0] : null,
      selectedCategoryParent: props.eachData.parent !== "0"
        ? props.categories
          .filter(category => category.id === props.eachData.parent)
          .map(category => ({ value: category.id, label: category.name.replace(/\^w/, c => c.toUpperCase()) }))[0] : null,
      categoryKindSelect: "react-select-label-hidden",
      categoryCollectionSelect: "react-select-label-hidden",
      categoryParentSelect: "react-select-label-hidden",
      snackBarOpen: false,
      snackBarMessage: "",

    };
    this.fileInput = React.createRef();
    this.thumbnail = React.createRef();
  }

  componentDidMount() {
    const { eachData, categories } = this.props;
    this.setState({
      selectedCategoryParent: eachData.parent === "0" ? null : categories.filter(category => category.id === eachData.parent)
        .map(category => ({ value: category.id, label: category.name }))[0],
    });
  }

  componentWillReceiveProps(newProps) {
    const { productCategory, onHandleModalClose } = this.props;
    if (validator.propertyExist(newProps, "productCategory", "updateCategory")
      && !isEqual(productCategory.updateCategory, newProps.productCategory.updateCategory)) {
      if (typeof newProps.productCategory.updateCategory === "string") {
        this.setState({
          snackBarOpen: true,
          snackBarMessage: newProps.productCategory.addCategory,
        });
        return false;
      }
      onHandleModalClose();
    }
    return false;
  }

  onCloseHandler = () => {
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
    this.setCategoryDetailsSpecialError(type, value);
  }


  // Setting the state every fields that have error
  setCategoryDetailsSpecialError(type, value, value1 = null) {
    const { categoryDetailsError } = this.state;
    const newCategoryDetailsError = JSON.parse(JSON.stringify(categoryDetailsError));
    newCategoryDetailsError[type] = inputErrorValidation(type, value, value1);
    this.setState({
      categoryDetailsError: newCategoryDetailsError,
    });
  }

  // Get the value of Input Element
  handleChange = (event) => {
    this.setCategoryDetails(event.target.name, event.target.value);
  };

  // This handles the country select element
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
      this.setCategoryDetailsSpecialError("kind", "");
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
  updateCategory = () => {
    const { specialMethod, eachData } = this.props;
    const { categoryDetails } = this.state;
    specialMethod(categoryDetails, eachData.id);
  }

  render() {
    const { classes, categories, eachData, collections } = this.props;
    const {
      categoryDetails,
      categoryKindSelect,
      selectedCategoryKind,
      categoryParentSelect,
      selectedCategoryParent,
      categoryDetailsError,
      snackBarOpen,
      snackBarMessage,
      selectedCategoryCollection,
      categoryCollectionSelect,
    } = this.state;

    return (
      <div>

        <Card>
          <CardHeader color="info">
            <div>
              <h4>Edit Product Category</h4>
            </div>
            <div>
              <p>Product Category Details</p>
            </div>
          </CardHeader>
          <CardBody>
            <Grid container>
              <GridItem xs={12} sm={12} md={4}>
                <CustomInput
                  labelText={categoryDetailsError.name === false ? "Category Name" : "The length of Category must not be less than 3 characters"}
                  id="name"
                  error={categoryDetailsError.name}
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
                  <InputLabel htmlFor="selectedCategoryKind" className={categoryKindSelect}>Type or Select Category Kind</InputLabel>
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
                    className={categoryDetailsError.kind === true ? "select-menu-error" : ""}
                  />
                </FormControl>
              </GridItem>
              <GridItem xs={12} sm={12} md={4}>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="selectedCategoryCollection" className={categoryCollectionSelect}>Type or Select Collection</InputLabel>
                  <Select2
                    id="selectedCategoryCollection"
                    name="selectedCategoryCollection"
                    value={selectedCategoryCollection}
                    placeholder="Type or Select Category Collection"
                    onChange={this.handleCategoryKindChange}
                    options={
                      collections
                        .map(collection => ({
                          value: collection.id,
                          label: collection.name.replace(/\^w/, c => c.toUpperCase()),
                        }))
                    }
                    className={categoryDetailsError.kind === true ? "select-menu-error" : ""}
                  />
                </FormControl>
              </GridItem>
              <GridItem xs={12} sm={12} md={4}>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="selectedCategoryParent" className={categoryParentSelect}>Type or Select Parent Category</InputLabel>
                  <Select2
                    id="selectedCategoryParent"
                    name="selectedCategoryParent"
                    value={selectedCategoryParent}
                    placeholder="Type or Select Parent Category"
                    onChange={this.handleCategoryParentChange}
                    options={categories
                      .filter(category => (category.id !== eachData.id && category.parent === "0"))
                      .map(category => ({ value: category.id, label: category.name }))}
                  />
                </FormControl>
              </GridItem>
            </Grid>
            <Grid container>
              <GridItem xs={12}>

                <CustomInput
                  error={categoryDetailsError.description}
                  labelText={categoryDetailsError.description === false ? "Description" : "The length of Category must not be less than 15 characters"}
                  id="description"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    multiline: true,
                    rows: 5,
                    name: "description",
                    value: categoryDetails.description,
                    onChange: this.handleChange,
                  }}
                />
              </GridItem>

            </Grid>
          </CardBody>
          <CardFooter>
            <Grid container>
              <GridItem xs={12}>
                <Button variant="contained" color="primary" component="span" className={classes.fluidButton} onClick={this.updateCategory}>
                  Update Product Category
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

export default withStyles(styles)(EditCategory);
