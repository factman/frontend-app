import React from "react";
// @material-ui/core components
import Grid from "@material-ui/core/Grid";
import TableCell from "@material-ui/core/TableCell";
import Snackbar from "@material-ui/core/Snackbar";
// core components
import GridItem from "../../components/Grid/GridItem";
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardBody from "../../components/Card/CardBody";
import NewCurrency from "./addCurrencyModal";
import BezopSnackBar from "../../assets/jss/bezop-mkr/BezopSnackBar";
import EnhancedTable from "../../bezopComponents/Table/EnhancedTable";
import Validator from "../../helpers/validator";

const columnData = [
  { id: "name", numeric: false, disablePadding: true, label: "Currency Name" },
  { id: "kind", numeric: false, disablePadding: true, label: "Currency Kind" },
  { id: "code", numeric: false, disablePadding: true, label: "Currency Code" },
  { id: "exchange", numeric: false, disablePadding: true, label: "Exchange Rate" },
  { id: "description", numeric: false, disablePadding: true, label: "Currency Description" },
  { id: "standing", numeric: false, disablePadding: true, label: "Status" },
  { id: "icon", numeric: false, disablePadding: true, label: "Icon" },
];

const properties = [
  { name: "name", component: true, padding: true, numeric: false, img: false },
  { name: "kind", component: false, padding: false, numeric: false, img: false, ucword: true },
  { name: "code", component: false, padding: false, numeric: false },
  { name: "exchange", component: false, padding: false, numeric: false },
  { name: "description", component: false, padding: true, numeric: false, img: false },
  { name: "standing", component: false, padding: true, numeric: false, img: false },
  { name: "icon", component: false, padding: true, numeric: false, img: true, width: 64, height: 64 }];

const currencyDetails = {
  name: "",
  description: "",
  kind: "",
  code: "",
  symbol: "",
  exchange: "",
  icon: "",
  standing: "active",
};

class Currency extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      snackBarOpenSuccess: false,
      snackBarMessageSuccess: "",
    };
  }

  componentDidMount() {
    const { fetchStoreCurrencies } = this.props;
    fetchStoreCurrencies();
  }

  componentWillReceiveProps(newProps) {
    if (Validator.propertyExist(newProps, "adminCurrency", "currencies")) {
      if (typeof newProps.adminCurrency.currencies === "string") {
        return false;
      }
      this.setState({
        data: newProps.adminCurrency.currencies,
      });
    }
    if (Validator.propertyExist(newProps, "adminCurrency", "addCurrency")) {
      if (typeof newProps.adminCurrency.addCurrency === "string") {
        return false;
      }
      const { data } = this.state;
      const newCurrency = JSON.parse(JSON.stringify(data));
      newCurrency.unshift(newProps.adminCurrency.addCurrency);

      this.setState({
        data: newCurrency,
        snackBarOpenSuccess: true,
        snackBarMessageSuccess: "You have successfully created a new currency",
      });
    }

    if (Validator.propertyExist(newProps, "adminCurrency", "updateCurrency")) {
      if (typeof newProps.adminCurrency.updateCurrency === "string") {
        return false;
      }
      const { data } = this.state;
      const newCurrency = JSON.parse(JSON.stringify(data));
      const updateCurrency = newCurrency
        .map(currency => ((newProps.adminCurrency.updateCurrency.id === currency.id)
          ? newProps.adminCurrency.updateCurrency : currency));

      this.setState({
        data: updateCurrency,
        snackBarOpenSuccess: true,
        snackBarMessageSuccess: "You have successfully updated this currency",
      });
    }

    if (Validator.propertyExist(newProps, "adminCurrency", "updateImage")) {
      const { data } = this.state;
      const newData = data
        .map(datum => ((datum.id === newProps.adminCurrency.updateImage.id)
          ? newProps.adminCurrency.updateImage : datum));
      this.setState({
        data: newData,
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
    const { adminCurrency, putStoreCurrency } = this.props;
    const newCurrencyDetails = {
      name: Validator.propertyExist(n, "name") ? n.name : "",
      description: Validator.propertyExist(n, "description") ? n.description : "",
      kind: Validator.propertyExist(n, "kind") ? n.kind : "",
      standing: Validator.propertyExist(n, "standing") ? n.standing : "active",
      code: Validator.propertyExist(n, "code") ? n.code : "",
      symbol: Validator.propertyExist(n, "symbol") ? n.symbol : "",
      exchange: Validator.propertyExist(n, "exchange") ? n.exchange : "",
      icon: Validator.propertyExist(n, "icon") ? n.icon : "",
    };
    return (
      <TableCell>
        <NewCurrency
          type="edit"
          eachData={n}
          adminCurrency={adminCurrency}
          putStoreCurrency={putStoreCurrency}
          currencyDetails={newCurrencyDetails}
        />
      </TableCell>
    );
  }

  handleDeleteClick = (currencyIDs) => {
    const { deleteStoreCurrency } = this.props;
    const { data } = this.state;
    currencyIDs.forEach((currencyID, index) => {
      deleteStoreCurrency(currencyID);
      if ((index + 1) === currencyIDs.length) {
        const newData = data.filter(datum => currencyIDs.indexOf(datum.id) === -1);
        this.setState({
          data: newData,
          snackBarOpenSuccess: true,
          snackBarMessageSuccess: `You have successfully deleted ${currencyIDs.length} ${currencyIDs.length === 1 ? "currency" : "currencies"}`,
        });
      }
    });
  }

  render() {
    const { postStoreCurrency, adminCurrency, postImage } = this.props;
    const { data, snackBarOpenSuccess, snackBarMessageSuccess } = this.state;
    return (
      <Grid container>
        <GridItem xs={12} md={9} />
        <GridItem xs={12} md={3}>
          <NewCurrency
            adminCurrency={adminCurrency}
            addStoreCurrency={postStoreCurrency}
            currencyDetails={currencyDetails}
            type="add"
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4>
                Currency
              </h4>
              <p>
                Showing Active Currencies
              </p>
            </CardHeader>
            <CardBody>
              <EnhancedTable
                orderBy="name"
                columnData={columnData}
                data={data}
                tableTitle="All Store Currencies"
                properties={properties}
                editButton={this.editButtonDisplay}
                onDeleteClickSpec={this.handleDeleteClick}
                currentSelected={[]}
                postImage={postImage}
                collection="currency"
                label="icon"
                id="id"
                itemName={{ single: "Currency", plural: "Currencies" }}
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
export default Currency;
