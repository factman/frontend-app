import React from "react";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select2, { Creatable } from "react-select";
import withStyles from "@material-ui/core/styles/withStyles";

import "react-select/dist/react-select.css";
import GridItem from "../../components/Grid/GridItem";
import Card from "../../components/Card/Card";
import CardBody from "../../components/Card/CardBody";
import CardHeader from "../../components/Card/CardHeader";
import CardFooter from "../../components/Card/CardFooter";
import CustomInput from "../../components/CustomInput/CustomInput";
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
});

class AddPage extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      productDetails: props.productDetails,
      categories: [],
      brands: [],
      collections: [],
      selectedOption: props.selectElements.selectedOption,
      tagsSelect: props.selectStyle.tagsSelect,
      selectedBrand: props.selectElements.selectedBrand,
      brandSelect: props.selectStyle.brandSelect,
      selectedCategory: props.selectElements.selectedCategory,
      categorySelect: props.selectStyle.categorySelect,
      selectedSubCategory: props.selectElements.selectedSubCategory,
      subCategorySelect: props.selectStyle.subCategorySelect,
      selectedColors: props.selectElements.selectedColors,
      colorsSelect: props.selectStyle.colorsSelect,
    };
  }

  componentDidMount() {
    const {
      fetchProducts,
      fetchProductBrands,
      fetchProductCategories,
      fetchProductCollections,
    } = this.props;
    if (fetchProducts) fetchProducts();
    if (fetchProductBrands) fetchProductBrands();
    if (fetchProductCategories) fetchProductCategories();
    if (fetchProductCollections) fetchProductCollections();
  }


  componentWillReceiveProps(newProps) {
    const { productDetails, selectedCategory, selectedSubCategory, selectedBrand } = this.state;
    if (Validator.propertyExist(newProps, "product", "productCategories")
    && typeof newProps.product.productCategories === "object") {
      this.setState({
        categories: newProps.product.productCategories,
      });

      if (selectedSubCategory === null) {
        this.setState({
          selectedSubCategory: newProps.product.productCategories
            .filter(category => category.id === productDetails.category)
            .map(category => ({ value: category.id, label: category.name }))[0],
        });
      }
    }

    if (Validator.propertyExist(newProps, "product", "productBrands") && typeof newProps.product.productBrands === "object") {
      this.setState({
        brands: newProps.product.productBrands,
      });
      if (selectedBrand === null) {
        this.setState({
          selectedBrand: newProps.product.productBrands
            .filter(brand => brand.id === productDetails.brand)
            .map(brand => ({ value: brand.id, label: brand.name }))[0],
        });
      }
    }

    if (Validator.propertyExist(newProps, "product", "getProductCollections")
    && typeof newProps.product.getProductCollections === "object") {
      console.log(newProps.product.getProductCollections);
      this.setState({
        collections: newProps.product.getProductCollections,
      });
      if (selectedCategory === null) {
        this.setState({
          selectedCategory: newProps.product.getProductCollections
            .filter(collection => collection.id === productDetails.collections)
            .map(collection => ({ value: collection.id, label: collection.name }))[0],
        });
      }
    }

    // if (Validator.propertyExist(newProps, "collections")
    // && newProps.collections.length > 0) {
    //   this.setState({
    //     collections: newProps.collections,
    //   });
    //   if (selectedCategory === null) {
    //     this.setState({
    //       selectedCategory: newProps.collections
    //         .filter(category => category.id === productDetails.collections)
    //         .map(category => ({ value: category.id, label: category.name }))[0],
    //     });
    //   }
    // }
  }

  // Get the value of Input Element
  handleChange = (event) => {
    // The | is use to check if the element has a parent
    const names = event.target.name.split("|");
    if (names.length > 1) {
      this.setProductDetails(names[0], event.target.value, names[1]);
    } else if (names.length === 1) {
      this.setProductDetails(names[0], event.target.value);
    }
  };

  // This handles the tags select element
  handleTagChange = (selectedOption) => {
    const { setParentSelectElements } = this.props;
    this.setState({ selectedOption });
    setParentSelectElements("selectedOption", selectedOption);
    this.filterSelectedOption("tag", selectedOption, "tagsSelect", "description");
  }

  // This handles the tags select element
  handleColorChange = (selectedColors) => {
    const { setParentSelectElements } = this.props;
    this.setState({ selectedColors });
    setParentSelectElements("selectedColors", selectedColors);
    this.filterSelectedOption("color", selectedColors, "colorsSelect", "description");
  }


  // This handles the brand select element
  handleBrandChange = (selectedBrand) => {
    const { setParentSelectElements, setParentSelectStyle } = this.props;
    this.setState({ selectedBrand });
    setParentSelectElements("selectedBrand", selectedBrand);
    if (selectedBrand !== null) {
      this.setProductDetails("brand", selectedBrand.value);
      this.setState({
        brandSelect: "react-select-label-visible",
      });
      setParentSelectStyle("brandSelect", "react-select-label-visible");
    } else {
      this.setState({
        brandSelect: "react-select-label-hidden",
      });
      setParentSelectStyle("brandSelect", "react-select-label-hidden");
    }
  }

  // This handles the category select element
  handleCategoryChange = (selectedCategory) => {
    const { setParentSelectElements, setParentSelectStyle } = this.props;
    this.setState({ selectedCategory });
    setParentSelectElements("selectedCategory", selectedCategory);
    if (selectedCategory !== null) {
      this.setProductDetails("collections", selectedCategory.value);

      this.setState({
        categorySelect: "react-select-label-visible",
      });
      setParentSelectStyle("categorySelect", "react-select-label-visible");
    } else {
      this.setState({
        categorySelect: "react-select-label-hidden",
      });
      setParentSelectStyle("categorySelect", "react-select-label-hidden");
    }
  }

  // This handles the category select element
  handleSubCategoryChange = (selectedSubCategory) => {
    const { setParentSelectElements, setParentSelectStyle } = this.props;
    this.setState({ selectedSubCategory });
    setParentSelectElements("selectedSubCategory", selectedSubCategory);
    if (selectedSubCategory !== null) {
      this.setProductDetails("category", selectedSubCategory.value);
      this.setState({
        subCategorySelect: "react-select-label-visible",
      });
      setParentSelectStyle("subCategorySelect", "react-select-label-visible");
    } else {
      this.setState({
        subCategorySelect: "react-select-label-hidden",
      });
      setParentSelectStyle("subCategorySelect", "react-select-label-hidden");
    }
  }

  // Get the number
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

  render() {
    const { classes } = this.props;
    const {
      selectedOption,
      productDetails,
      selectedBrand,
      tagsSelect,
      brandSelect,
      categorySelect,
      selectedCategory,
      subCategorySelect,
      selectedSubCategory,
      brands,
      categories,
      selectedColors,
      colorsSelect,
      collections,
    } = this.state;

    return (
      <div>
        <div>
          <Card>
            <CardHeader color="primary">
              <div>
                <h4>
Add New Product
                </h4>
              </div>
            </CardHeader>
            <CardBody>
              <h3>
Product Details
              </h3>
              <Grid container>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Product Name"
                    id="name"
                    dataparent="working"
                    inputProps={{
                      value: productDetails.name,
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
                  <CustomInput
                    labelText="SKU"
                    id="sku"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      value: productDetails.sku,
                      name: "sku",
                      onChange: this.handleChange,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="UPC"
                    id="upc"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      value: productDetails.upc,
                      name: "upc",
                      onChange: this.handleChange,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Product Code"
                    id="code"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      value: productDetails.code,
                      name: "code",
                      onChange: this.handleChange,
                    }}
                  />
                </GridItem>
              </Grid>
              <h3>
Product Associate
              </h3>
              <Grid container>
                <GridItem xs={12} sm={12} md={4}>
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="selectedBrand" className={brandSelect}>
Type or Select Product Brand
                    </InputLabel>
                    <Select2
                      id="selectedBrand"
                      name="selectedBrand"
                      value={selectedBrand}
                      placeholder="Type or Select Product Brand"
                      onChange={this.handleBrandChange}
                      options={brands.map((brand, key) => ({ value: brand.id, label: brand.name }))
                    }
                    />
                  </FormControl>
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="selectedCategory" className={categorySelect}>
Type or Select Collection
                    </InputLabel>
                    <Select2
                      id="selectedCategory"
                      name="selectedCategory"
                      value={selectedCategory}
                      placeholder="Type or Select Product Collection"
                      onChange={this.handleCategoryChange}
                      options={
                        collections
                          .map(collection => ({
                            value: collection.id,
                            label: collection.name.replace(/\^w/, c => c.toUpperCase()),
                          }))
                    }
                    />
                  </FormControl>
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="selectedSubCategory" className={subCategorySelect}>
Type or Select Category
                    </InputLabel>
                    <Select2
                      id="selectedSubCategory"
                      name="selectedSubCategory"
                      value={selectedSubCategory}
                      placeholder="Type or Select Category"
                      onChange={this.handleSubCategoryChange}
                      options={categories
                        .map(category => ({
                          value: category.id,
                          label: category.name.replace(/\^w/, c => c.toUpperCase()),
                        }))
                    }
                    />
                  </FormControl>
                </GridItem>
              </Grid>
              <h3>
Product Description
              </h3>
              <Grid container>
                <GridItem xs={12} sm={12} md={4}>
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="selectedTags" className={tagsSelect}>
Type or Select Product Tags
                    </InputLabel>
                    <Creatable
                      id="selectedOption"
                      name="selectedOption"
                      value={selectedOption}
                      multi
                      placeholder="Type or Select Product Tags"
                      onChange={this.handleTagChange}
                      options={[]}
                    />
                  </FormControl>
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="selectedColors" className={colorsSelect}>
Type or Select Product Colors
                    </InputLabel>
                    <Creatable
                      id="selectedColors"
                      name="selectedColors"
                      value={selectedColors}
                      multi
                      placeholder="Type or Select Product Colors"
                      onChange={this.handleColorChange}
                      options={[]}
                    />
                  </FormControl>
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Unit (eg dozen)"
                    id="unit"
                    formControlProps={{
                      fullWidth: true,
                      required: true,
                    }}
                    inputProps={{
                      type: "text",
                      value: productDetails.descriptionUnit,
                      name: "unit|description",
                      onChange: this.handleChange,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Short Description"
                    id="short_description"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      multiline: true,
                      rows: 3,
                      name: "short|description",
                      value: productDetails.descriptionShort,
                      onChange: this.handleChange,
                    }}
                  />
                </GridItem>

                <GridItem xs={12} sm={12}>
                  <CustomInput
                    labelText="Description"
                    id="description"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      multiline: true,
                      rows: 5,
                      value: productDetails.descriptionLong,
                      name: "long|description",
                      onChange: this.handleChange,
                    }}
                  />
                </GridItem>
              </Grid>

            </CardBody>
            <CardFooter />
          </Card>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(AddPage);
