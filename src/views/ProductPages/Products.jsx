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
import { getCategories, getBrands, getSliders, getVendor } from "../../actions/actions_front";
import { PageLoader } from "../../components/PageLoader/PageLoader";
import Slider from "../../components/Parallax/Slider";
import { getProductKind } from "../../actions/actions_product_kind";
import VendorIntro from "../../components/VendorView/VendorIntro";
// import { getProducts } from "../../actions/actions_products";

class Products extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loader: "block",
      products: [],
      pageTitle: "",
      ga: false,
    };

    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    this.events = new Events();
  }

  componentWillMount() {
    const { dispatch, shopLocation } = this.props;
    const { vendor, paths } = shopLocation;
    const kind = paths[2] || paths[1];
    dispatch(getSliders(vendor));
    dispatch(getBrands(vendor));
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
    dispatch(getProductKind(vendor, kind))
      .then(
        () => {
          let allProducts = {};
          const { products } = this.props;

          switch (kind) {
            case "deal":
              allProducts = products.deal;
              this.setState({
                pageTitle: "Today's Deal",
                products: allProducts,
                loader: "none",
              });
              break;
            case "featured":
              allProducts = products.feature;
              this.setState({
                pageTitle: "Featured Products",
                products: allProducts,
                loader: "none",
              });
              break;
            case "latest":
              allProducts = products.latest;
              this.setState({
                pageTitle: "Latest Products",
                products: allProducts,
                loader: "none",
              });
              break;
            case "popular":
              allProducts = products.popular;
              this.setState({
                pageTitle: "Popular Products",
                products: allProducts,
                loader: "none",
              });
              break;
            default:
              allProducts = products;
              this.setState({
                pageTitle: "Products",
                products: allProducts,
                loader: "none",
              });
          }
        },
      );
  }

  render() {
    const { classes, front, location, shopLocation, ...rest } = this.props;
    const { products, pageTitle, loader } = this.state;
    const { vendor } = front;

    if (vendor.businessName === undefined) {
      return (
        <PageLoader display={loader} />
      );
    }

    document.title = (Object.keys(vendor).length > 0) ? `${pageTitle} @ ${vendor.businessName} || ${vendor.frontend.description}` : null;

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
          shop={shopLocation}
          {...rest}
        />

        <Slider classes={classes} slides={front.sliders} vendor={vendor} />
        <VendorIntro videoLink="https://www.youtube.com/embed/W36sC0EgN1w" vendor={vendor} />

        <div className={classNames(classes.main, classes.mainRaised)}>
          <Stage
            products={products}
            singleProduct={false}
            heading={pageTitle}
            categories={front.categories}
            brands={front.brands}
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

export default Products;
