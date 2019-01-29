// @desc this is the main product category component on the admin dashboard displaying all category types as tabs.
// @author Sylvia Onwukwe
import React from "react";
// @material-ui/core components
import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";
import TableCell from "@material-ui/core/TableCell";
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
  { id: "kind", numeric: false, disablePadding: true,  label: "Kind" },
  { id: "created_by", numeric: false, disablePadding: true,  label: "Created By" },
];

const properties = [{name: "name", component: true, padding: false, numeric: false, img: false},
{name: "description", component: false, padding: false, numeric: false, img: false},
{name: "kind", component: false, padding: false, numeric: false, img: false},
{name: "created_by", component: false, padding: false, numeric: false, img: false},
];

class AdminProductCategory extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        categories: [],
        data: [],
        snackBarOpenSuccess: false,
        snackBarMessageSuccess: "",
        deletedCategory: 0,
    }
  }  

  componentDidMount(){
    this.props.fetchProductCategories();
  }

  editButtonDisplay = (n) =>{
    return (<TableCell>
    
</TableCell>)
  }

  onCloseHandlerSuccess = () => {
    this.setState({
      snackBarOpenSuccess: false
    })
  }

  handleDeleteClick = (categoryIDs) => {
    let counter = 0;
    for(const categoryID of categoryIDs){
      this.props.deleteProductCategory(categoryID);
      counter++;
      if(counter === categoryIDs.length){
        let newData = this.state.data.filter( datum =>  categoryIDs.indexOf(datum._id)  === -1) 
        this.setState({
          data: newData,
          snackBarOpenSuccess: true,
          snackBarMessageSuccess: `You have successfully deleted ${counter} product ${counter === 1 ? "category" : "categories"}`,
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
          id="product_search"
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
            <h4>All categories</h4>
            <p>
              List of All Product Categories
            </p>
          </CardHeader>
          <CardBody>
          <EnhancedTable
              orderBy="name"
              columnData={columnData}
              data={data}
              tableTitle="All Product Category"
              properties={properties}
              editButton={this.editButtonDisplay}
              onDeleteClickSpec={this.handleDeleteClick}
              currentSelected = {[]}
              itemName={{single : "Product Category", plural: "Product Categories"}}
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
export default AdminProductCategory;
