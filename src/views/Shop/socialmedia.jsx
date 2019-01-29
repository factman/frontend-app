import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
// @material-ui/core
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import Button from "../../components/CustomButtons/Button";
import Card from "../../components/Card/Card";
import CardBody from "../../components/Card/CardBody";
import CardHeader from "../../components/Card/CardHeader";
import CardFooter from "../../components/Card/CardFooter";
import CustomInput from "../../components/CustomInput/CustomInput";

import loginPageStyle from "../../assets/jss/material-kit-react/views/loginPage";

class SocialMedia extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimaton: "cardHidden",
    };
  }

  componentDidMount() {
    // we add a hidden class to the card and after 700 ms we delete it and the transition appears
    this.cardAnimation = setTimeout(
      () => {
        this.setState({ cardAnimaton: "" });
      },
      700,
    );
  }

  // This is use to stop setTimeout
  // in case user leave the page before the setTimout occur
  // This prevent memory leakage
  componentWillUnmount() {
    clearTimeout(this.cardAnimation);
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem>
              <Card className={classes[this.state.cardAnimaton]}>
                <form className={classes.form}>
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <h4>
Social Media
                    </h4>
                  </CardHeader>
                  <p className={classes.divider}>
Update Social Media Links
                  </p>
                  <CardBody>
                    <CustomInput
                      labelText="Twitter"
                      id="Twitter"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "text",
                        endAdornment: (
                          <InputAdornment position="end">
                            <i
                              className=" fab fa-twitter"
                            />
                            {" "}
                          </InputAdornment>
                        ),
                      }}
                    />
                    <CustomInput
                      labelText="Facebook"
                      id="Facebook"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "text",
                        endAdornment: (
                          <InputAdornment position="end">
                            <i
                              className=" fab fa-facebook"
                            />
                            {" "}
                          </InputAdornment>
                        ),
                      }}
                    />
                    <CustomInput
                      labelText="Google+"
                      id="Geogle+"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "text",
                        endAdornment: (
                          <InputAdornment position="end">
                            <i
                              className=" fab fa-google"
                            />
                            {" "}
                          </InputAdornment>
                        ),
                      }}
                    />
                    <CustomInput
                      labelText="Youtube"
                      id="Youtube"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "text",
                        endAdornment: (
                          <InputAdornment position="end">
                            <i
                              className=" fab fa-youtube"
                            />
                            {" "}
                          </InputAdornment>
                        ),
                      }}
                    />

                  </CardBody>
                  <CardFooter className={classes.cardFooter}>

                    <Button color="primary">
Update
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    );
  }
}

export default withStyles(loginPageStyle)(SocialMedia);
