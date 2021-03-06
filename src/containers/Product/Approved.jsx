import { connect } from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import ApprovalProductsComponent from "../../views/Products/Approved/products";
import {
  approveProduct,
  fetchProducts,
  fetchApprovedProducts,
} from "../../actions/actions_product";
import { fetchProductBrands } from "../../actions/actions_product_brand";

import { fetchProductCategories } from "../../actions/actions_product_category";

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

const mapDispatchToProps = dispatch => ({
  approveProduct: (productDetails) => {
    dispatch(approveProduct(productDetails));
  },
  fetchProducts: (unapproved) => {
    dispatch(fetchProducts(unapproved));
  },
  fetchApprovedProducts: (unapproved) => {
    dispatch(fetchApprovedProducts(unapproved));
  },
  fetchProductCategories: () => {
    dispatch(fetchProductCategories());
  },
  fetchProductBrands: () => {
    dispatch(fetchProductBrands());
  },
});

const Products = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ApprovalProductsComponent);

export default withStyles(ProductsStyle)(Products);
