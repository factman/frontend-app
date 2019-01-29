import { connect } from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import productStyle from "../assets/jss/material-kit-react/views/landingPageSections/productStyle";
import SearchPageComponent from "../views/LandingPage/Sections/ListSearch";
import {
  fetchVendors,
  fetchProducts,
  fetchCategories,
  fetchBrands,
  fetchBlogs,
} from "../actions/actions_search";

const mapStateToProps = state => ({
  search: state.search,
});

const mapDispatchToProps = dispatch => ({
  fetchVendors: query => dispatch(fetchVendors(query)),
  fetchProducts: query => dispatch(fetchProducts(query)),
  fetchCategories: query => dispatch(fetchCategories(query)),
  fetchBrands: query => dispatch(fetchBrands(query)),
  fetchBlogs: query => dispatch(fetchBlogs(query)),
});

const SearchPage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchPageComponent);
export default withStyles(productStyle, { withTheme: true })(SearchPage);
