// @desc this is the Order component on admin's dashboard
// @author Sylvia Onwukwe

import React from "react";
// @material-ui/core components
// core components
import GridItem from "../../components/Grid/GridItem";
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardBody from "../../components/Card/CardBody";
import Select from "react-select";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TablePagination from "@material-ui/core/TablePagination";
import FormControl from "@material-ui/core/FormControl";



const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto",
  },
  table: {
    minWidth: 700,
  },
  select: {
    minWidth: 200
  }
});


class AdminOrder extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        data: [],
        selectedOption: "",
        page: 0,
        rowsPerPage: 5
    }
  }

  handleChange = (selectedOption) => {
    this.setState({ selectedOption: selectedOption ? selectedOption: "" });
  }
  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };


  componentDidMount(){
    this.props.fetchOrder();
  }

  componentWillReceiveProps(newProps){
    if(newProps.adminOrder.hasOwnProperty("orders")){
        this.setState({
          data: newProps.adminOrder.orders
        })
    }
  }

  render () {
    const { classes } = this.props;
    const { selectedOption, data, page, rowsPerPage } = this.state;
    const selection = this.state.data.map(n => {
      return { value: n.standing, label: n.standing}
    });

  return (
    <Paper>
    <div>
      <GridItem xs={12} sm={12} md={12}>
      <Card>
        <CardHeader color="primary">
          <h4>All Store Orders</h4>
          <p>
            List of All Store Orders
          </p>
        </CardHeader>
        <GridItem xs={12} sm={12} md={3}>
      <FormControl>
          <Select
            className={classes.select}
            value={selectedOption.value}
            onChange={this.handleChange}
            options={selection}
          />
      </FormControl>
      </GridItem>
        <CardBody>
     
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
            <TableCell>Order Number</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Vendor</TableCell>
              <TableCell>Kind</TableCell>
              <TableCell>Order Status</TableCell>
              <TableCell>Standing</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map(n => { 
              if(selectedOption === "" || n.name === selectedOption.value){
              return (  
                <TableRow key={n.id}>
                  <TableCell  scope="row">
                    {n.orderNum}
                  </TableCell>
                  <TableCell>{n.customer}</TableCell>
                  <TableCell>{n.vendor}</TableCell>
                  <TableCell>{n.kind}</TableCell>
                  <TableCell>{n.orderStatus}</TableCell>
                  <TableCell>{n.standing}</TableCell>
                </TableRow>
              )
              
            }
            else {
              return null
            }
            })}
          </TableBody>
          </Table>
         
     
      </CardBody>
      </Card>
      </GridItem>
      </div>
      
       <TablePagination
       component="div"
       count={data.length}
       rowsPerPage={rowsPerPage}
       page={page}
       backIconButtonProps={{
         "aria-label": "Previous Page",
       }}
       nextIconButtonProps={{
         "aria-label": "Next Page",
       }}
       onChangePage={this.handleChangePage}
       onChangeRowsPerPage={this.handleChangeRowsPerPage}
     />
   
  </Paper>
    );
    }
    }

AdminOrder.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(AdminOrder);
