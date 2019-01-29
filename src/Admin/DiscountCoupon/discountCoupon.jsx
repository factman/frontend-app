import React from "react";
// @material-ui/core components
import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";
import Search from "@material-ui/icons/Search";
import Snackbar from "@material-ui/core/Snackbar";
// core components
import GridItem from "../../components/Grid/GridItem";
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardBody from "../../components/Card/CardBody";
import CustomInput from "../../components/CustomInput/CustomInput";
import BezopSnackBar from "../../assets/jss/bezop-mkr/BezopSnackBar";


import EnhancedTable from "../../bezopComponents/Table/EnhancedTable";
import Validator from "../../helpers/validator";

const columnData = [
  { id: "title", numeric: false, disablePadding: true, label: "Title" },
  { id: "vendor", numeric: false, disablePadding: true, label: "Vendors" },
  { id: "till", numeric: false, disablePadding: true, label: "Valid Till" },
];

const properties = [{ name: "title", component: true, padding: true, numeric: false, img: false },
  { name: "vendor", component: true, padding: true, numeric: false, img: false, vendorMap: true },
  { name: "till", component: true, padding: true, numeric: false, img: false, date: true },
];


class DiscountCoupon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      vendors: [],
      data: [],
      snackBarOpenSuccess: false,
      snackBarMessageSuccess: "",
    };
  }

  componentDidMount() {
    const { fetchCoupons, fetchVendors } = this.props;
    fetchVendors();
    fetchCoupons();
  }

  componentWillReceiveProps(newProps) {
    if (Validator.propertyExist(newProps, "adminCoupon", "coupon")) {
      if (typeof newProps.adminCoupon.coupon === "object") {
        this.setState({
          data: newProps.adminCoupon.coupon,
        });
      }
    }

    if (Validator.propertyExist(newProps, "adminCoupon", "vendors")) {
      if (typeof newProps.adminCoupon.vendors === "object") {
        this.setState({
          vendors: newProps.adminCoupon.vendors,
        });
      }
    }
  }


  onCloseHandlerSuccess = () => {
    this.setState({
      snackBarOpenSuccess: false,
    });
  }

  handleDeleteClick = (couponIDs) => {
    const { deleteCoupon } = this.props;
    const { data } = this.state;
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
    const { data, snackBarOpenSuccess, snackBarMessageSuccess, vendors } = this.state;
    return (
      <Grid container>
        <GridItem xs={12} md={10} />
        <GridItem xs={6} md={2}>
          <CustomInput
            labelText="Search..."
            id="coupon_search"
            primary
            formControlProps={{
              fullWidth: false,
            }}
            inputProps={{
              endAdornment: (<InputAdornment position="end"><Search /></InputAdornment>),
            }}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4>All Discount Coupons</h4>
              <p>List of Active Coupons</p>
            </CardHeader>
            <CardBody>
              <EnhancedTable
                orderBy="name"
                columnData={columnData}
                data={data}
                tableTitle="All Discount Coupons"
                properties={properties}
                onDeleteClickSpec={this.handleDeleteClick}
                currentSelected={[]}
                vendors={vendors}
                id="id"
                itemName={{ single: "Coupon", plural: "Coupons" }}
              />
            </CardBody>
          </Card>
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={snackBarOpenSuccess}
            onClose={this.onCloseHandlerSuccess}
          >
            <BezopSnackBar
              onClose={this.onCloseHandlerSuccess}
              variant="success"
              message={snackBarMessageSuccess}
            />
          </Snackbar>
        </GridItem>
      </Grid>
    );
  }
}

export default DiscountCoupon;
