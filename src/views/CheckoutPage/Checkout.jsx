import React from "react";
import classNames from "classnames";
import Events from "events";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
// sections for this page
import Stage from "./Sections/Stage";
import { PageLoader } from "../../components/PageLoader/PageLoader";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import Parallax from "../../components/Parallax/Parallax";
import { getProductsById } from "../../actions/actions_product_kind";
import LandingPageMobile from "../../components/Header/LandingPageMobile";
import LandingPageLinks from "../../components/Header/LandingPageLinks";
import CartObject from "../../helpers/customerOperations";

class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: "block",
      products: {},
    };
    this.events = new Events();
  }

  componentWillMount() {
    try {
      const { dispatch } = this.props;
      const cart = localStorage.order
        ? (() => {
          const prods = JSON.parse(localStorage.order).products;
          const arr = [];
          const vendors = Object.keys(prods);
          vendors.map((item) => {
            Object.keys(prods[item]).map(id => arr.push(id));
            return item;
          });
          return arr;
        })()
        : (() => {
          const arr = [];
          CartObject.getCart().map(item => arr.push(item.product));
          return arr;
        })();
      console.log(cart);
      if (cart.length > 0) {
        dispatch(getProductsById(cart))
          .then(() => {
            const { shoppingCart } = this.props;
            const products = shoppingCart || {};
            this.setState({ loader: "none", products });
          });
      }
    } catch (ex) {
      console.log(ex.message);
      this.setState({ loader: "none" });
    }
  }

  render() {
    const { classes, location, ...rest } = this.props;
    const { loader, products } = this.state;
    document.title = "Shopping Cart @ Bezop Marketplace || Worlds First Decentralized Marketplace";

    return (
      <div>
        <PageLoader display={loader} />
        <Header
          brand=""
          rightLinks={<LandingPageMobile events={this.events} user="customer" />}
          leftLinks={<LandingPageLinks events={this.events} user="customer" />}
          color="white"
          {...rest}
        />

        <Parallax
          style={{ height: "400px" }}
          image="https://images.pexels.com/photos/953862/pexels-photo-953862.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
        >
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
          >
            {" "}
          </div>
          <div className={classes.container}>
            <GridContainer>
              <GridItem>
                <div
                  style={{
                    textAlign: "center",
                    color: "#ffffff",
                  }}
                >
                  <h1 className={classes.title}>
                    Shopping Cart
                  </h1>
                  <h3>
                    Complete your shopping with few clicks.
                  </h3>
                </div>
              </GridItem>
            </GridContainer>
          </div>
        </Parallax>

        <div className={classNames(classes.main, classes.mainRaised)}>
          <Stage
            products={products}
            events={this.events}
            shop={location}
          />
        </div>
        <Footer />
      </div>
    );
  }
}


export default Checkout;
