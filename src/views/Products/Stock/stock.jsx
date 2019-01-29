import React from "react";
// @material-ui/core components
import Grid from "@material-ui/core/Grid";
import Snackbar from "@material-ui/core/Snackbar";
// core components
import GridItem from "../../../components/Grid/GridItem";
import Card from "../../../components/Card/Card";
import CardHeader from "../../../components/Card/CardHeader";
import CardBody from "../../../components/Card/CardBody";
import AddNewProductStock from "./stockModal";
import BezopSnackBar from "../../../assets/jss/bezop-mkr/BezopSnackBar";


import EnhancedTable from "../../../bezopComponents/Table/EnhancedTable";
import Validator from "../../../helpers/validator";


const columnData = [
  { id: "product", numeric: false, disablePadding: true, label: "Product Name" },
  { id: "kind", numeric: false, disablePadding: true, label: "Stock Kind" },
  { id: "quantity", numeric: false, disablePadding: true, label: "Quantity" },
  { id: "avaibale", numeric: false, disablePadding: true, label: "Available" },
  { id: "unitCost", numeric: false, disablePadding: true, label: "Unit Cost" },
  { id: "unitPrice", numeric: false, disablePadding: true, label: "Unit Price" },
  { id: "description", numeric: false, disablePadding: true, label: "Description" },
];


class Stock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      products: [],
      snackBarOpenSuccess: false,
      snackBarMessageSuccess: "Yet to decide the action",
    };
  }

  componentDidMount() {
    const { fetchProductStocks, fetchProducts } = this.props;
    fetchProducts();
    fetchProductStocks();
  }

  componentWillReceiveProps(newProps) {
    const { data } = this.state;
    if (Validator.propertyExist(newProps, "productStock", "getProductStocks")) {
      if (typeof newProps.productStock.getProductStocks === "string") {
        return false;
      }
      this.setState({
        data: newProps.productStock.getProductStocks,
      });
    }

    if (Validator.propertyExist(newProps, "productStock", "getProducts")) {
      if (typeof newProps.productStock.getProducts === "string") {
        return false;
      }
      this.setState({
        products: newProps.productStock.getProducts,
      });
    }

    if (Validator.propertyExist(newProps, "productStock", "addProductStock")) {
      if (typeof newProps.productStock.addProductStock === "string") {
        this.setState({
          snackBarOpenSuccess: false,
        });
        return false;
      }
      const newStock = JSON.parse(JSON.stringify(data));
      newStock.unshift(newProps.productStock.addProductStock);

      this.setState({
        data: newStock,
        snackBarOpenSuccess: true,
        snackBarMessageSuccess: "You have successfully created product stock",
      });
    }
    return false;
  }

  onCloseHandlerSuccess = () => {
    this.setState({
      snackBarOpenSuccess: false,
    });
  }


  render() {
    const { classes, postProductStockDetails, productStock } = this.props;
    const { data, snackBarOpenSuccess, snackBarMessageSuccess, products } = this.state;
    const properties = [
      { name: "product", component: true, padding: true, numeric: false, img: false, subname: "name" },
      { name: "kind", component: false, padding: false, numeric: false, img: false, ucword: true },
      { name: "quantity", component: false, padding: false, numeric: false, img: false },
      { name: "available", component: false, padding: false, numeric: false, img: false },
      { name: "unitCost", component: false, padding: false, numeric: false, img: false },
      { name: "unitPrice", component: false, padding: false, numeric: false, img: false },
      { name: "description", component: false, padding: false, numeric: false, img: false },
    ];
    return (
      <Grid container>
        <GridItem xs={12} md={9} />
        <GridItem xs={6} md={3}>
          <AddNewProductStock
            products={products}
            addProductStock={postProductStockDetails}
            productStock={productStock}
            type="add"
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>
                All Stock
              </h4>
              <p className={classes.cardStockWhite}>
               List of All Stocks
              </p>
            </CardHeader>
            <CardBody>
              <EnhancedTable
                orderBy="name"
                columnData={columnData}
                data={data}
                products={products}
                tableTitle="All Product Stock"
                properties={properties}
                disableAction
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

export default Stock;
