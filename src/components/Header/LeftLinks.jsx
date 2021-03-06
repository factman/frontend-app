import React from "react";
import Link from "react-router-dom/Link";
import Events from "events";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";
import ShoppingCart from "@material-ui/icons/ShoppingCart";
import Compare from "@material-ui/icons/Compare";
import LiveHelp from "@material-ui/icons/LiveHelp";

import CustomDropdown from "../CustomDropdown/CustomDropdown";
import headerLinksStyle from "../../assets/jss/material-kit-react/components/headerLinksStyle";
import Badge from "../Badge/Badge";
import TopMenuAuthLinks from "./TopMenuAuthLinks";
import TopMenuUserAvatar from "./TopMenuUserAvatar";
import UsersAuth from "../Auth/UsersAuth";
import VideoModal from "../../bezopComponents/Modal/videoModal";
import CartObject from "../../helpers/customerOperations";
import { primaryColor } from "../../assets/jss/material-kit-react";

class LeftLinks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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

  updateCart() {
    const cart = CartObject.getCart().length;
    this.setState({ Cart: cart });
  }

  updateCompare() {
    const compare = (localStorage.compare) ? JSON.parse(localStorage.compare).length : 0;
    this.setState({ Compare: compare });
  }

  render() {
    const { classes, user, shop } = this.props;
    const { state } = this;

    return (
      <div>
        <UsersAuth events={this.events} />
        <List className={classes.list}>
          <ListItem className={classes.listItem}>
            <CustomDropdown
              buttonText="Products"
              dropdownHeader="Products"
              buttonProps={{
                className: classes.navLink,
                color: "transparent",
              }}
              dropdownList={[
                <Link to={`/${shop.vendor}`} className={classes.dropdownLink}>
                  All Products
                </Link>,
                <Link to={`/${shop.vendor}/products/deal`} className={classes.dropdownLink}>
                  {"Today's Deal"}
                </Link>,
                <Link to={`/${shop.vendor}/products/featured`} className={classes.dropdownLink}>
                  Featured Products
                </Link>,
                <Link to={`/${shop.vendor}/products/latest`} className={classes.dropdownLink}>
                  Latest Products
                </Link>,
                <Link to={`/${shop.vendor}/products/popular`} className={classes.dropdownLink}>
                  Popular Products
                </Link>,
              ]}
            />
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

          <TopMenuAuthLinks events={this.events} users={user} />
          <ListItem className={classes.listItem}>
            <VideoModal>
              <LiveHelp style={{ color: "white" }} />
            </VideoModal>
          </ListItem>
          <ListItem className={classes.listItem}>
            {(state.Compare > 1) ? (
              <Tooltip title="Compare Products" placement="bottom" classes={{ tooltip: classes.tooltip }}>
                <Link to="/compare" className={classes.navLink} color="transparent">
                  <Compare />
                  <Badge color="warning" className={classes.navLink}>
                    <big style={{ fontSize: "1.3em", color: primaryColor }}>
                      {state.Compare}
                    </big>
                  </Badge>
                </Link>
              </Tooltip>)
              : (
                <Tooltip title="Needs Two(2) Products to Compare" placement="bottom" classes={{ tooltip: classes.tooltip }}>
                  <span className={classes.navLink} color="transparent">
                    <Compare />
                    {(state.Compare > 0) ? (
                      <Badge color="primary" className={classes.navLink}>
                        <big style={{ fontSize: "1.3em", color: primaryColor }}>
                          {state.Compare}
                        </big>
                      </Badge>)
                      : null
                    }
                  </span>
                </Tooltip>)
            }
          </ListItem>
          <ListItem className={classes.listItem}>
            {(state.Cart > 0) ? (
              <Tooltip title="View Shopping Cart" placement="bottom" classes={{ tooltip: classes.tooltip }}>
                <Link to="/cart" className={classes.navLink} color="transparent">
                  <ShoppingCart />
                  <Badge color="primary" className={classes.navLink}>
                    <big style={{ fontSize: "1.3em", color: primaryColor }}>
                      {state.Cart}
                    </big>
                  </Badge>
                </Link>
              </Tooltip>)
              : (
                <Tooltip title="Empty Shopping Cart" placement="bottom" classes={{ tooltip: classes.tooltip }}>
                  <span className={classes.navLink} color="transparent">
                    <ShoppingCart />
                  </span>
                </Tooltip>)
            }
          </ListItem>

          <TopMenuUserAvatar events={this.events} users={user} />

        </List>
      </div>
    );
  }
}

export default withStyles(headerLinksStyle)(LeftLinks);
