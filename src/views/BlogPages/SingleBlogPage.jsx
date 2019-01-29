import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
import ReactGa from "react-ga";
// import withStyles from "@material-ui/core/styles/withStyles";
// core components
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import HeaderLinks from "../../components/Header/HeaderLinks";
import Parallax from "../../components/Parallax/Parallax";
import LeftLinks from "../../components/Header/LeftLinks";
import { PageLoader } from "../../components/PageLoader/PageLoader";

// Sections for this page
import SingleBlogStage from "./Sections/SingleBlogStage";
import LinkManager from "../../helpers/linkManager";
import { getBlog, getCategories, getVendor } from "../../actions/actions_front";
import VendorIntro from "../../components/VendorView/VendorIntro";

class SingleBlog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: "block",
      blog: {},
      ga: false,
    };
  }

  componentWillMount() {
    const { dispatch, location, shopLocation } = this.props;
    const id = LinkManager.decode(location.search);
    const { vendor } = shopLocation;
    dispatch(getVendor(vendor))
      .then(() => {
        const { front } = this.props;
        const { ga } = this.state;
        if (!ga) {
          const { googleAnalytics } = front.vendor;
          if (googleAnalytics.trackingId !== "") {
            ReactGa.initialize(googleAnalytics.trackingId);
            ReactGa.set({ page: window.location.pathname });
            ReactGa.pageview(window.location.pathname);
            this.setState({ ga: true });
          }
        }
      })
      .catch(ex => console.log);
    dispatch(getCategories(vendor));
    dispatch(getBlog(id))
      .then(() => {
        const { blog } = this.props;
        this.setState({ loader: "none", blog });
      });
  }

  render() {
    const { classes, location, shopLocation, vendor, categories, ...rest } = this.props;
    const { loader, blog } = this.state;

    if (vendor.businessName === undefined) {
      return (
        <PageLoader display={loader} />
      );
    }

    document.title = (Object.keys(blog).length > 0) ? `${blog.title} @ ${vendor.businessName} || ${vendor.frontend.description}` : null;

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

        <Parallax filter className="slick-image" image={(blog.image && blog.image.includes("https://")) ? blog.image : null}>
          <div className={classes.container}>
            <GridContainer>
              <GridItem>
                <div style={{ textAlign: "center", color: "#ffffff" }}>
                  <h1 className={classes.title}>
                    {blog.title}
                  </h1>
                </div>
              </GridItem>
            </GridContainer>
          </div>
        </Parallax>
        <VendorIntro videoLink="https://www.youtube.com/embed/W36sC0EgN1w" vendor={vendor} />

        <div className={classNames(classes.main, classes.mainRaised)}>
          <SingleBlogStage blog={blog} shop={shopLocation} vendor={vendor} />
        </div>
        <Footer topFooter shop={shopLocation} vendor={vendor} categories={categories} />
      </div>
    );
  }
}

export default SingleBlog;
