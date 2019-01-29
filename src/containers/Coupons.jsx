import { connect } from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import CouponsComponent from "../views/Coupons/coupon";
import { fetchCoupons, postCouponDetails, putCouponDetails, deleteCoupon } from "../actions/actions_vendor_coupon";


const CouponsStyle = {
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
  coupon: state.vendorCoupon,
});

const mapDispatchToProps = (dispatch, newProps) => ({
  fetchCoupons: () => {
    dispatch(fetchCoupons());
  },
  postCouponDetails: (couponDetails) => {
    dispatch(postCouponDetails(couponDetails));
  },
  putCouponDetails: (couponDetails, couponId) => {
    dispatch(putCouponDetails(couponDetails, couponId));
  },
  deleteCoupon: (couponId) => {
    dispatch(deleteCoupon(couponId));
  },
});

const Coupons = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CouponsComponent);

export default withStyles(CouponsStyle)(Coupons);
