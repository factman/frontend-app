import { connect } from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import ProductsComponent from "../../views/Products/products";
import {
  postProductDetails,
  fetchProducts,
  putProductDetails,
  deleteProduct,
} from "../../actions/actions_product";
import { fetchProductBrands } from "../../actions/actions_product_brand";

import { fetchProductCategories } from "../../actions/actions_product_category";

import { fetchProductCollections } from "../../actions/actions_admin_productCategory";

import { postImage } from "../../actions/actions_imageupload";

const ProductsStyle = {
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
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
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
  product: state.product,
});

const mapDispatchToProps = (dispatch, newProps) => ({
  postProductDetails: (productDetails) => {
    dispatch(postProductDetails(productDetails));
  },
  putProductDetails: (productDetails, productID) => {
    dispatch(putProductDetails(productDetails, productID));
  },
  deleteProduct: (productID) => {
    dispatch(deleteProduct(productID));
  },
  fetchProducts: () => {
    dispatch(fetchProducts());
  },
  fetchProductCategories: () => {
    dispatch(fetchProductCategories());
  },
  fetchProductCollections: () => {
    dispatch(fetchProductCollections());
  },
  fetchProductBrands: () => {
    dispatch(fetchProductBrands());
  },
  postImage: (imageDetails, collectionId) => {
    dispatch(postImage(imageDetails, collectionId));
  },
});

const Products = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProductsComponent);

export default withStyles(ProductsStyle)(Products);
