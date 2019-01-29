// @desc Newsletters are composed here by the Admin
// @author Sylvia Onwukwe
import React from "react";
import InputAdornment from "@material-ui/core/InputAdornment";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import Note from "@material-ui/icons/Note";
import People from "@material-ui/icons/People";
// core components
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import Card from "../../../components/Card/Card";
import CardBody from "../../../components/Card/CardBody";
import CardHeader from "../../../components/Card/CardHeader";
import CardFooter from "../../../components/Card/CardFooter";
import CustomInput from "../../../components/CustomInput/CustomInput";
import Button from "../../../components/CustomButtons/Button";
import ModalNewsletter from "./modalNewsletter";

class SendNewsletter extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimaton: "cardHidden",
    };
  }

  componentWillMount() {
    clearTimeout(this.cardAnimaton);
  }

  componentDidMount() {
    // we add a hidden class to the card and after 700 ms we delete it and the transition appears
    this.cardAnimaton = setTimeout(
      () => {
        this.setState({ cardAnimaton: "" });
      },
      700,
    );
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
                    <h4>
Newsletter
                    </h4>
                    <p>
Send Newsletter
                    </p>
                  </CardHeader>
                  <CardBody>
                    <CustomInput
                      labelText="Send To..."
                      id="sender"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "text",
                        endAdornment: (
                          <InputAdornment position="end">
                            <People />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <CustomInput
                      labelText="From"
                      id="email"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "email",
                        endAdornment: (
                          <InputAdornment position="end">
                            <Email />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <CustomInput
                      labelText="Subject"
                      id="pass"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "text",
                        endAdornment: (
                          <InputAdornment position="end">
                            <Note />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <CustomInput
                      labelText="Message Content"
                      id="content"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        multiline: true,
                        rows: 50,
                        endAdornment: (
                          <InputAdornment position="end">
                            <Note />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </CardBody>
                </form>

                <CardFooter>
                  <GridItem xs={12} sm={12} md={10}>
                    <Button color="primary">
                      {" "}
Send
                      {" "}
                    </Button>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={2}>
                    <ModalNewsletter />
                  </GridItem>
                </CardFooter>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    );
  }
}

export default SendNewsletter;
