import React from "react";
// @material-ui/core components
import Grid from "@material-ui/core/Grid";
import TableCell from "@material-ui/core/TableCell";
import Snackbar from "@material-ui/core/Snackbar";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
// core components
import GridItem from "../../components/Grid/GridItem";
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardBody from "../../components/Card/CardBody";
import AddNewProductCategory from "./categoryModal";
import BezopSnackBar from "../../assets/jss/bezop-mkr/BezopSnackBar";


import EnhancedTable from "../../bezopComponents/Table/EnhancedTable";
// import SideView from "../../bezopComponents/layout/sideView";
import Validator from "../../helpers/validator";


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
  { name: "banner", component: false, padding: false, numeric: false, img: true, width: 1024, height: 576 },
];

const categoryDetails = {
  name: "",
  description: "",
  parent: "0",
  kind: "",
};

class Category extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      snackBarOpenSuccess: false,
      snackBarMessageSuccess: "Yet to decide the action",
    };
  }

  componentDidMount() {
    const { fetchProductCategories } = this.props;
    fetchProductCategories();
  }

  componentWillReceiveProps(newProps) {
    if (Validator.propertyExist(newProps, "adminCategory", "categories")) {
      this.setState({
        data: newProps.adminCategory.categories,
      });
    }

    if (Validator.propertyExist(newProps, "adminCategory", "addCategory")) {
      if (typeof newProps.adminCategory.addCategory === "string") {
        return false;
      }
      const { data } = this.state;
      const newCategories = JSON.parse(JSON.stringify(data));
      newCategories.unshift(newProps.adminCategory.addCategory);

      this.setState({
        data: newCategories,
        snackBarOpenSuccess: true,
        snackBarMessageSuccess: "You have successfully created product category",
      });
    }

    if (Validator.propertyExist(newProps, "adminCategory", "updateCategory")) {
      if (typeof newProps.adminCategory.updateCategory === "string") {
        return false;
      }
      const { data } = this.state;
      const newCategories = JSON.parse(JSON.stringify(data));
      const updateCategories = newCategories.map((category) => {
        if (newProps.adminCategory.updateCategory.id === category.id) {
          return newProps.adminCategory.updateCategory;
        }
        return category;
      });

      this.setState({
        data: updateCategories,
        snackBarOpenSuccess: true,
        snackBarMessageSuccess: "You have successfully updated product category",
      });
    }

    if (Validator.propertyExist(newProps, "adminCategory", "updateImage")) {
      if (typeof newProps.adminCategory.updateImage === "string") {
        return false;
      }
      const { data } = this.state;
      const newData = data.map((datum) => {
        if (datum.id === newProps.adminCategory.updateImage.id) {
          return newProps.adminCategory.updateImage;
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

  getCurrentRowData = (n) => {
    // console.log(n);
  }

  editButtonDisplay = (n) => {
    const { adminCategory, putProductCategoryDetails } = this.props;
    const { data } = this.state;
    const updateCategoryDetails = {
      name: Validator.propertyExist(n, "name") ? n.name : "",
      description: Validator.propertyExist(n, "description") ? n.description : "",
      parent: n.parent,
      kind: Validator.propertyExist(n, "kind") ? n.kind : "",
    };
    return (
      <TableCell>
        <AddNewProductCategory
          type="edit"
          eachData={n}
          adminCategory={adminCategory}
          categories={data}
          categoryDetails={updateCategoryDetails}
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
    const { classes, postProductCategoryDetails, adminCategory, postImage } = this.props;
    const { data, snackBarOpenSuccess, snackBarMessageSuccess } = this.state;
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
                adminCategory={adminCategory}
                categories={data}
                addProductCategory={postProductCategoryDetails}
                categoryDetails={categoryDetails}
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
                  collection="collection"
                  getCurrentRowData={this.getCurrentRowData}
                  itemName={{ single: "Product Category", plural: "Product Categories" }}
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
          <SideView />
        </GridItem> */}
      </Grid>
    );
  }
}

export default Category;
