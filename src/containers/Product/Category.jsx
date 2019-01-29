import { connect } from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import ProductCategoryComponent from "../../views/Products/Category/category";
import {
  postProductCategoryDetails,
  fetchProductCategories,
  putProductCategoryDetails,
  deleteProductCategory,
} from "../../actions/actions_product_category";

import { fetchProductCollections } from "../../actions/actions_admin_productCategory";

import { postImage } from "../../actions/actions_imageupload";


const ProductCategoryStyle = {
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
  productCategory: state.productCategory,
});


const mapDispatchToProps = (dispatch, newProps) => ({
  postProductCategoryDetails: (categoryDetails) => {
    dispatch(postProductCategoryDetails(categoryDetails));
  },
  fetchProductCategories: () => {
    dispatch(fetchProductCategories());
  },
  fetchProductCollection: () => {
    dispatch(fetchProductCollections());
  },
  putProductCategoryDetails: (categoryDetails, categoryID) => {
    dispatch(putProductCategoryDetails(categoryDetails, categoryID));
  },
  deleteProductCategory: (categoryID) => {
    dispatch(deleteProductCategory(categoryID));
  },
  postImage: (imageDetails, categoryId) => {
    dispatch(postImage(imageDetails, categoryId));
  },
});

const ProductCategory = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProductCategoryComponent);

export default withStyles(ProductCategoryStyle)(ProductCategory);
