import { connect } from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import AdminProductsComponent from "../../Admin/Products/products";
import {
  fetchProduct,
  deleteProduct,
  patchProduct,
} from "../../actions/actions_admin_product";

import { fetchProductBrands } from "../../actions/actions_admin_productBrands";

import { fetchProductCollections } from "../../actions/actions_admin_productCategory";

import { fetchVendors } from "../../actions/actions_admin_vendor";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "white",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0",
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF",
    },
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "Roboto, Helvetica, Arial, sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1",
    },
  },
};

const mapStateToProps = state => ({
  adminProduct: state.adminProduct,
});

const mapDispatchToProps = dispatch => (
  {
    fetchProduct: () => {
      dispatch(fetchProduct());
    },
    fetchProductCategories: () => {
      dispatch(fetchProductCollections());
    },
    fetchProductBrands: () => {
      dispatch(fetchProductBrands());
    },
    fetchVendors: () => {
      dispatch(fetchVendors());
    },
    deleteProduct: (productID) => {
      dispatch(deleteProduct(productID));
    },
    patchProduct: (productDetails, productID) => {
      dispatch(patchProduct(productDetails, productID));
    },
  }
);

const AdminProducts = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AdminProductsComponent);

export default withStyles(styles)(AdminProducts);
