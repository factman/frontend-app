import React from "react";
import Link from "react-router-dom/Link";
import Events from "events";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Compare from "@material-ui/icons/Compare";
import ShoppingCart from "@material-ui/icons/ShoppingCart";
import LiveHelp from "@material-ui/icons/LiveHelp";

import headerLinksStyle from "../../assets/jss/material-kit-react/components/headerLinksStyle";
import Badge from "../Badge/Badge";
import SideMenuAuthLinks from "./SideMenuAuthLinks";
import SideMenuUserAvatar from "./SideMenuUserAvatar";
import UsersAuth from "../Auth/UsersAuth";
import VideoModal from "../../bezopComponents/Modal/videoModal";
import CartObject from "../../helpers/customerOperations";
import { primaryColor } from "../../assets/jss/material-kit-react";

class HeaderLinks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productOpen: false,
      Cart: CartObject.getCart().length,
      Compare: (localStorage.compare) ? JSON.parse(localStorage.compare).length : 0,
    };

    this.events = new Events();
    const { events } = this.props;

    if (events) {
      events.on("add-to-cart", this.updateCart.bind(this));
      events.on("add-to-compare", this.updateCompare.bind(this));
    }
  }

  handleProduct = () => {
    this.setState(state => ({ productOpen: !state.productOpen }));
  };

  handleAccount = () => {
    this.setState(state => ({ accountOpen: !state.accountOpen }));
  };

  updateCompare() {
    const compare = (localStorage.compare) ? JSON.parse(localStorage.compare).length : 0;
    this.setState({ Compare: compare });
  }

  updateCart() {
    const cart = CartObject.getCart().length;
    this.setState({ Cart: cart });
  }

  render() {
    const { classes, user } = this.props;
    let { shop } = this.props;
    const { state } = this;
    if (!shop) {
      shop = { vendor: "" };
    }

    return (
      <div>
        <UsersAuth events={this.events} />
        <List className={classes.list}>

          <SideMenuUserAvatar events={this.events} users={user} />

          <ListItem className={classes.listItem}>
            {(state.Cart > 0) ? (
              <Link to="/cart" className={classes.navLink} color="transparent">
                <ShoppingCart />
                &nbsp;Shopping Cart&nbsp;
                <Badge color="warning" className={classes.navLink}>
                  <big style={{ fontSize: "1.3em", color: primaryColor }}>
                    {state.Cart}
                  </big>
                </Badge>
              </Link>)
              : (
                <span className={classes.navLink} color="transparent">
                  <ShoppingCart />
                  &nbsp;Shopping Cart
                </span>)
            }
          </ListItem>
          <ListItem className={classes.listItem}>
            {(state.Compare > 1) ? (
              <Link to="/compare" className={classes.navLink} color="transparent">
                <Compare />
                &nbsp;Compare&nbsp;
                <Badge color="warning" className={classes.navLink}>
                  <big style={{ fontSize: "1.3em", color: primaryColor }}>
                    {state.Compare}
                  </big>
                </Badge>
              </Link>)
              : (
                <span className={classes.navLink} color="transparent">
                  <Compare />
                  &nbsp;Compare&nbsp;
                  {(state.Compare > 0) ? (
                    <Badge color="warning" className={classes.navLink}>
                      <big style={{ fontSize: "1.3em", color: primaryColor }}>
                        {state.Compare}
                      </big>
                    </Badge>)
                    : null
                  }
                </span>)
          }
          </ListItem>
          <ListItem className={classes.listItem}>
            <div style={{ marginLeft: "14px", paddingBottom: "10px" }}>
              <VideoModal>
                <span>
                  <LiveHelp />
                  &nbsp;What&nbsp;is&nbsp;Bezop?&nbsp;
                </span>
              </VideoModal>
            </div>
          </ListItem>

          <SideMenuAuthLinks events={this.events} users={user} />

          <ListItem className={classes.listItem} onClick={this.handleProduct}>
            <span className={classes.navLink} color="transparent">
              Products&nbsp;
              {(state.productOpen) ? <ExpandLess /> : <ExpandMore />}
            </span>
          </ListItem>
          <ListItem className={classes.listItem}>
            <Collapse in={state.productOpen} timeout="auto" unmountOnExit color="transparent">
              <List component="div" style={{ marginLeft: "30px" }}>
                <ListItem button className={classes.nested}>
                  <Link to={`/${shop.vendor}`} className={classes.dropdownLink}>
                    All Products
                  </Link>
                </ListItem>
                <ListItem button className={classes.nested}>
                  <Link to={`/${shop.vendor}/products/deal`} className={classes.dropdownLink}>
                    {"Today's Deal"}
                  </Link>
                </ListItem>
                <ListItem button className={classes.nested}>
                  <Link to={`/${shop.vendor}/products/featured`} className={classes.dropdownLink}>
                    Featured Products
                  </Link>
                </ListItem>
                <ListItem button className={classes.nested}>
                  <Link to={`/${shop.vendor}/products/latest`} className={classes.dropdownLink}>
                    Latest Products
                  </Link>
                </ListItem>
                <ListItem button className={classes.nested}>
                  <Link to={`/${shop.vendor}/products/popular`} className={classes.dropdownLink}>
                    Popular Products
                  </Link>
                </ListItem>
              </List>
            </Collapse>
          </ListItem>
          <ListItem className={classes.listItem}>
            <Link to={`/${shop.vendor}/categories`} className={classes.navLink} color="transparent">
              Categories
            </Link>
          </ListItem>
          <ListItem className={classes.listItem}>
            <Link to={`/${shop.vendor}/brands`} className={classes.navLink} color="transparent">
              Brands
            </Link>
          </ListItem>
          <ListItem className={classes.listItem}>
            <Link to={`/${shop.vendor}/blogs`} className={classes.navLink} color="transparent">
              Blogs
            </Link>
          </ListItem>
        </List>
      </div>
    );
  }
}

export default withStyles(headerLinksStyle)(HeaderLinks);
