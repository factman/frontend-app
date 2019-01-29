// @desc this component displays the list of all product brands
// @author Sylvia Onwukwe
import React from "react";
// @material-ui/core components
import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";
import Search from "@material-ui/icons/Search"
import Snackbar from "@material-ui/core/Snackbar";
// core components
import GridItem from "../../components/Grid/GridItem";
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardBody from "../../components/Card/CardBody";
import CustomInput from "../../components/CustomInput/CustomInput";
import BezopSnackBar from "../../assets/jss/bezop-mkr/BezopSnackBar";
import EnhancedTable from "../../bezopComponents/Table/EnhancedTable";

const columnData = [
  { id: "name", numeric: false, disablePadding: true, label: "Name" },
  { id: "description", numeric: false, disablePadding: true, label: "Description" },
  { id: "logo", numeric: false, disablePadding: true,  label: "Logo" },
  { id: "banner", numeric: false, disablePadding: true,  label: "Banner" },
  { id: "status", numeric: false, disablePadding: true, label: "Status"}
];

const properties = [{name: "name", component: true, padding: false, numeric: true, img: false},
{name: "description", component: false, padding: false, numeric: false, img: false},
{name: "logo", component: false, padding: false, numeric: false, img: true},
{name: "banner", component: false, padding: false, numeric: false, img: true},
{name: "status", component: false, padding: false, numeric: false, img: false}];

class AdminBrands extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        brands: [],
        data: [],
        snackBarOpenSuccess: false,
        snackBarMessageSuccess: "",
        deletedCategory: 0,
    }
  }  

  componentDidMount(){
    this.props.fetchProductBrands();
  }


  onCloseHandlerSuccess = () => {
    this.setState({
      snackBarOpenSuccess: false
    })
  }

  handleDeleteClick = (brandIDs) => {
    let counter = 0;
    for(const brandID of brandIDs){
      this.props.deleteProductBrand(brandID);
      counter++;
      if(counter === brandIDs.length){
        let newData = this.state.data.filter( datum =>  brandIDs.indexOf(datum._id)  === -1) 
        this.setState({
          data: newData,
          snackBarOpenSuccess: true,
          snackBarMessageSuccess: `You have successfully deleted ${counter} brand ${counter === 1 ? "brand" : "brands"}`
        })
      }
    }
  }


  render () {
    const { data, snackBarOpenSuccess, snackBarMessageSuccess } = this.state;
  return (
    <Grid container>
    <GridItem xs={12} md={10}>
   
    </GridItem>
    <GridItem xs={6} md={2}>
    <CustomInput
          labelText="Search..."
          id="brand_search"
          primary
          formControlProps={{
              fullWidth: false
          }}
          inputProps={{
              endAdornment: (<InputAdornment position="end"><Search/></InputAdornment>)
          }}
        />
    </GridItem>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4>All Brands</h4>
            <p>
              List of All Brands
            </p>
          </CardHeader>
          <CardBody>
          <EnhancedTable
              orderBy="name"
              columnData={columnData}
              data={data}
              tableTitle="All Brands"
              properties={properties}
              onDeleteClickSpec={this.handleDeleteClick}
              currentSelected = {[]}
              itemName={{single : "Brand", plural: "Brands"}}
            />
          </CardBody>
        </Card>
        <Snackbar
            anchorOrigin={{vertical: "top", horizontal: "center"}}
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
export default AdminBrands;
