import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// core components
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { PageLoader } from "../../components/PageLoader/PageLoader";
// Sections for this page
import ProductSection from "./Sections/ProductSection";
// import TeamSection from "./Sections/TeamSection";
import WorkSection from "./Sections/WorkSection";
import LandingPageLinks from "../../components/Header/LandingPageLinks";
import LandingPageMobile from "../../components/Header/LandingPageMobile";
import Slider from "../../components/Parallax/Slider";
import ABOUT1 from "../../assets/img/ABOUT1.jpg";
import ABOUT2 from "../../assets/img/ABOUT2.jpg";

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

    document.title = "About Us @ Bezop Marketplace || Worlds First Decentralized Marketplace";
    return (
      <div>
        <PageLoader display={loader} />
        <Header
          brand=""
          color="transparent"
          absolute
          leftLinks={<LandingPageLinks user="customer" />}
          rightLinks={<LandingPageMobile user="customer" />}
          {...rest}
        />

        <Slider classes={classes} images={[ABOUT1, ABOUT2]} />

        <div className={classNames(classes.main, classes.mainRaised)}>
          <div className={classes.container}>
            <ProductSection />
            {/* <TeamSection /> */}
            <WorkSection />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default About;
