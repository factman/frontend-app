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

class Compare extends React.Component {
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
      const compare = (localStorage.compare) ? JSON.parse(localStorage.compare) : [];
      dispatch(getProductsById(compare))
        .then(() => {
          const { shoppingCart } = this.props;
          const products = shoppingCart;
          this.setState({ loader: "none", products });
        });
    } catch (ex) {
      console.log(ex.message);
    }
  }

  render() {
    const { classes, shoppingCart, location, ...rest } = this.props;
    const { loader, products } = this.state;
    document.title = "Compare Products @ Bezop Marketplace || Worlds First Decentralized Marketplace";

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

        <Parallax style={{ height: "400px" }} image="https://images.pexels.com/photos/953862/pexels-photo-953862.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260">
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
Compare Products
                  </h1>
                  <h3>
                    Checkmate products of choice, & choose the best.
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
          />
        </div>
        <Footer />
      </div>
    );
  }
}


export default Compare;
