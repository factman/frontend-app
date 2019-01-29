import React from "react";
// @material-ui/core components
import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";
import Search from "@material-ui/icons/Search";
import Snackbar from "@material-ui/core/Snackbar";
import TableCell from "@material-ui/core/TableCell";
// core components
import GridItem from "../../components/Grid/GridItem";
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardBody from "../../components/Card/CardBody";
import CustomInput from "../../components/CustomInput/CustomInput";
import BezopSnackBar from "../../assets/jss/bezop-mkr/BezopSnackBar";
import EnhancedTable from "../../bezopComponents/Table/EnhancedTable";
import ProductModal from "./modalProducts";
import Validator from "../../helpers/validator";

const columnData = [
  { id: "name", numeric: false, disablePadding: true, label: "Product Name" },
  { id: "code", numeric: false, disablePadding: true, label: "Product Code" },
  { id: "brand", numeric: false, disablePadding: true, label: "Brand" },
  { id: "category", numeric: false, disablePadding: true, label: "Category" },
  { id: "vendor", numeric: false, disablePadding: true, label: "Vendor" },
  { id: "unitPrice", numeric: false, disablePadding: true, label: "Unit Price" },
  { id: "standing", numeric: false, disablePadding: true, label: "Status" },
];

const properties = [
  { name: "name", component: true, padding: true, numeric: false, img: false },
  { name: "code", component: true, padding: true, numeric: false, img: false },
  { name: "brand", component: false, padding: false, numeric: false, img: false, subname: "name" },
  { name: "category", parent: "main", grandChild: "name", component: false, padding: false, numeric: false, img: false },
  { name: "vendor", component: true, padding: true, numeric: false, img: false, subname: "domainName" },
  { name: "price", subname: "unitPrice", component: true, padding: true, numeric: false, img: false },
  { name: "standing", component: true, padding: true, numeric: false, img: false },
];


class AdminProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      brands: [],
      vendors: [],
      data: [],
      snackBarOpenSuccess: false,
      snackBarMessageSuccess: "",
    };
  }

  componentDidMount() {
    const {
      fetchProduct,
      fetchProductCategories,
      fetchProductBrands,
      fetchVendors,
    } = this.props;
    fetchProductBrands();
    fetchProductCategories();
    fetchVendors();
    fetchProduct();
  }

  componentWillReceiveProps(newProps) {
    if (Validator.propertyExist(newProps.adminProduct, "getAll")
    && typeof newProps.adminProduct.getAll === "object") {
      this.setState({
        data: newProps.adminProduct.getAll,
      });
    }

    if (Validator.propertyExist(newProps.adminProduct, "productCategories")
    && typeof newProps.adminProduct.productCategories === "object") {
      this.setState({
        categories: newProps.adminProduct.productCategories,

      });
    }
    if (Validator.propertyExist(newProps.adminProduct, "productBrands")
    && typeof newProps.adminProduct.productBrands === "object") {
      this.setState({
        brands: newProps.adminProduct.productBrands,
      });
    }

    if (Validator.propertyExist(newProps.adminProduct, "vendors")
    && typeof newProps.adminProduct.vendors === "object") {
      this.setState({
        vendors: newProps.adminProduct.vendors,
      });
    }
    return false;
  }

  onCloseHandlerSuccess = () => {
    this.setState({
      snackBarOpenSuccess: false,
    });
  }

  viewItem = (n) => {
    const {
      adminProduct,
      patchProduct,
    } = this.props;
    const {
      brands,
      categories,
      vendors,
    } = this.state;
    return (
      <TableCell>
        <ProductModal
          type="view"
          eachData={n}
          categories={categories}
          brands={brands}
          vendors={vendors}
          adminProduct={adminProduct}
          patchProduct={patchProduct}
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
          snackBarOpenSuccess: true,
          snackBarMessageSuccess: `You have successfully deleted ${productIDs.length} product ${productIDs.length === 1 ? "product" : "products"}`,
        });
      }
    });
  }

  render() {
    const {
      data,
      snackBarOpenSuccess,
      snackBarMessageSuccess,
      categories,
      brands,
      vendors,
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
                vendors={vendors}
                tableTitle="All Product"
                properties={properties}
                onDeleteClickSpec={this.handleDeleteClick}
                currentSelected={[]}
                viewItem={this.viewItem}
                itemName={{ single: "Product", plural: "Products" }}
              />
            </CardBody>
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
      </Grid>
    );
  }
}

export default AdminProducts;
