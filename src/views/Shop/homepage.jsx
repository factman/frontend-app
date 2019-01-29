import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Location from "@material-ui/icons/MyLocation";
// core components
// import Header from "../../components/Header/Header";
// import HeaderLinks from "../../components/Header/HeaderLinks";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import Button from "../../components/CustomButtons/Button";
import Card from "../../components/Card/Card";
import CardBody from "../../components/Card/CardBody";
import CardHeader from "../../components/Card/CardHeader";
import CardFooter from "../../components/Card/CardFooter";
import CustomInput from "../../components/CustomInput/CustomInput";

import loginPageStyle from "../../assets/jss/material-kit-react/views/loginPage";

class HomePage extends React.Component {
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

  // This is use to stop setTimeout to prevent memory leaking of the server
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
Vendor Homepage
                    </h4>
                  </CardHeader>
                  <p className={classes.divider}>
Update Your Homepage
                  </p>
                  <CardBody>
                    <CustomInput
                      labelText="Store Name"
                      id="StoreName"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "text",
                        endAdornment: (
                          <InputAdornment position="end">
                            <Store className={classes.inputIconsColor} />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <CustomInput
                      labelText="Store Location"
                      id="location"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "text",
                        endAdornment: (
                          <InputAdornment position="end">
                            <Location
                              className={classes.inputIconsColor}
                            />
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

export default withStyles(loginPageStyle)(HomePage);
