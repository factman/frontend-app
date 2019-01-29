import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// core components
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import Parallax from "../../components/Parallax/Parallax";
import { PageLoader } from "../../components/PageLoader/PageLoader";
// Sections for this page
import PolicySection from "./Sections/PolicySection";
import LandingPageLinks from "../../components/Header/LandingPageLinks";
import LandingPageMobile from "../../components/Header/LandingPageMobile";

class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: "block",
    };

    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  componentDidMount() {
    this.setState({ loader: "none" });
  }

  render() {
    const { classes, ...rest } = this.props;
    const { loader } = this.state;

    document.title = "Privacy Policy @ Bezop Marketplace || Worlds First Decentralized Marketplace";
    return (
      <div>
        <PageLoader display={loader} />
        <Header
          brand=""
          leftLinks={<LandingPageLinks user="customer" />}
          rightLinks={<LandingPageMobile user="customer" />}
          color="white"
          {...rest}
        />

        <Parallax style={{ height: "400px" }} image="https://images.pexels.com/photos/326576/pexels-photo-326576.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260">
          <div style={{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            content: "",
            display: "block",
            height: "100%",
            left: 0,
            top: 0,
            position: "absolute",
            width: "100%",
          }}
          />
          <div className={classes.container}>
            <GridContainer>
              <GridItem>
                <div style={{ textAlign: "center", color: "#ffffff" }}>
                  <h1 className={classes.title}>
                    Bezop Demo Store
                  </h1>
                  <h3>
                    Privacy Policy
                  </h3>
                </div>
              </GridItem>
            </GridContainer>
          </div>
        </Parallax>

        <div className={classNames(classes.main, classes.mainRaised)}>
          <div className={classes.container}>
            <PolicySection />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default About;
