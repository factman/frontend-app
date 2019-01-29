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
// import Filter from "./filter";
import AddNew from "./modal";
import BezopSnackBar from "../../assets/jss/bezop-mkr/BezopSnackBar";
import EnhancedTable from "../../bezopComponents/Table/EnhancedTable";
import Validator from "../../helpers/validator";


const columnData = [
  { id: "name", numeric: false, disablePadding: true, label: "Product Name" },
  { id: "description", numeric: false, disablePadding: true, label: "Short Description" },
  { id: "collections", numeric: false, disablePadding: true, label: "Collection" },
  { id: "category", numeric: false, disablePadding: true, label: "Category" },
  { id: "brand", numeric: false, disablePadding: true, label: "Brand" },
  { id: "images", numeric: false, disablePadding: true, label: "Product Images" },
];

const properties = [
  { name: "name", component: true, padding: true, numeric: false, img: false },
  { name: "description", subname: "short", component: false, padding: false, numeric: false, img: false },
  { name: "collections", subname: "name", component: false, padding: false, numeric: false, img: false },
  { name: "category", subname: "name", component: false, padding: false, numeric: false, img: false },
  { name: "brand", subname: "name", component: false, padding: false, numeric: false, img: false },
];

const imagePanelView = [
  {
    label: "image_lg|images",
    imgType: "Product Large Image",
    fullWidth: true,
    width: 800,
    height: 800,
  },
  {
    label: "image_front|images",
    imgType: "Product Front Image",
    fullWidth: true,
    width: 800,
    height: 800,
  },
  {
    label: "image_back|images",
    imgType: "Product Back Image",
    fullWidth: true,
    width: 800,
    height: 800,
  },
  {
    label: "image_top|images",
    imgType: "Product Top Image",
    fullWidth: true,
    width: 800,
    height: 800,
  },
  {
    label: "image_bottom|images",
    imgType: "Product Bottom Image",
    fullWidth: true,
    width: 800,
    height: 800,
  },
  {
    label: "image_right|images",
    imgType: "Product Right Image",
    fullWidth: true,
    width: 800,
    height: 800,
  },
  {
    label: "image_left|images",
    imgType: "Product Left Image",
    fullWidth: true,
    width: 800,
    height: 800,
  },
];

class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      categories: [],
      brands: [],
      collections: [],
      variantSnackBar: "success",
      snackBarOpenSuccess: false,
      snackBarMessageSuccess: "Yet to decide the action",
    };
  }

  componentDidMount() {
    const {
      fetchProducts,
      fetchProductBrands,
      fetchProductCategories,
      fetchProductCollections,
    } = this.props;
    fetchProducts();
    fetchProductBrands();
    fetchProductCategories();
    fetchProductCollections();
  }

  componentWillReceiveProps(newProps) {
    if (Validator.propertyExist(newProps.product, "getAll")
    && typeof newProps.product.getAll === "object") {
      this.setState({
        data: newProps.product.getAll,
      });
    }

    if (Validator.propertyExist(newProps.product, "productCategories")
    && typeof newProps.product.productCategories === "object") {
      this.setState({
        categories: newProps.product.productCategories,

      });
    }

    if (Validator.propertyExist(newProps.product, "productBrands")
    && typeof newProps.product.productBrands === "object") {
      this.setState({
        brands: newProps.product.productBrands,
      });
    }

    if (Validator.propertyExist(newProps.product, "getProductCollections")
    && typeof newProps.product.getProductCollections === "object") {
      this.setState({
        collections: newProps.product.getProductCollections,
      });
    }

    if (Validator.propertyExist(newProps.product, "addProduct")) {
      if (typeof newProps.product.addProduct === "string") {
        return false;
      }
      const { data } = this.state;
      // Stringify and parsing all products
      const newProducts = JSON.parse(JSON.stringify(data));
      // Added the new product as the first element
      newProducts.unshift(newProps.product.addProduct);
      this.setState({
        data: newProducts,
        snackBarOpenSuccess: true,
        variantSnackBar: "success",
        snackBarMessageSuccess: "You have successfully added a new Product",
      });
    }

    if (Validator.propertyExist(newProps.product, "updateProduct")) {
      if (typeof newProps.product.updateProduct === "string") {
        this.setState({
          variantSnackBar: "error",
          snackBarOpenSuccess: true,
          snackBarMessageSuccess: newProps.product.updateProduct,
        });
        return false;
      }
      const { data } = this.state;
      const newProducts = JSON.parse(JSON.stringify(data));
      const updateProducts = newProducts.map((product) => {
        if (newProps.product.updateProduct.id === product.id) {
          return newProps.product.updateProduct;
        }
        return product;
      });
      this.setState({
        data: updateProducts,
        snackBarOpenSuccess: true,
        variantSnackBar: "success",
        snackBarMessageSuccess: "You have successfully updated Product",
      });
    }

    if (Validator.propertyExist(newProps, "product", "updateImage")) {
      if (typeof newProps.product.updateImage === "string") {
        return false;
      }
      const { data } = this.state;
      const productImageData = JSON.parse(JSON.stringify(data));
      const newData = productImageData.map(datum => ((datum.id === newProps.product.updateImage.id)
        ? newProps.product.updateImage : datum));
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

  imagePanelDisplay = (n) => {
    const { product, postImage } = this.props;
    return (
      <TableCell>
        <AddNew
          type="imageUpload"
          imgObj={imagePanelView}
          eachData={n}
          postImage={postImage}
          collection="product"
          product={product}
        />
      </TableCell>
    );
  }

  editButtonDisplay = (n) => {
    const {
      fetchProductBrands, fetchProductCategories,
      fetchProducts, product, putProductDetails,
      fetchProductCollections, collections,
    } = this.props;
    return (
      <TableCell>
        <AddNew
          type="edit"
          eachData={n}
          fetchProductBrands={fetchProductBrands}
          fetchProductCategories={fetchProductCategories}
          fetchProductCollections={fetchProductCollections}
          fetchProducts={fetchProducts}
          product={product}
          collections={collections}
          putProductDetails={putProductDetails}
        />
      </TableCell>
    );
  }

  handleDeleteClick = (productIDs) => {
    const { deleteProduct } = this.props;
    const { data } = this.state;
    productIDs.forEach((productID, index) => {
      deleteProduct(productID);
      if ((index + 1) === productIDs.length) {
        const newData = data.filter(datum => productIDs.indexOf(datum.id) === -1);
        this.setState({
          data: newData,
          snackBarOpenSuccess: true,
          snackBarMessageSuccess: `You have successfully deleted ${productIDs.length} ${productIDs.length === 1 ? "product" : "products"}`,
        });
      }
    });
  }

  render() {
    const {
      classes,
      fetchProductBrands,
      fetchProductCategories,
      product,
      fetchProducts,
      postProductDetails,
      fetchProductCollections,
    } = this.props;
    const {
      data,
      categories,
      brands,
      snackBarMessageSuccess,
      snackBarOpenSuccess,
      variantSnackBar,
      collections,
    } = this.state;

    return (
      <Grid container>
        <GridItem xs={12} md={10} />
        {
              /* <Filter />
          </GridItem> */
        }
        <GridItem xs={6} md={2}>
          <AddNew
            type="add"
            fetchProductBrands={fetchProductBrands}
            fetchProductCategories={fetchProductCategories}
            fetchProducts={fetchProducts}
            product={product}
            collections={collections}
            postProductDetails={postProductDetails}
            fetchProductCollections={fetchProductCollections}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>
                All Products
              </h4>
              <p className={classes.cardCategoryWhite}>
                List of All Products
              </p>
            </CardHeader>
            <CardBody>
              <EnhancedTable
                orderBy="name"
                columnData={columnData}
                data={data}
                tableTitle="All Products"
                properties={properties}
                categories={categories}
                brands={brands}
                editButton={this.editButtonDisplay}
                onDeleteClickSpec={this.handleDeleteClick}
                currentSelected={[]}
                imagePanelDisplay={this.imagePanelDisplay}
                product={product}
                itemName={{ single: "Product", plural: "Products" }}
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

export default Products;
