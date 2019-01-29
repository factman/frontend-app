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
import { TableCell } from "../../../node_modules/@material-ui/core";
import VendorModal from "./modal";

const columnData = [
  { id: "domainName", numeric: false, disablePadding: false, label: "Domain Name" },
  { id: "fullname", numeric: false, disablePadding: false, label: "Vendor Name" },
  { id: "email", numeric: false, disablePadding: false, label: "Email" },
  { id: "phone", numeric: false, disablePadding: false, label: "Phone Number" },
  { id: "approval", numeric: false, disablePadding: false, label: "Status" },
];

const properties = [
  { name: "domainName", component: false, padding: false, numeric: false, img: false },
  { name: "fullname", component: false, padding: false, numeric: false, img: false },
  { name: "email", component: false, padding: false, numeric: false, img: false },
  { id: "phone", component: false, padding: false, numeric: false, img: false },
  { name: "approval", component: false, padding: false, numeric: false, img: false }];

class Vendors extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      snackBarOpen: false,
      snackBarMessage: "",
    };
  }

  componentDidMount() {
    const { fetchVendors } = this.props;
    fetchVendors();
  }

  componentWillReceiveProps(newProps) {
    if (Validator.propertyExist(newProps, "adminVendor", "vendors")) {
      if (typeof newProps.adminVendor.vendors === "string") {
        return false;
      }
      this.setState({
        data: newProps.adminVendor.vendors,
      });
    }

    if (Validator.propertyExist(newProps, "adminVendor", "patchVendor")) {
      if (typeof newProps.adminVendor.patchVendor === "string") {
        return false;
      }
      const { data } = this.state;
      const newData = data.map(datum => (datum.id === newProps.adminVendor.patchVendor.id
        ? newProps.adminVendor.patchVendor : datum));
      this.setState({
        data: newData,
        snackBarOpen: true,
        snackBarMessage: "You have successfully updated vendor role",
      });
    }

    if (Validator.propertyExist(newProps, "adminVendor", "approvalVendor")) {
      if (typeof newProps.adminVendor.approvalVendor === "string") {
        return false;
      }
      const { data } = this.state;
      const newData = data.map(datum => (datum.id === newProps.adminVendor.approvalVendor.id
        ? newProps.adminVendor.approvalVendor : datum));
      this.setState({
        data: newData,
        snackBarOpen: true,
        snackBarMessage: "You have successfully updated admin approval",
      });
    }
    return false;
  }

  onCloseHandler = () => {
    this.setState({
      snackBarOpen: false,
    });
  }

  vendorApproval = (n) => {
    const { adminVendor, patchVendor, vendorApproval } = this.props;
    const type = n.businessVerified === false
    && (n.standing === "inactive" || n.standing === "deny")
    && (n.action === "deny" || n.action === "restrict")
      ? "role" : "approve";
    const newEachData = Validator.propertyExist(n, "comment")
      ? n : Object.assign({}, n, { comment: "" });
    return (
      <TableCell>
        <VendorModal
          type={type}
          eachData={newEachData}
          adminVendor={adminVendor}
          patchVendor={patchVendor}
          vendorApprove={vendorApproval}
        />
      </TableCell>
    );
  }

  handleDeleteClick = (vendorIDs) => {
    const { deleteVendors } = this.props;
    const { data } = this.state;
    vendorIDs.forEach((vendorID, index) => {
      deleteVendors(vendorID);
      if ((index + 1) === vendorIDs.length) {
        const newData = data.filter(datum => vendorIDs.indexOf(datum.id) === -1);
        this.setState({
          data: newData,
          snackBarOpen: true,
          snackBarMessage: `You have successfully deleted ${vendorIDs.length} ${vendorIDs.length === 1 ? "vendor" : "vendors"}`,
        });
      }
    });
  }


  render() {
    const { data, snackBarOpen, snackBarMessage } = this.state;
    return (
      <Grid container>
        <GridItem xs={12} md={10} />
        <GridItem xs={6} md={2}>
          <CustomInput
            labelText="Search..."
            id="product_search"
            primary
            formControlProps={{
              fullWidth: false,
            }}
            inputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4>
                All Vendors
              </h4>
              <p>
                List of All Vendors
              </p>
            </CardHeader>
            <CardBody>
              <EnhancedTable
                orderBy="domainName"
                columnData={columnData}
                data={data}
                tableTitle="All Vendors"
                properties={properties}
                onDeleteClickSpec={this.handleDeleteClick}
                viewItem={this.vendorApproval}
                currentSelected={[]}
                itemName={{ single: "Vendor", plural: "Vendors" }}
              />
            </CardBody>
          </Card>
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={snackBarOpen}
            onClose={this.onCloseHandler}
          >
            <BezopSnackBar
              onClose={this.onCloseHandler}
              variant="success"
              message={snackBarMessage}
            />
          </Snackbar>
        </GridItem>
      </Grid>
    );
  }
}
export default Vendors;
