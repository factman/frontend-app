import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
import ReactGa from "react-ga";
// core components
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { PageLoader } from "../../components/PageLoader/PageLoader";
// Sections for this page
import FormSection from "./Sections/FormSection";
import Maps from "../Maps/Maps";
import { getVendor, getCategories } from "../../actions/actions_front";
import { getMap } from "../../actions/actions_map";
import HeaderLinks from "../../components/Header/HeaderLinks";
import LeftLinks from "../../components/Header/LeftLinks";
import VendorIntro from "../../components/VendorView/VendorIntro";

class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: "block",
      ga: false,
    };
  }

  componentWillMount() {
    try {
      const { dispatch, shopLocation } = this.props;
      const { vendor } = shopLocation;
      dispatch(getCategories(vendor));
      dispatch(getVendor(vendor))
        .then(() => {
          try {
            const { props } = this;
            const { address } = props.vendor;
            const { ga } = this.state;
            if (!ga) {
              const { googleAnalytics } = props.vendor;
              if (googleAnalytics.trackingId !== "") {
                ReactGa.initialize(googleAnalytics.trackingId);
                ReactGa.set({ page: window.location.pathname });
                ReactGa.pageview(window.location.pathname);
                this.setState({ ga: true });
              }
            }
            dispatch(getMap(`${address.street}, ${address.city}, ${address.state}, ${address.country}`))
              .then(() => {
                this.setState({ loader: "none" });
              });
          } catch (ex) {
            console.log(ex.message);
          }
        });
    } catch (ex) {
      console.log(ex.message);
    }
  }

  render() {
    const { classes, vendor, categories, map, location, shopLocation, ...rest } = this.props;
    const { loader } = this.state;

    if (vendor.businessName === undefined) {
      return (
        <PageLoader display={loader} />
      );
    }

    document.title = `Contact Us @ ${vendor.businessName} || ${vendor.frontend.description}`;

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

        <Maps location={map} />
        <VendorIntro videoLink="https://www.youtube.com/embed/W36sC0EgN1w" vendor={vendor} />

        <div className={classNames(classes.main, classes.mainRaised)}>
          <div className={classes.container}>
            <FormSection vendor={vendor} />
          </div>
        </div>
        <Footer
          topFooter
          shop={shopLocation}
          vendor={vendor}
          categories={categories}
        />
      </div>
    );
  }
}

export default Contact;
