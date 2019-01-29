import React from "react";
import Events from "events";
import classNames from "classnames";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
// sections for this page
import HeaderLinks from "../../components/Header/HeaderLinks";
import LeftLinks from "../../components/Header/LeftLinks";
import Stage from "../ProductPages/Sections/Stage";
import Parallax from "../../components/Parallax/Parallax";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import { getCategories, getVendors, getBrands, getProducts } from "../../actions/actions_front";
import { PageLoader } from "../../components/PageLoader/PageLoader";

class Vendors extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loader: "block",
      products: {},
      pageTitle: "",
      pageBanner: "",
      id: this.props.match.url.replace("/vendor/", ""),
    };

    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    this.events = new Events();
  }

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(getVendors());
    dispatch(getBrands());
    dispatch(getCategories());
    dispatch(getProducts())
      .then(
        () => {
          const productVendor = this.props.match.url.replace("/vendor/", "");
          let products = {};

          if (this.props.front.vendors[productVendor]) {
            products = this.props.front.products.filter(product => product.vendorId === Number(productVendor));
            this.setState({
              pageTitle: this.props.front.vendors[productVendor].name,
              pageBanner: this.props.front.vendors[productVendor].image,
              products,
              loader: "none",
            });
          }
        },
      );
  }

  componentWillReceiveProps(newProps) {
    if (this.props.match.url !== newProps.match.url) {
      this.setState({ loader: "block" });

      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;

      const productVendor = newProps.match.url.replace("/vendor/", "");
      let products = {};
      if (newProps.front.vendors[productVendor]) {
        products = newProps.front.products.filter(product => product.vendorId === Number(productVendor));
        this.setState({
          pageTitle: newProps.front.vendors[productVendor].name,
          pageBanner: newProps.front.vendors[productVendor].image,
          products,
          loader: "none",
        });
      }
    }
  }

  render() {
    const { classes, front, match, ...rest } = this.props;
    const { products, pageTitle, pageBanner, loader } = this.state;
    document.title = `${pageTitle} @ Bezop Marketplace || Worlds First Decentralized Marketplace`;

    return (
      <div>
        <PageLoader display={loader} />
        <Header
          brand=""
          rightLinks={<HeaderLinks events={this.events} user="customer" />}
          leftLinks={<LeftLinks events={this.events} user="customer" />}
          color="white"
          {...rest}
        />

        <Parallax style={{ height: "400px" }} image={(pageBanner) || null}>
          <div style={{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            content: "",
            display: "block",
            height: "100%",
            left: 0,
            top: 0,
            position: "absolute",
            width: "100%",
          }}
          />
          <div className={classes.container}>
            <GridContainer>
              <GridItem>
                <div style={{ textAlign: "center", color: "#ffffff" }}>
                  <h1 className={classes.title}>
                    {pageTitle}
                  </h1>
                </div>
              </GridItem>
            </GridContainer>
          </div>
        </Parallax>

        <div className={classNames(classes.main, classes.mainRaised)}>
          <Stage
            products={products}
            singleProduct={false}
            heading={pageTitle}
            categories={front.categories}
            vendors={front.vendors}
            brands={front.brands}
            vendorId={this.state.id}
            events={this.events}
            vendor={vendor}
          />
        </div>
        <Footer topFooter />
      </div>
    );
  }
}


export default Vendors;
