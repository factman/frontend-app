import React from "react";
import { Redirect } from "react-router";
// core components
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import Card from "../../components/Card/Card";
import CardBody from "../../components/Card/CardBody";
import CardHeader from "../../components/Card/CardHeader";
import CardFooter from "../../components/Card/CardFooter";
import LandingPageLinks from "../../components/Header/LandingPageLinks";
import LandingPageMobile from "../../components/Header/LandingPageMobile";
import ProfileSetup from "./Sections/ProfileSetup";
import image from "../../assets/img/account-setup.jpeg";
import { setUsersAccount, getUsersToken, getIdFromToken } from "../../components/Auth/AccessControl";
import { Typography } from "../../../node_modules/@material-ui/core";

class AccountSetup extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimaton: "cardHidden",
      page: 4,
    };

    this.pageContent = [
      {
        title: "Account Disabled",
        desc: "Your account has been disabled, ACCESS DENIED.",
        content: (
          <Typography variant="display1" align="center">
            ACCESS DENIED
          </Typography>),
      },
      {
        title: "Account Setup",
        desc: "Complete profile information to get validated and verified.",
        content: <ProfileSetup setPage={this.setPage} />,
      },
      {
        title: "Inactive Account",
        desc: "Your account is yet to be activated by the admin, INACTIVE ACCOUNT",
        content: (
          <Typography variant="display1" align="center">
            INACTIVE ACCOUNT
          </Typography>),
      },
      {
        title: "Redirecting",
        desc: "",
        content: (<Redirect to={{ pathname: "/admin", state: { from: "/" } }} />),
      },
      {
        title: "Loading...",
        desc: "",
        content: (
          <Typography variant="display1" align="center">
            Loading...
          </Typography>),
      },
    ];
  }

  componentWillMount() {
    this.setPage();
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

  getPage = (user) => {
    const { accessToken } = getUsersToken(user);
    const id = getIdFromToken(accessToken);
    return setUsersAccount({ user, id, accessToken })
      .then(({ profile }) => {
        const { standing, action, completeProfile } = profile;

        if (action !== "allow") {
          return 0;
        }
        if (!completeProfile) {
          return 1;
        }
        if (standing !== "active") {
          return 2;
        }
        return 3;
      });
  };

  setPage = () => {
    this.getPage("admin")
      .then(page => this.setState({ page }));
  };

  render() {
    const { classes, ...rest } = this.props;
    const { cardAnimaton, page } = this.state;

    document.title = "Account Setup @ Bezop Marketplace || Worlds First Decentralized Marketplace";

    if (page === 3) {
      return (this.pageContent[page].content);
    }

    return (
      <div>
        <Header
          color="white"
          brand=""
          leftLinks={<LandingPageLinks user="admin" />}
          rightLinks={<LandingPageMobile user="admin" />}
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
                        {this.pageContent[page].title}
                      </h3>
                      <div className={classes.socialLine}>
                        <h4>
                          {this.pageContent[page].desc}
                        </h4>
                      </div>
                    </CardHeader>
                    <CardBody>
                      {this.pageContent[page].content}
                    </CardBody>
                    <CardFooter className={classes.cardFooter}>
                      {""}
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
