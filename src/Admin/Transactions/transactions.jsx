// @desc this is the Transaction component on admin's dashboard
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
  { id: "id", numeric: false, disablePadding: false,  label: "Customer ID" },
  { id: "customer", numeric: false, disablePadding: false, label: "Customer" }
  
];

const properties = [{name: "id", component: true, padding: false, numeric: false, img: false},
{name: "customer", component: false, padding: false, numeric: false, img: false, ucword: false}
];

class Transaction extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        transaction: [],
        data: [],
        snackBarOpenSuccess: false,
        snackBarMessageSuccess: "",
        deletedTransaction: 0,
    }
  }

  componentDidMount(){
    this.props.fetchTransactions();
  }

  componentWillReceiveProps(newProps){
    if(newProps.adminTransaction.hasOwnProperty("transaction")){
        this.setState({
          data: newProps.adminTransaction.transaction
        })
    }
  }

    onCloseHandlerSuccess = () => {
      this.setState({
        snackBarOpenSuccess: false
      })
    }

    handleDeleteClick = (transactionIDs) => {
      let counter = 0;
      for(const transactionID of transactionIDs){
        this.props.deleteTransactions(transactionID);
        counter++;
        if(counter === transactionIDs.length){
          let newData = this.state.data.filter( datum =>  transactionIDs.indexOf(datum.id)  === -1) 
          this.setState({
            data: newData,
            snackBarOpenSuccess: true,
            snackBarMessageSuccess: `You have successfully deleted ${counter} ${counter === 1 ? "transaction" : "transactions"}`
          })
        }
      }
    }

  render () {
    const { data, snackBarOpenSuccess, snackBarMessageSuccess } = this.state;
    console.log(this.state.data)
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
            <h4 >All Transactions</h4>
            <p >
              List of All Transaction
            </p>
          </CardHeader>
          <CardBody>
          <EnhancedTable
              orderBy="name"
              columnData={columnData}
              data={data}
              tableTitle="All Transactions"
              properties={properties}
              onDeleteClickSpec={this.handleDeleteClick}
              currentSelected = {[]}
              itemName={{single : "Transaction", plural: "Transactions"}}
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

export default Transaction;
