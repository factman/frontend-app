/*
* @desc the product brands container used by REDUX
* @author Sylvia Onwukwe
*/
import { connect } from "react-redux";
import AdminBrandsComponent from "../../Admin/ProductBrands/brands";
import { fetchProductBrands, deleteProductBrand } from "../../actions/actions_admin_productBrands";

const mapStateToProps = state => ({
  adminBrand: state.adminBrand,
});

const mapDispatchToProps = (dispatch, newProps) => (
  {
    fetchProductBrands: () => {
      dispatch(fetchProductBrands());
    },
    deleteProductBrand: (brandID) => {
      dispatch(deleteProductBrand(brandID));
    },
  }
);

const AdminBrands = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AdminBrandsComponent);

export default AdminBrands;
