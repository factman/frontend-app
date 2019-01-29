import React from "react";
// @material-ui/core components
import Grid from "@material-ui/core/Grid";
// core components
import TableCell from "@material-ui/core/TableCell";
import Snackbar from "@material-ui/core/Snackbar";
import GridItem from "../../../components/Grid/GridItem";
import Card from "../../../components/Card/Card";
import CardHeader from "../../../components/Card/CardHeader";
import CardBody from "../../../components/Card/CardBody";
import AddNewProductBrand from "./brandModal";
import BezopSnackBar from "../../../assets/jss/bezop-mkr/BezopSnackBar";


import EnhancedTable from "../../../bezopComponents/Table/EnhancedTable";
import Validator from "../../../helpers/validator";


const columnData = [
  { id: "name", numeric: false, disablePadding: true, label: "Product Brand" },
  { id: "description", numeric: false, disablePadding: true, label: "Description" },
  { id: "icon", numeric: false, disablePadding: true, label: "Thumbnail" },
  { id: "banner", numeric: false, disablePadding: true, label: "Banner" },
];

const properties = [{ name: "name", component: true, padding: true, numeric: false, img: false },
  { name: "description", component: false, padding: false, numeric: false, img: false },
  { name: "icon", component: false, padding: false, numeric: false, img: true, width: 500, height: 500 },
  { name: "banner", component: false, padding: false, numeric: false, img: true, width: 1200, height: 400 }];


class Brand extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      snackBarOpenSuccess: false,
      snackBarMessageSuccess: "Yet to decide the action",
    };
  }

  componentDidMount() {
    const { fetchProductBrands } = this.props;
    fetchProductBrands();
  }

  componentWillReceiveProps(newProps) {
    if (Validator.propertyExist(newProps, "productBrand", "brands")) {
      this.setState({
        data: newProps.productBrand.brands,
      });
    }

    if (Validator.propertyExist(newProps, "productBrand", "addBrand")) {
      const { data } = this.state;
      const newBrands = JSON.parse(JSON.stringify(data));
      newBrands.unshift(newProps.productBrand.addBrand);

      this.setState({
        data: newBrands,
        snackBarOpenSuccess: true,
        snackBarMessageSuccess: "You have successfully created product brand",
      });
    }

    if (Validator.propertyExist(newProps, "productBrand", "updateBrand")) {
      const { data } = this.state;
      const newBrands = JSON.parse(JSON.stringify(data));
      const updateBrands = newBrands.map((brand) => {
        if (newProps.productBrand.updateBrand.id === brand.id) {
          return newProps.productBrand.updateBrand;
        }
        return brand;
      });

      this.setState({
        data: updateBrands,
        snackBarOpenSuccess: true,
        snackBarMessageSuccess: "You have successfully updated product brand",

      });
    }

    if (Validator.propertyExist(newProps, "productBrand", "updateImage")) {
      const { data } = this.state;
      const newData = data.map((datum) => {
        if (datum.id === newProps.productBrand.updateImage.id) {
          return newProps.productBrand.updateImage;
        }
        return datum;
      });
      this.setState({
        data: newData,
      });
    }
  }

  onCloseHandlerSuccess = () => {
    this.setState({
      snackBarOpenSuccess: false,
    });
  }

  editButtonDisplay = (n) => {
    const { productBrand, putProductBrandDetails } = this.props;
    return (
      <TableCell>
        {<AddNewProductBrand type="edit" eachData={n} productBrand={productBrand} specialMethod={putProductBrandDetails} />}
      </TableCell>
    );
  }


  handleDeleteClick = (brandIDs) => {
    const { deleteProductBrand } = this.props;
    const { data } = this.state;
    brandIDs.forEach((brandID, index) => {
      deleteProductBrand(brandID);
      if ((index + 1) === brandIDs.length) {
        const newData = data.filter(datum => brandIDs.indexOf(datum.id) === -1);
        this.setState({
          data: newData,
          snackBarOpenSuccess: true,
          snackBarMessageSuccess: `You have successfully deleted ${brandIDs.length} product ${brandIDs.length === 1 ? "brand" : "brands"}`,
        });
      }
    });
  }

  render() {
    const { classes, postProductBrandDetails, productBrand, postImage } = this.props;
    const { data, snackBarOpenSuccess, snackBarMessageSuccess } = this.state;

    // console.log(data);

    return (
      <Grid container>
        <GridItem xs={12} md={9} />
        <GridItem xs={6} md={3}>
          <AddNewProductBrand productBrand={productBrand} addProductBrand={postProductBrandDetails} type="add" />
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>
All Brand
              </h4>
              <p className={classes.cardBrandWhite}>
List of All Brands
              </p>
            </CardHeader>
            <CardBody>
              <EnhancedTable
                orderBy="name"
                columnData={columnData}
                data={data}
                tableTitle="All Product Brand"
                properties={properties}
                editButton={this.editButtonDisplay}
                onDeleteClickSpec={this.handleDeleteClick}
                currentSelected={[]}
                collection="brand"
                postImage={postImage}
                itemName={{ single: "Product Brand", plural: "Product Brands" }}
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

export default Brand;
