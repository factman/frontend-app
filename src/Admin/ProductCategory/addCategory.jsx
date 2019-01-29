import React from "react";
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select2 from "react-select";
import isEqual from "lodash/isEqual";
import "react-select/dist/react-select.css";
import Snackbar from "@material-ui/core/Snackbar";


import GridItem from "../../components/Grid/GridItem";
import Card from "../../components/Card/Card";
import CardBody from "../../components/Card/CardBody";
import CardHeader from "../../components/Card/CardHeader";
import CardFooter from "../../components/Card/CardFooter";
import CustomInput from "../../components/CustomInput/CustomInput";
import BezopSnackBar from "../../assets/jss/bezop-mkr/BezopSnackBar";
import Button from "../../components/CustomButtons/Button";
import Validator from "../../helpers/validator";

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
    const { categoryDetails, categories } = this.props;
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      categoryDetails,
      selectedKind: categoryDetails.kind !== "" ? { value: categoryDetails.kind, label: categoryDetails.kind.replace(/\^w/, c => c.toUpperCase()) } : null,
      selectedKindStyle: `react-select-label-${categoryDetails.kind !== "" ? "visible" : "hidden"}`,
      selectedParent: categoryDetails.parent !== "0"
        ? categories.filter(collection => collection.id === categoryDetails.parent)
          .map(collection => ({ value: collection.id, label: collection.name.replace(/\^w/, c => c.toUpperCase()) }))[0] : null,
      selectedParentStyle: `react-select-label-${categoryDetails.parent !== "0" ? "visible" : "hidden"}`,
      snackBarVariant: "success",
      snackBarOpen: true,
      snackBarMessage: "",
    };
  }

  componentWillReceiveProps(newProps) {
    const { onHandleModalClose, adminCategory } = this.props;
    if (Validator.propertyExist(newProps, "adminCategory", "addCategory")
      && (isEqual(adminCategory.addCategory, newProps.adminCategory.addCategory) === false)) {
      if (typeof newProps.adminCategory.addCategory === "string") {
        this.setState({
          snackBarVariant: "error",
          snackBarOpen: true,
          snackBarMessage: newProps.adminCategory.addCategory,
        });
        return false;
      }
      this.setState({
        categoryDetails: newProps.categoryDetails,
        snackBarOpen: true,
        selectedKind: null,
        selectedKindStyle: "react-select-label-hidden",
        selectedParent: null,
        selectedParentStyle: "react-select-label-hidden",
      });

      onHandleModalClose();
    }

    if (Validator.propertyExist(newProps, "adminCategory", "updateCategory")
    && (isEqual(adminCategory.updateCategory, newProps.adminCategory.updateCategory) === false)) {
      if (typeof newProps.adminCategory.updateCategory === "string") {
        this.setState({
          snackBarVariant: "error",
          snackBarOpen: true,
          snackBarMessage: newProps.adminCategory.updateCategory,
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
  }

  // Get the value of Input Element
  handleChange = (event) => {
    this.setCategoryDetails(event.target.name, event.target.value);
  };

  // This handles the categoryy select element
  onChangeSelect = (type, selected, parent = null) => {
    this.setState({
      [`selected${type}`]: selected,
      [`selected${type}Style`]: `react-select-label-${selected === null ? "hidden" : "visible"}`,
    });
    const value = selected !== null ? selected.value : "";
    this.setCategoryDetails(type.toLowerCase(), value, parent);
  }

  // Create new Category
  createNewCategory = () => {
    const { categoryDetails } = this.state;
    const { addProductCategory } = this.props;
    addProductCategory(categoryDetails);
  }

  // Create new Category
  updateCategory = () => {
    const { categoryDetails } = this.state;
    const { specialMethod, eachData } = this.props;
    specialMethod(categoryDetails, eachData.id);
  }

  render() {
    const { classes, type, categories } = this.props;
    const {
      categoryDetails,
      selectedKind,
      selectedKindStyle,
      snackBarOpen,
      snackBarMessage,
      snackBarVariant,
      selectedParent,
      selectedParentStyle,
    } = this.state;
    let submitBtn;
    switch (type) {
      case "add":
        submitBtn = (
          <Button
            variant="contained"
            color="primary"
            component="span"
            className={classes.fluidButton}
            onClick={this.createNewCategory}
          >
            Create Product Collection
          </Button>
        );
        break;
      case "edit":
        submitBtn = (
          <Button
            variant="contained"
            color="primary"
            component="span"
            className={classes.fluidButton}
            onClick={this.updateCategory}
          >
            Update Product Collection
          </Button>
        );
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
                Add New Product Collection
              </h4>
            </div>
            <div>
              <p>
                Product Collection Details
              </p>
            </div>
          </CardHeader>
          <CardBody>
            <Grid container>
              <GridItem xs={12} sm={12} md={4}>
                <CustomInput
                  labelText="Collection Name"
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
                  <InputLabel htmlFor="selectedKind" className={selectedKindStyle}>
                    Type or Select Collection Kind
                  </InputLabel>
                  <Select2
                    id="selectedKind"
                    name="selectedKind"
                    value={selectedKind}
                    placeholder="Type or Select Collection Kind"
                    onChange={selected => this.onChangeSelect("Kind", selected)}
                    options={[
                      { value: "digital", label: "Digital" },
                      { value: "physical", label: "Physical" },
                    ]}
                  />
                </FormControl>
              </GridItem>
              <GridItem xs={12} sm={12} md={4}>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="selectedParent" className={selectedParentStyle}>
                    Type or Select Category Parent
                  </InputLabel>
                  <Select2
                    id="selectedParent"
                    name="selectedParent"
                    value={selectedParent}
                    placeholder="Type or Select Category Parent"
                    onChange={selected => this.onChangeSelect("Parent", selected)}
                    options={
                      categories
                        .map(collection => ({
                          value: collection.id,
                          label: collection.name.replace(/\^w/, c => c.toUpperCase()),
                        }))
                    }
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
                {submitBtn}
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
            variant={snackBarVariant}
            message={snackBarMessage}
          />
        </Snackbar>
      </div>
    );
  }
}

export default withStyles(styles)(AddCategory);
