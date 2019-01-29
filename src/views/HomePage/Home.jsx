import React from "react";
import classNames from "classnames";
import Events from "events";
import ReactGa from "react-ga";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
// sections for this page
import HeaderLinks from "../../components/Header/HeaderLinks";
import LeftLinks from "../../components/Header/LeftLinks";
import Stage from "./Sections/Stage";
import Slider from "../../components/Parallax/Slider";
import { getSliders, getCategories, getBrands, getVendor } from "../../actions/actions_front";
import { PageLoader } from "../../components/PageLoader/PageLoader";
import { getProductKind } from "../../actions/actions_product_kind";
import VendorIntro from "../../components/VendorView/VendorIntro";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: "block",
      ga: false,
    };

    this.events = new Events();
  }

  componentWillMount() {
    try {
      const { dispatch, shopLocation } = this.props;
      const { vendor } = shopLocation;
      const kinds = ["deal", "feature", "popular", "latest"];
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
      dispatch(getSliders(vendor));
      dispatch(getBrands(vendor));
      dispatch(getCategories(vendor));
      kinds.map((kind, index) => dispatch(getProductKind(vendor, kind))
        .then(() => {
          if (index === (kinds.length - 1)) this.setState({ loader: "none" });
        }));
    } catch (ex) {
      console.log(ex.message);
    }
  }

  render() {
    const { classes, front, products, location, shopLocation, ...rest } = this.props;
    const { loader } = this.state;
    const { vendor } = front;

    if (vendor.businessName === undefined) {
      return (
        <PageLoader display={loader} />
      );
    }

    document.title = `${vendor.businessName} || ${vendor.frontend.description}`;
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

        <Slider classes={classes} slides={front.sliders} />
        <VendorIntro videoLink="https://www.youtube.com/embed/W36sC0EgN1w" vendor={vendor} />

        <div className={classNames(classes.main, classes.mainRaised)}>
          <Stage
            shop={shopLocation}
            products={products}
            categories={front.categories}
            brands={front.brands}
            events={this.events}
            vendor={vendor}
          />
        </div>
        <Footer
          topFooter
          shop={shopLocation}
          vendor={vendor}
          categories={front.categories}
        />
      </div>
    );
  }
}


export default Home;
