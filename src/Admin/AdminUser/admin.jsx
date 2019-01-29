import React from "react";
// @material-ui/core components
import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";
import Search from "@material-ui/icons/Search";
import Snackbar from "@material-ui/core/Snackbar";
import TableCell from "@material-ui/core/TableCell";
// core components
import GridItem from "../../components/Grid/GridItem";
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardBody from "../../components/Card/CardBody";
import CustomInput from "../../components/CustomInput/CustomInput";
import BezopSnackBar from "../../assets/jss/bezop-mkr/BezopSnackBar";
import EnhancedTable from "../../bezopComponents/Table/EnhancedTable";
import AdminModal from "./modal";
import Validator from "../../helpers/validator";

const columnData = [
  { id: "fullname", numeric: false, disablePadding: true, label: "Fullname" },
  { id: "username", numeric: false, disablePadding: true, label: "Username" },
  { id: "email", numeric: false, disablePadding: true, label: "Email" },
  { id: "phone", numeric: false, disablePadding: true, label: "Phone" },
  { id: "role", numeric: false, disablePadding: true, label: "Role" },
  { id: "standing", numeric: false, disablePadding: true, label: "Status" },
];

const properties = [
  { name: "fullname", component: true, padding: true, numeric: false, img: false },
  { name: "username", component: true, padding: true, numeric: false, img: false },
  { name: "email", component: false, padding: false, numeric: false, img: false },
  { name: "phone", component: false, padding: false, numeric: false, img: false },
  { name: "role", component: true, padding: true, numeric: false, img: false },
  { name: "standing", component: true, padding: true, numeric: false, img: false },
];


class AminUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      snackBarOpen: false,
      snackBarMessage: "",
    };
  }

  componentDidMount() {
    const {
      fetchAdmins,
    } = this.props;
    fetchAdmins();
  }

  componentWillReceiveProps(newProps) {
    if (Validator.propertyExist(newProps.adminUser, "getAll")
    && typeof newProps.adminUser.getAll === "object") {
      this.setState({
        data: newProps.adminUser.getAll,
      });
    }

    if (Validator.propertyExist(newProps, "adminUser", "patchAdmin")) {
      if (typeof newProps.adminUser.patchAdmin === "string") {
        return false;
      }
      const { data } = this.state;
      const newData = data.map(datum => (datum.id === newProps.adminUser.patchAdmin.id
        ? newProps.adminUser.patchAdmin : datum));
      this.setState({
        data: newData,
        snackBarOpen: true,
        snackBarMessage: "You have successfully updated admin role",
      });
    }
    return false;
  }

  onCloseHandler = () => {
    this.setState({
      snackBarOpen: false,
    });
  }

  updateAdminRole = (n) => {
    const { adminUser, patchAdmin } = this.props;
    return (
      <TableCell>
        <AdminModal
          type="role"
          eachData={n}
          adminUser={adminUser}
          patchAdmin={patchAdmin}
        />
      </TableCell>
    );
  }


  handleDeleteClick = (productIDs) => {
    const { deleteProducts } = this.props;
    const { data } = this.state;
    productIDs.forEach((productID, index) => {
      deleteProducts(productID);
      if ((index + 1) === productIDs.length) {
        const newData = data.filter(datum => productIDs.indexOf(datum.id) === -1);
        this.setState({
          data: newData,
          snackBarOpen: true,
          snackBarMessage: `You have successfully deleted ${productIDs.length} product ${productIDs.length === 1 ? "product" : "products"}`,
        });
      }
    });
  }

  render() {
    const {
      data,
      snackBarOpen,
      snackBarMessage,
    } = this.state;
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
                All Admins
              </h4>
              <p>
                List of All Admins
              </p>
            </CardHeader>
            <CardBody>
              <EnhancedTable
                orderBy="fullname"
                columnData={columnData}
                data={data}
                tableTitle="All Admin"
                properties={properties}
                onDeleteClickSpec={this.handleDeleteClick}
                viewItem={this.updateAdminRole}
                currentSelected={[]}
                itemName={{ single: "Admin", plural: "Admins" }}
                id="id"
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

export default AminUser;
