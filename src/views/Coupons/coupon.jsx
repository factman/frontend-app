import React from "react";
// @material-ui/core components
import Grid from "@material-ui/core/Grid";
// core components
import GridItem from "../../components/Grid/GridItem";
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardBody from "../../components/Card/CardBody";
import CreateCoupon from "./createbutton";
import EnhancedTable from "../../bezopComponents/Table/EnhancedTable";
import { TableCell, Snackbar } from "../../../node_modules/@material-ui/core";
import BezopSnackBar from "../../assets/jss/bezop-mkr/BezopSnackBar";
import Validator from "../../helpers/validator";

const columnData = [
  { id: "title", numeric: false, disablePadding: true, label: "Coupon Title" },
  { id: "code", numeric: false, disablePadding: true, label: "Coupon Code" },
  { id: "amount", numeric: false, disablePadding: true, label: "Coupon Amount" },
  { id: "till", numeric: false, disablePadding: true, label: "Valid Date" },
  { id: "standing", numeric: false, disablePadding: true, label: "Status" },
];

const properties = [
  { name: "title", component: true, padding: true, numeric: false },
  { name: "code", component: false, padding: false, numeric: false },
  { name: "amount", component: false, padding: false, numeric: false },
  { name: "till", component: false, padding: false, numeric: false, date: true },
  { name: "standing", component: false, padding: false, numeric: false },
];

const couponDetails = {
  title: "",
  code: "",
  amount: 0,
  till: "",
};

class Coupons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      snackBarMessageSuccess: "SnackBar Message",
      snackBarOpenSuccess: false,
      variantSnackBar: "success",
    };
  }

  componentDidMount() {
    const { fetchCoupons } = this.props;
    fetchCoupons();
  }

  componentWillReceiveProps(newProps) {
    if (
      Validator.propertyExist(newProps, "coupon", "getCoupon")
    && typeof newProps.coupon.getCoupon === "object"
    ) {
      this.setState({
        data: newProps.coupon.getCoupon,
      });
    }

    if (Validator.propertyExist(newProps, "coupon", "addCoupon")) {
      if (typeof newProps.coupon.addCoupon === "string") {
        return false;
      }
      const { data } = this.state;
      // Stringify and parsing all coupons
      const newCoupons = JSON.parse(JSON.stringify(data));
      // Added the new coupon as the first element
      newCoupons.unshift(newProps.coupon.addCoupon);
      this.setState({
        data: newCoupons,
        snackBarOpenSuccess: true,
        variantSnackBar: "success",
        snackBarMessageSuccess: "You have successfully added a new Coupon",
      });
    }

    if (Validator.propertyExist(newProps, "coupon", "updateCoupon")) {
      if (typeof newProps.coupon.updateCoupon === "string") {
        return false;
      }
      const { data } = this.state;
      // Stringify and parsing all coupons
      const newCoupons = JSON.parse(JSON.stringify(data));
      // Added the new coupon as the first element
      console.log(newCoupons);
      const updatedCoupons = newCoupons.map((coupon) => {
        if (coupon.id === newProps.coupon.updateCoupon.id) {
          return newProps.coupon.updateCoupon;
        }
        return coupon;
      });
      this.setState({
        data: updatedCoupons,
        snackBarOpenSuccess: true,
        variantSnackBar: "success",
        snackBarMessageSuccess: "You have successfully updated the Coupon",
      });
    }
    return false;
  }

  onCloseHandlerSuccess = () => {
    this.setState({
      snackBarOpenSuccess: false,
    });
  }

  editButtonDisplay = (n) => {
    const { coupon, putCouponDetails } = this.props;
    const updateCouponDetails = {
      title: Validator.propertyExist(n, "title") ? n.title : "",
      code: Validator.propertyExist(n, "code") ? n.code : "",
      amount: Validator.propertyExist(n, "amount") ? n.amount : "",
      till: Validator.propertyExist(n, "till") ? n.till.match(/^\d{4}[/-]\d{2}[/-]\d{2}/)[0] : "",
    };
    return (
      <TableCell>
        <CreateCoupon
          type="edit"
          putCouponDetails={putCouponDetails}
          coupon={coupon}
          couponDetails={updateCouponDetails}
          eachData={n}
        />
      </TableCell>
    );
  }

  handleDeleteClick = (couponIDs) => {
    const { data } = this.state;
    const { deleteCoupon } = this.props;
    couponIDs.forEach((couponID, index) => {
      deleteCoupon(couponID);
      if ((index + 1) === couponIDs.length) {
        const newData = data.filter(datum => couponIDs.indexOf(datum.id) === -1);
        this.setState({
          data: newData,
          snackBarOpenSuccess: true,
          snackBarMessageSuccess: `You have successfully deleted ${couponIDs.length} ${couponIDs.length === 1 ? "coupon" : "coupons"}`,
        });
      }
    });
  }

  render() {
    const { classes, postCouponDetails, coupon } = this.props;
    const { data, snackBarMessageSuccess, snackBarOpenSuccess, variantSnackBar } = this.state;

    return (
      <Grid container>
        <GridItem xs={12} md={10} />
        <GridItem xs={6} md={2}>
          <CreateCoupon
            type="add"
            postCouponDetails={postCouponDetails}
            coupon={coupon}
            couponDetails={couponDetails}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>
                Discount Coupons
              </h4>
              <p className={classes.cardCategoryWhite}>
                Manage Discounts
              </p>
            </CardHeader>
            <CardBody>
              <EnhancedTable
                orderBy="title"
                columnData={columnData}
                data={data}
                tableTitle="All Discount Coupons"
                properties={properties}
                editButton={this.editButtonDisplay}
                onDeleteClickSpec={this.handleDeleteClick}
                currentSelected={[]}
                collection="coupon"
                itemName={{ single: "Coupon", plural: "Coupons" }}
                id="id"
              />
            </CardBody>
          </Card>
        </GridItem>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={snackBarOpenSuccess}
          onClose={this.onCloseHandlerSuccess}
        >
          <BezopSnackBar
            onClose={this.onCloseHandlerSuccess}
            variant={variantSnackBar}
            message={snackBarMessageSuccess}
          />
        </Snackbar>
      </Grid>
    );
  }
}

export default Coupons;
