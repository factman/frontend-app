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

class ViewContactForm extends React.Component {
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
Contact Forms
                    </h4>
                    <p>
Manage Contact Form Messages
                    </p>
                  </CardHeader>
                  <CardBody>
                    <CustomInput
                      labelText=""
                      id="sender"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "text",
                        value: "Anna Barley",
                        endAdornment: (
                          <InputAdornment position="end">
                            <People />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <CustomInput
                      labelText=""
                      id="email"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "email",
                        value: "annabarley@gmail.com",
                        endAdornment: (
                          <InputAdornment position="end">
                            <Email />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <CustomInput
                      labelText=""
                      id="subject"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "text",
                        value: "How to register as a vendor",
                        endAdornment: (
                          <InputAdornment position="end">
                            <Note />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <CustomInput
                      labelText=""
                      id="pass"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        multiline: true,
                        rows: 5,
                        value: "Dummy Text Dummy TextDummy TextDummy TextDummy TextDummy Text Dummy TextDummy TextDummy Text Dummy TextDummy TextDummy TextvDummy TextDummy TextDummy TextDummy Textvv",
                        endAdornment: (
                          <InputAdornment position="end">
                            <Note />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <CustomInput
                      labelText="Type Your Message"
                      id="content"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        multiline: true,
                        rows: 5,
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
Reply
                      {" "}
                    </Button>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={2} />
                </CardFooter>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    );
  }
}

export default ViewContactForm;
