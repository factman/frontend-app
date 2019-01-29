// @desc This is the Terms and Conditions Component
// @author Sylvia Onwukwe
import React from "react";
import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";
import Snackbar from "@material-ui/core/Snackbar";
import validator from "../../../helpers/validator";
import BezopSnackBar from "../../../assets/jss/bezop-mkr/BezopSnackBar";
import GridItem from "../../../components/Grid/GridItem";
import Card from "../../../components/Card/Card";
import CardBody from "../../../components/Card/CardBody";
import CardHeader from "../../../components/Card/CardHeader";
import CardFooter from "../../../components/Card/CardFooter";
import CustomInput from "../../../components/CustomInput/CustomInput";
import Button from "../../../components/CustomButtons/Button";

class TermsAndConditions extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimaton: "cardHidden",
      termsAndConditions: "",
      termsAndConditionsError: "",
      snackBarMessageSuccess: "",
      snackBarOpenSuccess: false
    };
  }
  
  //input validation
  checkTermsAndConditions= (type, value) => {
    let newTermsAndConditionsError = JSON.parse(JSON.stringify(this.state.termsAndConditionsError));
    switch(type){
      case "termsandconditions":
        newTermsAndConditionsError[type] = validator.minStrLen(value, 20);
      break;
      default:
      break;
    }
    this.setState({
      termsAndConditionsError: newTermsAndConditionsError
    })
  }
  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };
  /*
  componentDidMount() {
   this.props.fetchTermsAndConditions();
  }
  */
  updateTermsAndConditions = () => {
    this.props.updateTermsAndConditions(this.state.termsAndConditions)
  }
  componentWillReceiveProps(newProps){
    if(newProps.termsAndConditions.hasOwnProperty("updateTermsAndConditions")){
      let newTermsAndConditions = Object.assign({}, this.state.termsAndConditions, newProps.termsAndConditions.updateTermsAndConditions)
      this.setState({
        termsAndConditions: newTermsAndConditions,
        snackBarOpenSuccess: true,
        snackBarMessageSuccess: "You Have Successfully Updated This Terms And Conditions"
      });
    }
  }

  onCloseHandlerSuccess = () => {
    this.setState({
      snackBarOpenSuccess: false
    })
  }
  render(){
    const { termsAndConditions, snackBarMessageSuccess, snackBarOpenSuccess} = this.state;

    return (
      <div>
          <div>
          <Card>
            <CardHeader color="primary">
              <h4> Terms and Conditions</h4>
              <p>Update Site Terms and Conditions</p>
            </CardHeader>
            <CardBody>
              <Grid container>
                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                    id="terms-conditions"
                    formControlProps={{
                    fullWidth: true
                    }}
                    inputProps={{
                      value: termsAndConditions,
                      multiline: true,
                      rows: 20,
                      onChange: this.handleChange
                    }}
                  />
                  <InputAdornment> Terms and Conditions</InputAdornment>
                </GridItem>
              </Grid>
            </CardBody>
            <CardFooter>
              <Button color="primary"> Update </Button>
            </CardFooter>
          </Card>
        </div>
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
        </div>
    );
  }
}

export default TermsAndConditions;
