// @desc View tickets on tickets
// @author Sylvia Onwukwe
import React from "react";
import InputAdornment from "@material-ui/core/InputAdornment";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import Note from "@material-ui/icons/Note";
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography";
import SnackbarContent from "@material-ui/core/SnackbarContent";
// core components
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import Card from "../../components/Card/Card";
import CardBody from "../../components/Card/CardBody";
import CardFooter from "../../components/Card/CardFooter";
import CustomInput from "../../components/CustomInput/CustomInput";
import Button from "../../components/CustomButtons/Button";
import isEqual from "lodash/isEqual";

class ViewTicket extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      supportTicket: {
        name: this.props.eachData.name,
        id: this.props.eachData.id,
        kind: this.props.eachData.kind,
        userType: this.props.eachData.userType,
        standing: this.props.eachData.standing
      },
      selectedTicketKind: {value: this.props.eachData.kind, label: this.props.eachData.kind},
      ticketKindSelect: "react-select-label-hidden",
      snackBarOpen: true,
      snackBarMessage: "",
      snackBarOpenSuccess: false,
    };
  }

  onCloseHandler = () => {
    this.setState({ snackBarOpen: false });
  }
  setSupportTicket = (type, value) => {
    let newsupportTicket = JSON.parse(JSON.stringify(this.state.supportTicket));
    newsupportTicket[type] = value;
    this.setState({
      supportTicket: newsupportTicket,
    });
  }

  handleChange =  (event) => {
    this.setsupportTicket(event.target.name, event.target.value);
  };

  //This handles the country select element
  handleTicketKindChange = (selectedTicketKind) => {

    this.setState({ selectedTicketKind });
    if(selectedTicketKind !== null){
      this.setSupportTicket("kind", selectedTicketKind.value);
      this.setState({
        ticketKindSelect: "react-select-label-visible"
      })
    }else{
      this.setState({
        ticketKindSelect: "react-select-label-hidden"
      })
    }
  }

  onCloseHandlerSuccess = () => {
    this.setState({ snackBarOpenSuccess: false });
  }

  putTicket = () => {
    this.props.specialMethod(this.state.SupportTicket, this.props.eachData.id);
  }

  componentWillReceiveProps(newProps){
    if(newProps.supportTicket.hasOwnProperty("updateTicket") && (isEqual(this.props.supportTicket.updateTicket, newProps.supportTicket.updateTicket) === false)){
        this.props.onHandleModalClose();
    }
  }

  render() {
    const {supportTicket} = this.state;
    return (
      <div>
          <GridContainer>
         <GridItem  xs={12} sm={6}>
         <GridItem>
          
        </GridItem>
        <GridItem xs={12} sm container>
          <GridItem xs container direction="column" spacing={16}>
            <GridItem xs>
              <h3 variant="subheading">
                Ticket Details
              </h3>
              <SnackbarContent  message="I love snacks." />
              <SnackbarContent  message="I love snacks." />
            </GridItem>
            <Grid item>
              <Typography style={{ cursor: "pointer" }}>created</Typography>
            </Grid>
          </GridItem>
          <GridItem>
            <Typography variant="subheading">last updated</Typography>
          </GridItem>
        </GridItem>    
            </GridItem>
              <GridItem xs={12} sm={6}>
                <Card> 
                    <CardBody>
                    <CustomInput
                    id="name"
                    
                    inputProps={{
                      value: supportTicket.name,
                      name:"name",
                      
                    }}
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                      <CustomInput
                        labelText=""
                        id="email"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "email",
                          value: "annabarley@gmail.com",
                          endAdornment: (
                            <InputAdornment position="end">
                              <Email />
                            </InputAdornment>
                          )
                        }}
                      />
                      <CustomInput
                        labelText=""
                        id="subject"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "text",
                          value: "How to register as a vendor",
                          endAdornment: (
                            <InputAdornment position="end">
                              <Note />
                            </InputAdornment>
                          )
                        }}
                      />
                      <CustomInput
                        labelText=""
                        id="pass"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          multiline: true,
                          rows: 5,
                          value: "Dummy Text Dummy TextDummy TextDummy TextDummy TextDummy Text Dummy TextDummy TextDummy Text Dummy TextDummy TextDummy TextvDummy TextDummy TextDummy TextDummy Textvv",
                          endAdornment: (
                            <InputAdornment position="end">
                              <Note
                              />
                            </InputAdornment>
                          )
                        }}
                      />
                      <CustomInput
                        labelText="Type Your Message"
                        id="content"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          multiline: true,
                          rows: 5,
                          endAdornment: (
                            <InputAdornment position="end">
                              <Note
                              />
                            </InputAdornment>
                          )
                        }}
                      />
                    </CardBody>
                  
                  <CardFooter>
                  <GridItem xs={12} sm={12} md={10}>
                      <Button color="primary" onClick = {this.putTicket}> Reply </Button>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={2}>
                    
                    </GridItem>
                    </CardFooter>
                </Card>
              </GridItem>
            </GridContainer>
          
        </div>
    );
  }
}

export default ViewTicket;
