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
import { getCategories, getBrands, getSliders, getVendor } from "../../actions/actions_front";
import { PageLoader } from "../../components/PageLoader/PageLoader";
import { getProductKind } from "../../actions/actions_product_kind";
import LinkManager from "../../helpers/linkManager";
import Slider from "../../components/Parallax/Slider";
import VendorIntro from "../../components/VendorView/VendorIntro";
// import { getProducts } from "../../actions/actions_products";

class Categories extends React.Component {
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

  componentDidMount() {
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

        <Slider classes={classes} slides={front.sliders} vendor={vendor} />
        <VendorIntro videoLink="https://www.youtube.com/embed/W36sC0EgN1w" vendor={vendor} />

        <div className={classNames(classes.main, classes.mainRaised)}>
          <Stage
            products={products}
            singleProduct={false}
            heading={pageTitle}
            categories={front.categories}
            vendors={front.vendors}
            brands={front.brands}
            categoryId={id}
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


export default Categories;
