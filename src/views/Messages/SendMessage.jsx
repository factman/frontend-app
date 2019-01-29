import React from "react";
import InputAdornment from "@material-ui/core/InputAdornment";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import Note from "@material-ui/icons/Note";
import People from "@material-ui/icons/People";
// core components
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import Card from "../../components/Card/Card";
import CardBody from "../../components/Card/CardBody";
import CardHeader from "../../components/Card/CardHeader";
import CustomInput from "../../components/CustomInput/CustomInput";

class SendMessage extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimaton: "cardHidden"
    };
  }
  componentDidMount() {
    // we add a hidden class to the card and after 700 ms we delete it and the transition appears
    this.cardAnimation = setTimeout(
      function() {
        this.setState({ cardAnimaton: "" });
      }.bind(this),
      700
    );
  }

  //This is use to stop setTimeout 
  //in case user leave the page before the setTimout occur
  //This prevent memory leakage
  componentWillUnmount(){
    clearTimeout(this.cardAnimation);
  }
  render() {
    return (
      <div>
          <div>
            <GridContainer justify="center">
              <GridItem>
                <Card>
                  <form>
                  <CardHeader color="primary">
              <h4>Message</h4>
              <p>Send A New Message</p>
            </CardHeader>
                    <CardBody>
                      <CustomInput
                        labelText="Send To..."
                        id="sender"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "text",
                          endAdornment: (
                            <InputAdornment position="end">
                              <People />
                            </InputAdornment>
                          )
                        }}
                      />
                      <CustomInput
                        labelText="Receiver's Email..."
                        id="email"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "email",
                          endAdornment: (
                            <InputAdornment position="end">
                              <Email />
                            </InputAdornment>
                          )
                        }}
                      />
                      <CustomInput
                        labelText="Subject"
                        id="pass"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "text",
                          endAdornment: (
                            <InputAdornment position="end">
                              <Note
                              />
                            </InputAdornment>
                          )
                        }}
                      />
                      <CustomInput
                        labelText="Message Content"
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
                  </form>
                </Card>
              </GridItem>
            </GridContainer>
          </div>
        </div>
    );
  }
}

export default SendMessage;
