import React from "react";
import classNames from "classnames";
import ReactGa from "react-ga";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
// sections for this page
import HeaderLinks from "../../components/Header/HeaderLinks";
import LeftLinks from "../../components/Header/LeftLinks";
import Stage from "./Sections/Stage";
import { getBrands, getCategories, getVendor } from "../../actions/actions_front";
import { PageLoader } from "../../components/PageLoader/PageLoader";
import Slider from "../../components/Parallax/Slider";
import VendorIntro from "../../components/VendorView/VendorIntro";
import Brand1 from "../../assets/img/BRAND1.jpg";
import Brand2 from "../../assets/img/BRAND2.jpg";

class Brand extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: "block",
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
    dispatch(getBrands(vendor))
      .then(() => {
        this.setState({ loader: "none" });
      });
  }

  render() {
    const { classes, front, location, shopLocation, ...rest } = this.props;
    const { loader } = this.state;
    const { vendor } = front;

    if (vendor.businessName === undefined) {
      return (
        <PageLoader display={loader} />
      );
    }

    document.title = `Brands @ ${vendor.businessName} || ${vendor.frontend.description}`;

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

        <Slider classes={classes} images={[Brand1, Brand2]} />
        <VendorIntro videoLink="https://www.youtube.com/embed/W36sC0EgN1w" vendor={vendor} />

        <div className={classNames(classes.main, classes.mainRaised)}>
          <Stage brands={front.brands} shop={shopLocation} vendor={vendor} />
        </div>
        <Footer
          topFooter
          vendor={vendor}
          shop={shopLocation}
          categories={front.categories}
        />
      </div>
    );
  }
}


export default Brand;
