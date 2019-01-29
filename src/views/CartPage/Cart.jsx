import React from "react";
import classNames from "classnames";
import Events from "events";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
// sections for this page
import Stage from "./Sections/Stage";
import { PageLoader } from "../../components/PageLoader/PageLoader";
import { getProductsById } from "../../actions/actions_product_kind";
import LandingPageMobile from "../../components/Header/LandingPageMobile";
import LandingPageLinks from "../../components/Header/LandingPageLinks";
import CartObject from "../../helpers/customerOperations";
import Slider from "../../components/Parallax/Slider";
import CART1 from "../../assets/img/CART1.jpg";
import CART2 from "../../assets/img/CART2.jpg";

class Cart extends React.Component {
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
      const cart = [];
      CartObject.getCart().map(item => cart.push(item.product));
      if (cart.length > 0) {
        dispatch(getProductsById(cart))
          .then(() => {
            const { shoppingCart } = this.props;
            const products = shoppingCart;
            this.setState({ loader: "none", products });
          });
      } else {
        this.setState({ loader: "none" });
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
          color="transparent"
          absolute
          rightLinks={<LandingPageMobile events={this.events} user="customer" />}
          leftLinks={<LandingPageLinks events={this.events} user="customer" />}
          {...rest}
        />

        <Slider classes={classes} images={[CART1, CART2]} />

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


export default Cart;
