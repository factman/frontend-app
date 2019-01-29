import React from "react";
// @material-ui/core components
import Grid from "@material-ui/core/Grid";
import TableCell from "@material-ui/core/TableCell";
import Snackbar from "@material-ui/core/Snackbar";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
// core components
import GridItem from "../../../components/Grid/GridItem";
import Card from "../../../components/Card/Card";
import CardHeader from "../../../components/Card/CardHeader";
import CardBody from "../../../components/Card/CardBody";
import AddNewProductCategory from "./categoryModal";
import BezopSnackBar from "../../../assets/jss/bezop-mkr/BezopSnackBar";


import EnhancedTable from "../../../bezopComponents/Table/EnhancedTable";
// import SideView from "../../../bezopComponents/layout/sideView";
import Validator from "../../../helpers/validator";


const columnData = [
  { id: "name", numeric: false, disablePadding: true, label: "Product Category" },
  { id: "kind", numeric: false, disablePadding: true, label: "Category Kind" },
  { id: "description", numeric: false, disablePadding: true, label: "Description" },
  { id: "icon", numeric: false, disablePadding: true, label: "Thumbnail" },
  { id: "banner", numeric: false, disablePadding: true, label: "Banner" },
];

const properties = [
  { name: "name", component: true, padding: true, numeric: false, img: false },
  { name: "kind", component: false, padding: false, numeric: false, img: false, ucword: true },
  { name: "description", component: false, padding: false, numeric: false, img: false },
  { name: "icon", component: false, padding: false, numeric: false, img: true, width: 500, height: 500 },
  { name: "banner", component: false, padding: false, numeric: false, img: true, width: 1200, height: 400 },
];

// const contentPropertiesDisplay = [
//   { name: "name", label: "Name" },
//   { name: "kind", label: "Kind" },
//   { name: "description", label: "Decription" },
//   { name: "vendor", subname: "businessName", label: "Business Name" },
//   { name: "vendor", subname: "domainName", label: "Domain Name" },
// ];

// const imagePropertiesDisplay = [
//   { name: "icon", img: true, width: 500, height: 500 },
//   { name: "banner", img: true, width: 1024, height: 576 },
// ];

class Category extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      collections: [],
      snackBarOpenSuccess: false,
      snackBarMessageSuccess: "Yet to decide the action",
      // selectedRow: {},
    };
  }

  componentDidMount() {
    const { fetchProductCategories, fetchProductCollection } = this.props;
    fetchProductCategories();
    fetchProductCollection();
  }

  componentWillReceiveProps(newProps) {
    if (Validator.propertyExist(newProps, "productCategory", "categories")) {
      this.setState({
        data: newProps.productCategory.categories,
      });
    }

    if (Validator.propertyExist(newProps, "productCategory", "productCollections")) {
      this.setState({
        collections: newProps.productCategory.productCollections,
      });
    }

    if (Validator.propertyExist(newProps, "productCategory", "addCategory")) {
      if (typeof newProps.productCategory.addCategory === "string") {
        return false;
      }
      const { data } = this.state;
      const newCategories = JSON.parse(JSON.stringify(data));
      newCategories.unshift(newProps.productCategory.addCategory);

      this.setState({
        data: newCategories,
        snackBarOpenSuccess: true,
        snackBarMessageSuccess: "You have successfully created product category",
      });
    }

    if (Validator.propertyExist(newProps, "productCategory", "updateCategory")) {
      if (typeof newProps.productCategory.updateCategory === "string") {
        return false;
      }
      const { data } = this.state;
      const newCategories = JSON.parse(JSON.stringify(data));
      const updateCategories = newCategories.map((category) => {
        if (newProps.productCategory.updateCategory.id === category.id) {
          return newProps.productCategory.updateCategory;
        }
        return category;
      });

      this.setState({
        data: updateCategories,
        snackBarOpenSuccess: true,
        snackBarMessageSuccess: "You have successfully updated product category",
      });
    }

    if (Validator.propertyExist(newProps, "productCategory", "updateImage")) {
      if (typeof newProps.productCategory.updateImage === "string") {
        return false;
      }
      const { data } = this.state;
      const newData = data.map((datum) => {
        if (datum.id === newProps.productCategory.updateImage.id) {
          return newProps.productCategory.updateImage;
        }
        return datum;
      });
      this.setState({
        data: newData,
      });
    }
    return false;
  }

  onCloseHandlerSuccess = () => {
    this.setState({
      snackBarOpenSuccess: false,
    });
  }

  // getCurrentRowData = (n) => {
  //   this.setState({
  //     selectedRow: n,
  //   });
  // }

  editButtonDisplay = (n) => {
    const { productCategory, putProductCategoryDetails } = this.props;
    const { data, collections } = this.state;
    return (
      <TableCell>
        <AddNewProductCategory
          type="edit"
          eachData={n}
          productCategory={productCategory}
          collections={collections}
          categories={data}
          specialMethod={putProductCategoryDetails}
        />
      </TableCell>
    );
  }

  handleDeleteClick = (categoryIDs) => {
    const { deleteProductCategory } = this.props;
    const { data } = this.state;
    categoryIDs.forEach((categoryID, index) => {
      deleteProductCategory(categoryID);
      if ((index + 1) === categoryIDs.length) {
        const newData = data.filter(datum => categoryIDs.indexOf(datum.id) === -1);
        this.setState({
          data: newData,
          snackBarOpenSuccess: true,
          snackBarMessageSuccess: `You have successfully deleted ${categoryIDs.length} product ${categoryIDs.length === 1 ? "category" : "categories"}`,
        });
      }
    });
  }

  render() {
    const { classes, postProductCategoryDetails, productCategory, postImage } = this.props;
    const { data, collections, snackBarOpenSuccess, snackBarMessageSuccess } = this.state;
    // ,selectedRow
    return (
      <Grid container>
        <GridItem xs={12} sm={12} md={12}>
          <GridList
            cellHeight="auto"
            cols={1}
            style={{ height: "fit-content" }}
          >
            <GridListTile style={{ textAlign: "right" }}>
              <AddNewProductCategory
                productCategory={productCategory}
                categories={data}
                collections={collections}
                addProductCategory={postProductCategoryDetails}
                type="add"
              />
            </GridListTile>
          </GridList>
          <Card>
            <div>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>
                  All Category
                </h4>
                <p className={classes.cardCategoryWhite}>
                  List of All Categories
                </p>
              </CardHeader>
              <CardBody>
                <EnhancedTable
                  orderBy="name"
                  columnData={columnData}
                  data={data}
                  tableTitle="All Product Category"
                  properties={properties}
                  editButton={this.editButtonDisplay}
                  onDeleteClickSpec={this.handleDeleteClick}
                  currentSelected={[]}
                  postImage={postImage}
                  collection="category"
                  // getCurrentRowData={this.getCurrentRowData}
                  itemName={{ single: "Product Category", plural: "Product Categories" }}
                  id="id"
                />
              </CardBody>
            </div>
          </Card>
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={snackBarOpenSuccess}
            onClose={this.onCloseHandlerSuccess}
          >
            <BezopSnackBar
              onClose={this.onCloseHandlerSuccess}
              variant="success"
              message={snackBarMessageSuccess}
            />
          </Snackbar>
        </GridItem>
        {/* <GridItem xs={12} sm={12} md={4}>
          <SideView
            selectedRow={selectedRow}
           // contentPropertiesDisplay={contentPropertiesDisplay}
            imagePropertiesDisplay={imagePropertiesDisplay}
            postImage={postImage}
            collection="category"
          />
        </GridItem> */}
      </Grid>
    );
  }
}

export default Category;
