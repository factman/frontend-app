import { connect } from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import AdminProductCategoryComponent from "../../Admin/ProductCategory/category";
import {
  fetchProductCollections,
  postProductCategoryDetails,
  putProductCategoryDetails,
  deleteProductCategory,
} from "../../actions/actions_admin_productCategory";

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
  adminCategory: state.adminCategory,
});
const mapDispatchToProps = (dispatch, newProps) => ({
  fetchProductCategories: () => {
    dispatch(fetchProductCollections());
  },
  postProductCategoryDetails: (productCategoryDetails) => {
    dispatch(postProductCategoryDetails(productCategoryDetails));
  },
  putProductCategoryDetails: (productCategoryDetails, categoryId) => {
    dispatch(putProductCategoryDetails(productCategoryDetails, categoryId));
  },
  deleteProductCategory: (categoryID) => {
    dispatch(deleteProductCategory(categoryID));
  },
  postImage: (imageDetails, categoryId) => {
    dispatch(postImage(imageDetails, categoryId));
  },
});

const AdminProductCategory = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AdminProductCategoryComponent);

export default withStyles(ProductCategoryStyle)(AdminProductCategory);
