import { connect } from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import ProductStocksComponent from "../../views/Products/Stock/stock";
import {
  postProductStockDetails,
  fetchProductStocks,
} from "../../actions/actions_product_stock";

import { fetchProducts } from "../../actions/actions_product";

const ProductStocksStyle = {
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
  productStock: state.productStock,
});

const mapDispatchToProps = (dispatch) => {
  const dispatchObject = {
    postProductStockDetails: (productStockDetails) => {
      dispatch(postProductStockDetails(productStockDetails));
    },
    fetchProductStocks: () => {
      dispatch(fetchProductStocks());
    },
    fetchProducts: () => {
      dispatch(fetchProducts());
    },
  };

  return dispatchObject;
};

const ProductStocks = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProductStocksComponent);

export default withStyles(ProductStocksStyle)(ProductStocks);
