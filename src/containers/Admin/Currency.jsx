import { connect } from "react-redux";
import CurrencyComponent from "../../Admin/Currency/currency";
import {
  postStoreCurrency,
  fetchStoreCurrencies,
  putStoreCurrency,
  deleteStoreCurrency,
} from "../../actions/actions_admin_currency";

import {
  postImage,
} from "../../actions/actions_imageupload";

const mapStateToProps = state => ({
  adminCurrency: state.adminCurrency,
});

const mapDispatchToProps = (dispatch, newProps) => ({
  postStoreCurrency: (storeCurrency) => {
    dispatch(postStoreCurrency(storeCurrency));
  },
  fetchStoreCurrencies: () => {
    dispatch(fetchStoreCurrencies());
  },
  putStoreCurrency: (storeCurrency, currencyID) => {
    dispatch(putStoreCurrency(storeCurrency, currencyID));
  },
  deleteStoreCurrency: (currencyID) => {
    dispatch(deleteStoreCurrency(currencyID));
  },
  postImage: (collectionDetails, collectionId) => {
    dispatch(postImage(collectionDetails, collectionId, "admin"));
  },
});

const Currency = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CurrencyComponent);

export default Currency;
