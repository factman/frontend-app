import React from "react";
import classNames from "classnames";
import Events from "events";
import ReactGa from "react-ga";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
// sections for this page
import HeaderLinks from "../../components/Header/HeaderLinks";
import LeftLinks from "../../components/Header/LeftLinks";
import Stage from "../ProductPages/Sections/Stage";
import { getBrands, getSliders, getCategories, getVendor } from "../../actions/actions_front";
import { PageLoader } from "../../components/PageLoader/PageLoader";
import { getProductKind } from "../../actions/actions_product_kind";
import Slider from "../../components/Parallax/Slider";
import LinkManager from "../../helpers/linkManager";

class Brands extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: "block",
      products: [],
      pageTitle: "",
      id: "",
      ga: false,
    };

    this.events = new Events();
  }

  componentWillMount() {
    const { dispatch, location, shopLocation } = this.props;
    const { vendor } = shopLocation;
    const kind = "normal";
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
    dispatch(getProductKind(vendor, kind))
      .then(() => {
        const { products } = this.props;
        if (products.length > 0) {
          const allProducts = products;
          this.setState({
            pageTitle: "Products",
            products: allProducts,
            loader: "none",
            id: LinkManager.decode(location.search),
          });
        }
        this.setState({ loader: "none" });
      });
  }

  render() {
    const { classes, front, location, shopLocation, ...rest } = this.props;
    const { products, pageTitle, loader, id } = this.state;
    const { vendor } = front;

    if (vendor.businessName === undefined) {
      return (
        <PageLoader display={loader} />
      );
    }

    document.title = `${pageTitle} @ ${vendor.businessName} || ${vendor.frontend.description}`;

    return (
      <div>
        <PageLoader display={loader} />
        <Header
          brand={vendor.businessName}
          vendorLogo={vendor.frontend.logo}
          vendorDomain={vendor.domainName}
          rightLinks={<HeaderLinks shop={shopLocation} events={this.events} user="customer" />}
          leftLinks={<LeftLinks shop={shopLocation} events={this.events} user="customer" />}
          color="white"
          {...rest}
        />

        <Slider classes={classes} slides={front.sliders} vendor={vendor} />

        <div className={classNames(classes.main, classes.mainRaised)}>
          <Stage
            products={products}
            singleProduct={false}
            heading={pageTitle}
            categories={front.categories}
            vendors={front.vendors}
            brands={front.brands}
            brandId={id}
            events={this.events}
            shop={shopLocation}
            vendor={vendor}
          />
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


export default Brands;
