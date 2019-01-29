// @desc This is the Order Notification/Email Template Component
// @author Sylvia Onwukwe
import React from "react";
import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";

import GridItem from "../../../components/Grid/GridItem";
import Card from "../../../components/Card/Card";
import CardBody from "../../../components/Card/CardBody";
import CardHeader from "../../../components/Card/CardHeader";
import CardFooter from "../../../components/Card/CardFooter";
import CustomInput from "../../../components/CustomInput/CustomInput";
import Button from "../../../components/CustomButtons/Button";

class OrderNotification extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimaton: "cardHidden"
    };
  }
  state = {
    age: "",
    name: "hai",
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };
  componentDidMount() {
    // we add a hidden class to the card and after 700 ms we delete it and the transition appears
    setTimeout(
      function() {
        this.setState({ cardAnimaton: "" });
      }.bind(this),
      700
    );
  }
  render(){

    return (
      <div>
          <div>
          <Card>
            <CardHeader color="primary">
              <h4> Order Notification</h4>
              <p>Order Notification Template</p>
            </CardHeader>
            <CardBody>
              <Grid container>
              <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                    id="password-reset"
                    formControlProps={{
                      fullWidth: true,
                      required: true
                    }}
                  />
                  <InputAdornment> Subject</InputAdornment>
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                    id="email-body"
                    formControlProps={{
                      fullWidth: true,
                      required: true
                    }}
                    inputProps={{
                        multiline: true,
                        rows: 5
                    }}
                  />
                  <InputAdornment> Email Body</InputAdornment>
                </GridItem>
              </Grid>
            </CardBody>
            <CardFooter>
              <Button color="primary"> Update </Button>
            </CardFooter>
          </Card>
        </div>
        </div>
    );
  }
}

export default OrderNotification;
