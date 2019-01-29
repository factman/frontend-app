import React from "react";
// @material-ui/core components
import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";
import Search from "@material-ui/icons/Search";
import Snackbar from "@material-ui/core/Snackbar";
import TableCell from "@material-ui/core/TableCell";
// core components
import GridItem from "../../../components/Grid/GridItem";
import Card from "../../../components/Card/Card";
import CardHeader from "../../../components/Card/CardHeader";
import CardBody from "../../../components/Card/CardBody";
import CustomInput from "../../../components/CustomInput/CustomInput";
import BezopSnackBar from "../../../assets/jss/bezop-mkr/BezopSnackBar";
import EnhancedTable from "../../../bezopComponents/Table/EnhancedTable";
import ProductModal from "./modal";
import Validator from "../../../helpers/validator";
import { getJsonString } from "../../../helpers/logic";

const columnData = [
  { id: "product", numeric: false, disablePadding: true, label: "Product Name" },
  { id: "approved", numeric: false, disablePadding: true, label: "Status" },
  { id: "comment", numeric: false, disablePadding: true, label: "Comment" },
];

const properties = [
  { name: "product", subname: "name", component: true, padding: true, numeric: false, img: false },
  { name: "approved", component: true, padding: true, numeric: false, img: false },
  { name: "comment", component: true, padding: true, numeric: false, img: false },
];


class AdminProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      brands: [],
      data: [],
      snackBarOpen: false,
      snackBarMessage: "",
    };
  }

  componentDidMount() {
    const {
      fetchApprovedProducts,
      fetchProductCategories,
      fetchProductBrands,
    } = this.props;
    fetchApprovedProducts();
    fetchProductBrands();
    fetchProductCategories();
  }

  componentWillReceiveProps(newProps) {
    if (Validator.propertyExist(newProps.product, "getAll")
    && typeof newProps.product.getAll === "object") {
      this.setState({
        data: newProps.product.getAll,
      });
    }

    if (Validator.propertyExist(newProps.product, "productCategories")
    && typeof newProps.product.productCategories === "object") {
      this.setState({
        categories: newProps.product.productCategories,
      });
    }
    if (Validator.propertyExist(newProps.product, "productBrands")
    && typeof newProps.product.productBrands === "object") {
      this.setState({
        brands: newProps.product.productBrands,
      });
    }

    if (Validator.propertyExist(newProps, "product", "approvedProduct")) {
      if (typeof newProps.product.approvedProduct === "string") {
        return false;
      }
      const { data } = this.state;
      const newProducts = JSON.parse(JSON.stringify(data));
      const updateProducts = newProducts.map((product) => {
        if (newProps.product.approvedProduct.id === product.id) {
          return { ...product, ...{ approval: newProps.product.approvedProduct.approval } };
        }
        return product;
      });
      this.setState({
        data: updateProducts,
        snackBarOpen: true,
        snackBarMessage: "You have successfully approve product",
      });
    }
    return false;
  }

  onCloseHandler = () => {
    this.setState({
      snackBarOpen: false,
    });
  }

  viewItem = (n) => {
    const {
      product,
      approveProduct,
    } = this.props;
    const {
      brands,
      categories,
    } = this.state;
    const approveProductDetails = {
      product: Validator.propertyExist(n.product, "id") ? n.product.id : "",
      vendor: Validator.propertyExist(getJsonString(localStorage["bezop-login:vendor"], "profile"), "id")
        ? getJsonString(localStorage["bezop-login:vendor"], "profile").id : "",
      comment: Validator.propertyExist(n, "comment") ? n.comment : "",
      approved: Validator.propertyExist(n, "approved") ? n.approved : "pending",
    };
    return (
      <TableCell>
        <ProductModal
          type="view"
          eachData={n.product}
          categories={categories}
          brands={brands}
          product={product}
          approveProduct={approveProduct}
          approveProductDetails={approveProductDetails}
        />
      </TableCell>
    );
  }

  handleDeleteClick = (productIDs) => {
    const { deleteProducts } = this.props;
    const { data } = this.state;
    productIDs.forEach((productID, index) => {
      deleteProducts(productID);
      if ((index + 1) === productIDs.length) {
        const newData = data.filter(datum => productIDs.indexOf(datum.id) === -1);
        this.setState({
          data: newData,
          snackBarOpen: true,
          snackBarMessage: `You have successfully deleted ${productIDs.length} product ${productIDs.length === 1 ? "product" : "products"}`,
        });
      }
    });
  }

  render() {
    const {
      data,
      snackBarOpen,
      snackBarMessage,
      categories,
      brands,
    } = this.state;
    return (
      <Grid container>
        <GridItem xs={12} md={10} />
        <GridItem xs={6} md={2}>
          <CustomInput
            labelText="Search..."
            id="product_search"
            primary
            formControlProps={{
              fullWidth: false,
            }}
            inputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4>
                All Products
              </h4>
              <p>
                List of All Products
              </p>
            </CardHeader>
            <CardBody>
              <EnhancedTable
                orderBy="name"
                columnData={columnData}
                data={data}
                categories={categories}
                brands={brands}
                tableTitle="All Product"
                properties={properties}
                onDeleteClickSpec={this.handleDeleteClick}
                currentSelected={[]}
                viewItem={this.viewItem}
                itemName={{ single: "Product", plural: "Products" }}
                id="id"
              />
            </CardBody>
          </Card>
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={snackBarOpen}
            onClose={this.onCloseHandler}
          >
            <BezopSnackBar
              onClose={this.onCloseHandler}
              variant="success"
              message={snackBarMessage}
            />
          </Snackbar>
        </GridItem>
      </Grid>
    );
  }
}

export default AdminProducts;
