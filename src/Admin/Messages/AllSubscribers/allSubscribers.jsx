// @desc this component displays all email subscribers
// @author Sylvia Onwukwe
import React from "react";
// @material-ui/core components
import Grid from "@material-ui/core/Grid";
import TableCell from "@material-ui/core/TableCell";
// core components
import GridItem from "../../../components/Grid/GridItem";
import Card from "../../../components/Card/Card";
import Snackbar from "@material-ui/core/Snackbar";
import CardHeader from "../../../components/Card/CardHeader";
import CardBody from "../../../components/Card/CardBody";
import BezopSnackBar from "../../../assets/jss/bezop-mkr/BezopSnackBar";
import EnhancedTable from "../../../bezopComponents/Table/EnhancedTable";

const columnData = [
  { id: "email", numeric: false, disablePadding: true, label: "Email Address" }
];

const properties = [
{name: "email", component: false, padding: false, numeric: false, img: false}
];

class Subscribers extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        sunscribers: [],
        data: [],
        snackBarOpenSuccess: false,
        snackBarMessageSuccess: "",
        deletedSubscriber: 0,
    }
  }  

  componentDidMount(){
    this.props.fetchSubscribers();
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

  handleDeleteClick = (subscriberIDs) => {
    let counter = 0;
    for(const subscriberID of subscriberIDs){
      this.props.deleteSubscriber(subscriberID);
      counter++;
      if(counter === subscriberIDs.length){
        let newData = this.state.data.filter( datum =>  subscriberIDs.indexOf(datum._id)  === -1) 
        this.setState({
          data: newData,
          snackBarOpenSuccess: true,
          snackBarMessageSuccess: `You have successfully deleted ${counter} email ${counter === 1 ? "subscriber" : "subscribers"}`
        })
      }
    }
  }


  render () {
    const { data, snackBarOpenSuccess, snackBarMessageSuccess } = this.state;
  return (
    <Grid container>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4>All Email Subscribers</h4>
            <p>
              List of All Active Email Subscribers
            </p>
          </CardHeader>
          <CardBody>
          <EnhancedTable
              orderBy="name"
              columnData={columnData}
              data={data}
              tableTitle="All Subscribers"
              properties={properties}
              editButton={this.editButtonDisplay}
              onDeleteClickSpec={this.handleDeleteClick}
              currentSelected = {[]}
              itemName={{single : "Subscriber", plural: "Subscriber"}}
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
export default Subscribers;