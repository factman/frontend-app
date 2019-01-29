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
import Validator from "../../helpers/validator";
import EnhancedTable from "../../bezopComponents/Table/EnhancedTable";

const columnData = [
  { id: "username", numeric: false, disablePadding: false, label: "UserName" },
  { id: "gender", numeric: false, disablePadding: false, label: "Gender" },
  { id: "email", numeric: false, disablePadding: false, label: "Email" },
  { id: "phone", numeric: false, disablePadding: false, label: "Phone Number" },
  { id: "country", numeric: false, disablePadding: false, label: "Country" },
];

const properties = [
  { name: "username", component: false, padding: false, numeric: false, img: false },
  { name: "gender", component: false, padding: false, numeric: false, img: false },
  { name: "email", component: false, padding: false, numeric: false, img: false },
  { name: "phone", component: false, padding: false, numeric: false, img: false },
  { name: "country", component: false, padding: false, numeric: false, img: false },
];

class AdminCustomers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      snackBarOpenSuccess: false,
      snackBarMessageSuccess: "",
    };
  }

  componentDidMount() {
    const { fetchCustomers } = this.props;
    fetchCustomers();
  }

  componentWillReceiveProps(newProps) {
    if (Validator.propertyExist(newProps, "adminCustomers", "customers")) {
      if (typeof newProps.adminCustomers.customers === "string") {
        return false;
      }
      this.setState({
        data: newProps.adminCustomers.customers,
      });
    }
    return false;
  }

  onCloseHandlerSuccess = () => {
    this.setState({
      snackBarOpenSuccess: false,
    });
  }

  handleDeleteClick = (customerIDs) => {
    const { deleteCustomers } = this.props;
    const { data } = this.state;
    customerIDs.forEach((customerID, index) => {
      deleteCustomers(customerID);
      if ((index + 1) === customerIDs.length) {
        const newData = data.filter(datum => customerIDs.indexOf(datum.id) === -1);
        this.setState({
          data: newData,
          snackBarOpenSuccess: true,
          snackBarMessageSuccess: `You have successfully deleted ${customerIDs.length} ${customerIDs.length === 1 ? "customer" : "customers"}`,
        });
      }
    });
  }


  render() {
    const { data, snackBarOpenSuccess, snackBarMessageSuccess } = this.state;
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
              <h4>All Customers</h4>
              <p>
                List of All Customers
              </p>
            </CardHeader>
            <CardBody>
              <EnhancedTable
                orderBy="name"
                columnData={columnData}
                data={data}
                tableTitle="All Customers"
                properties={properties}
                onDeleteClickSpec={this.handleDeleteClick}
                currentSelected={[]}
                itemName={{ single: "Customer", plural: "Customers" }}
                id="id"
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
export default AdminCustomers;
