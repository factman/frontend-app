import React from "react";
import { Redirect } from "react-router";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
// core components
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import Button from "../../components/CustomButtons/Button";
import Card from "../../components/Card/Card";
import CardBody from "../../components/Card/CardBody";
import CardHeader from "../../components/Card/CardHeader";
import CardFooter from "../../components/Card/CardFooter";
import LandingPageLinks from "../../components/Header/LandingPageLinks";
import LandingPageMobile from "../../components/Header/LandingPageMobile";
import { getAccountStatus } from "../../components/Auth/AccessControl";
import ProfileSetup from "./Sections/ProfileSetup";
import image from "../../assets/img/account-setup.jpeg";
import BusinessSetup from "./Sections/BusinessSetup";

const VERIFIED = 2;

class AccountSetup extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimaton: "cardHidden",
      activeStep: 0,
    };

    this.getActiveStep()
      .then(step => this.setState({ activeStep: step }));
  }

  componentDidMount() {
    // we add a hidden class to the card and after 700 ms we delete it and the transition appears
    setTimeout(
      () => {
        this.setState({ cardAnimaton: "" });
      },
      700,
    );
  }

  getActiveStep = () => {
    try {
      return getAccountStatus("vendor")
        .then(({ completeProfile, emailVerified, domainNameSet, businessVerified }) => {
          if (!completeProfile) {
            return 0;
          }
          if (!emailVerified) {
            return 0;
          }
          if (!domainNameSet) {
            return 1;
          }
          if (!businessVerified) {
            return 1;
          }
          return 2;
        });
    } catch (ex) {
      console.log(ex.message);
      return 0;
    }
  };

  setActiveStep = () => {
    this.getActiveStep()
      .then(step => this.setState({ activeStep: step }));
  };

  getSteps = () => ["Profile Setup", "Business Setup"];

  getStepContent = (step) => {
    switch (step) {
      case 0:
        return <ProfileSetup nextStep={this.setActiveStep} />;
      case 1:
        return <BusinessSetup nextStep={this.setActiveStep} />;
      default:
        return "";
    }
  };

  render() {
    const { classes, ...rest } = this.props;
    const steps = this.getSteps();
    const { activeStep, cardAnimaton } = this.state;

    if (activeStep === VERIFIED) {
      return (<Redirect to={{ pathname: "/dashboard", state: { from: "/" } }} />);
    }

    return (
      <div>
        <Header
          brand=""
          leftLinks={<LandingPageLinks user="vendor" />}
          rightLinks={<LandingPageMobile user="vendor" />}
          color="white"
          {...rest}
        />
        <div
          className={classes.pageHeader}
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: "top center",
          }}
        >
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={8}>
                <Card className={classes[cardAnimaton]}>
                  <form className={classes.form}>
                    <CardHeader color="primary" className={classes.cardHeader}>
                      <h3>
                        Account Setup
                      </h3>
                      <div className={classes.socialLine}>
                        <h4>
                          Complete your vendor account setup to start selling.
                        </h4>
                      </div>
                    </CardHeader>
                    <CardBody>
                      <Stepper activeStep={activeStep} orientation="vertical">
                        {steps.map((label, index) => (
                          <Step key={label}>
                            <StepLabel>
                              {label}
                            </StepLabel>
                            <StepContent>
                              {this.getStepContent(index)}
                            </StepContent>
                          </Step>
                        ))}
                      </Stepper>
                    </CardBody>
                    <CardFooter className={classes.cardFooter}>
                      {activeStep === steps.length && (
                        <div>
                          <Button simple color="primary" size="lg">
                            Visit Your Shop
                          </Button>
                        </div>
                      )}
                    </CardFooter>
                  </form>
                </Card>
              </GridItem>
            </GridContainer>
          </div>
          <Footer whiteFont />
        </div>
      </div>
    );
  }
}

export default (AccountSetup);
