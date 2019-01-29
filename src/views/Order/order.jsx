import React from "react";
// @material-ui/core components
import Grid from "@material-ui/core/Grid";
// import TableCell from "@material-ui/core/TableCell";
import Snackbar from "@material-ui/core/Snackbar";
// import GridList from "@material-ui/core/GridList";
// import GridListTile from "@material-ui/core/GridListTile";
// core components
import GridItem from "../../components/Grid/GridItem";
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardBody from "../../components/Card/CardBody";
// import AddNewProductCategory from "./categoryModal";
import BezopSnackBar from "../../assets/jss/bezop-mkr/BezopSnackBar";


import EnhancedTable from "../../bezopComponents/Table/EnhancedTable";
// import SideView from "../../bezopComponents/layout/sideView";
import Validator from "../../helpers/validator";


const columnData = [
  { id: "orderNum", numeric: false, disablePadding: true, label: "Order Number" },
  { id: "amount", numeric: false, disablePadding: true, label: "Amount" },
  { id: "orderStatus", numeric: false, disablePadding: true, label: "Order Status" },
];

const properties = [
  { name: "orderNum", component: true, padding: true, numeric: false, img: false },
  { name: "payable", subname: "amount", component: false, padding: false, numeric: false, img: false },
  { name: "orderStatus", component: false, padding: false, numeric: false, img: false },
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
      // collections: [],
      snackBarOpenSuccess: false,
      snackBarMessageSuccess: "Yet to decide the action",
      // selectedRow: {},
    };
  }

  componentDidMount() {
    const {
      fetchOrders,
    } = this.props;
    // fetchProductCategories();
    // fetchProductCollection();
    fetchOrders();
  }

  componentWillReceiveProps(newProps) {
    if (Validator.propertyExist(newProps, "orders", "getAll")) {
      if (typeof newProps.orders.getAll === "object") {
        this.setState({
          data: newProps.orders.getAll,
        });
      }
    }

    // if (Validator.propertyExist(newProps, "orders", "productCollections")) {
    //   this.setState({
    //     collections: newProps.orders.productCollections,
    //   });
    // }

    // if (Validator.propertyExist(newProps, "orders", "addCategory")) {
    //   if (typeof newProps.orders.addCategory === "string") {
    //     return false;
    //   }
    //   const { data } = this.state;
    //   const newCategories = JSON.parse(JSON.stringify(data));
    //   newCategories.unshift(newProps.orders.addCategory);

    //   this.setState({
    //     data: newCategories,
    //     snackBarOpenSuccess: true,
    //     snackBarMessageSuccess: "You have successfully created product category",
    //   });
    // }

    // if (Validator.propertyExist(newProps, "orders", "updateCategory")) {
    //   if (typeof newProps.orders.updateCategory === "string") {
    //     return false;
    //   }
    //   const { data } = this.state;
    //   const newCategories = JSON.parse(JSON.stringify(data));
    //   const updateCategories = newCategories.map((category) => {
    //     if (newProps.orders.updateCategory.id === category.id) {
    //       return newProps.orders.updateCategory;
    //     }
    //     return category;
    //   });

    //   this.setState({
    //     data: updateCategories,
    //     snackBarOpenSuccess: true,
    //     snackBarMessageSuccess: "You have successfully updated product category",
    //   });
    // }

    // if (Validator.propertyExist(newProps, "orders", "updateImage")) {
    //   if (typeof newProps.orders.updateImage === "string") {
    //     return false;
    //   }
    //   const { data } = this.state;
    //   const newData = data.map((datum) => {
    //     if (datum.id === newProps.orders.updateImage.id) {
    //       return newProps.orders.updateImage;
    //     }
    //     return datum;
    //   });
    //   this.setState({
    //     data: newData,
    //   });
    // }
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

  // editButtonDisplay = (n) => {
  //   // const { orders, putProductCategoryDetails } = this.props;
  //   // const { data, collections } = this.state;
  //   return (
  //     <TableCell>
  //       {/* <AddNewProductCategory
  //         type="edit"
  //         eachData={n}
  //         orders={orders}
  //         collections={collections}
  //         categories={data}
  //         specialMethod={putProductCategoryDetails}
  //       /> */}
  //     </TableCell>
  //   );
  // }

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
    const {
      classes,
      // postProductCategoryDetails,
      // orders,
      postImage,
    } = this.props;
    const {
      data,
      // collections,
      snackBarOpenSuccess,
      snackBarMessageSuccess,
    } = this.state;
    // ,selectedRow
    console.log(data);
    return (
      <Grid container>
        <GridItem xs={12} sm={12} md={12}>
          {/* <GridList
            cellHeight="auto"
            cols={1}
            style={{ height: "fit-content" }}
          >
            <GridListTile style={{ textAlign: "right" }}>
              <AddNewProductCategory
                orders={orders}
                categories={data}
                collections={collections}
                addProductCategory={postProductCategoryDetails}
                type="add"
              />
            </GridListTile>
          </GridList> */}
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
                  tableTitle="All Orders"
                  properties={properties}
                  // editButton={this.editButtonDisplay}
                  onDeleteClickSpec={this.handleDeleteClick}
                  currentSelected={[]}
                  postImage={postImage}
                  collection="category"
                  // getCurrentRowData={this.getCurrentRowData}
                  itemName={{ single: "Order", plural: "Order" }}
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
