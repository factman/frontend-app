/*
*@desc the container of the Discount Coupon used by REDUX
*@author Sylvia Onwukwe
*/
import { connect } from "react-redux";
import DiscountCouponComponent from "../../Admin/DiscountCoupon/discountCoupon";
import { fetchCoupons, deleteCoupon } from "../../actions/actions_admin_coupon";
import { fetchVendors } from "../../actions/actions_admin_vendor";

const mapStateToProps = state => ({
  adminCoupon: state.adminCoupon,
});
const mapDispatchToProps = (dispatch, newProps) => ({
  fetchCoupons: () => {
    dispatch(fetchCoupons());
  },
  fetchVendors: () => {
    dispatch(fetchVendors());
  },
  deleteCoupon: (couponID) => {
    dispatch(deleteCoupon(couponID));
  },
});

const DiscountCoupon = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DiscountCouponComponent);

export default DiscountCoupon;
