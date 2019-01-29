import { connect } from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import ProductBrandComponent from "../../views/Products/Brand/brand";
import {
  postProductBrandDetails,
  fetchProductBrands,
  putProductBrandDetails,
  deleteProductBrand,
} from "../../actions/actions_product_brand";

import {
  postImage,
} from "../../actions/actions_imageupload";


const ProductBrandStyle = {
  cardBrandWhite: {
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
  productBrand: state.productBrand,
});


const mapDispatchToProps = (dispatch, newProps) => ({
  postProductBrandDetails: (brandDetails) => {
    dispatch(postProductBrandDetails(brandDetails));
  },
  fetchProductBrands: () => {
    dispatch(fetchProductBrands());
  },
  putProductBrandDetails: (brandDetails, brandID) => {
    dispatch(putProductBrandDetails(brandDetails, brandID));
  },
  deleteProductBrand: (brandID) => {
    dispatch(deleteProductBrand(brandID));
  },
  postImage: (brandDetails, brandId) => {
    dispatch(postImage(brandDetails, brandId));
  },
});

const ProductBrand = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProductBrandComponent);

export default withStyles(ProductBrandStyle)(ProductBrand);
