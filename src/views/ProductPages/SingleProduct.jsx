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
import Parallax from "../../components/Parallax/Parallax";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import { PageLoader } from "../../components/PageLoader/PageLoader";
import { getProductById, getProductKind } from "../../actions/actions_product_kind";
import LinkManager from "../../helpers/linkManager";
import { getVendor, getCategories } from "../../actions/actions_front";
import VendorIntro from "../../components/VendorView/VendorIntro";

class SingleProduct extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loader: "block",
      product: {},
      productId: LinkManager.decode(props.location.search),
      otherProducts: [],
      ga: false,
    };

    this.events = new Events();
  }

  componentWillMount() {
    const { dispatch, shopLocation } = this.props;
    const { vendor } = shopLocation;
    const { productId } = this.state;

    dispatch(getProductKind(vendor, "normal"))
      .then(
        () => {
          const { products: { allProducts } } = this.props;
          this.setState({ otherProducts: allProducts });
        },
      );
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
    dispatch(getProductById([productId]))
      .then(
        () => {
          this.setState({ loader: "none" });
          const { products } = this.props;
          this.setState({ product: products.singleProduct[productId], loader: "none" });
        },
      )
      .catch(ex => console.log);
  }

  render() {
    const {
      classes,
      location,
      shopLocation,
      front,
      dispatch,
      customerReview,
      ...rest
    } = this.props;
    const { product, loader, otherProducts } = this.state;
    const { vendor } = front;

    try {
      if (vendor.businessName === undefined || product.name === undefined) {
        return (
          <PageLoader display={loader} />
        );
      }
    } catch (ex) {
      console.log(ex.message);
      return <PageLoader display="block" />;
    }

    document.title = (product) ? `${product.name} @ ${vendor.businessName} || ${vendor.frontend.description}` : null;

    let banner = null;
    try {
      banner = product.images.image_lg;
    } catch (ex) {
      return <PageLoader display="block" />;
    }

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

        <Parallax filter className="slick-image" image={banner}>
          <div className={classes.container}>
            <GridContainer>
              <GridItem>
                <div style={{
                  textAlign: "center",
                  color: "#ffffff",
                }}
                >
                  <h3 className={classes.title}>
                    {(vendor.businessName) ? vendor.businessName : null}
                  </h3>
                  <h3>
                    Quantity Sold
                    {/* {(product.description) ? product.descriptionShort : null} */}
                  </h3>
                </div>
              </GridItem>
            </GridContainer>
          </div>
        </Parallax>
        <VendorIntro videoLink="https://www.youtube.com/embed/W36sC0EgN1w" vendor={vendor} />

        <div className={classNames(classes.main, classes.mainRaised)}>
          <Stage
            product={product}
            otherProducts={otherProducts}
            customerReview={customerReview}
            singleProduct
            heading={product.name}
            events={this.events}
            dispatch={dispatch}
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

export default SingleProduct;
