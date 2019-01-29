import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
import ReactGa from "react-ga";
// core components
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import HeaderLinks from "../../components/Header/HeaderLinks";
import LeftLinks from "../../components/Header/LeftLinks";
import { PageLoader } from "../../components/PageLoader/PageLoader";
import BlogStage from "./Sections/BlogStage";
import { getBlogs, getCategories, getVendor } from "../../actions/actions_front";
import Slider from "../../components/Parallax/Slider";
import VendorIntro from "../../components/VendorView/VendorIntro";
import Blog1 from "../../assets/img/BLOG1.jpg";
import Blog2 from "../../assets/img/BLOG2.jpg";

// Sections for this page

class Blog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: "block",
      blogs: [],
      ga: false,
    };
  }

  componentWillMount() {
    const { dispatch, shopLocation } = this.props;
    const { vendor } = shopLocation;
    dispatch(getVendor(vendor))
      .then(() => {
        const { front } = this.props;
        const { ga } = this.state;
        try {
          if (!ga) {
            const { googleAnalytics } = front.vendor;
            if (googleAnalytics.trackingId !== "") {
              ReactGa.initialize(googleAnalytics.trackingId);
              ReactGa.set({ page: window.location.pathname });
              ReactGa.pageview(window.location.pathname);
              this.setState({ ga: true });
            }
          }
        } catch (ex) {
          console.log(ex.message);
        }
      });
    dispatch(getCategories(vendor));
    dispatch(getBlogs(vendor))
      .then(() => {
        const { blogs } = this.props;
        this.setState({ loader: "none", blogs });
      });
  }

  render() {
    const { classes, location, shopLocation, vendor, categories, ...rest } = this.props;
    const { loader, blogs } = this.state;

    if (vendor.businessName === undefined) {
      return (
        <PageLoader display={loader} />
      );
    }

    document.title = `Blog @ ${vendor.businessName} || ${vendor.frontend.description}`;
    return (
      <div style={{ backgroundColor: "white" }}>
        <PageLoader display={loader} />
        <Header
          // brand={vendor.businessName}
          // vendorLogo={vendor.frontend.logo}
          nologo
          vendorDomain={vendor.domainName}
          rightLinks={<HeaderLinks shop={shopLocation} events={this.events} user="customer" />}
          leftLinks={<LeftLinks shop={shopLocation} events={this.events} user="customer" />}
          color="transparent"
          absolute
          {...rest}
        />

        <Slider classes={classes} images={[Blog1, Blog2]} />
        <VendorIntro videoLink="https://www.youtube.com/embed/W36sC0EgN1w" vendor={vendor} />

        <div className={classNames(classes.main, classes.mainRaised)}>
          <BlogStage shop={shopLocation} blogs={blogs} vendor={vendor} />
        </div>
        <Footer topFooter shop={shopLocation} vendor={vendor} categories={categories} />
      </div>
    );
  }
}

export default Blog;
