import React from "react";
import Link from "react-router-dom/Link";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ShoppingCart from "@material-ui/icons/ShoppingCart";
import Compare from "@material-ui/icons/Compare";
import LiveHelp from "@material-ui/icons/LiveHelp";
import Events from "events";
import headerLinksStyle from "../../assets/jss/material-kit-react/components/headerLinksStyle";
import UsersAuth from "../Auth/UsersAuth";
import SideMenuUserAvatar from "./SideMenuUserAvatar";
import SideMenuAuthLinks from "./SideMenuAuthLinks";
import Badge from "../Badge/Badge";
import VideoModal from "../../bezopComponents/Modal/videoModal";
import CartObject from "../../helpers/customerOperations";

class LandingPageMobile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accountOpen: false,
      loginOpen: false,
      signUpOpen: false,
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

  handleAccount = () => {
    this.setState(state => ({ accountOpen: !state.accountOpen }));
  };

  handleLogin = () => {
    this.setState(state => ({ loginOpen: !state.loginOpen }));
  };

  handleSignUp = () => {
    this.setState(state => ({ signUpOpen: !state.signUpOpen }));
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
    const { state } = this;

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
                <Badge color="primary" className={classes.navLink}>
                  <big style={{ fontSize: "1.3em" }}>
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
                <Badge color="primary" className={classes.navLink}>
                  <big style={{ fontSize: "1.3em" }}>
                    {state.Compare}
                  </big>
                </Badge>
              </Link>)
              : (
                <span className={classes.navLink} color="transparent">
                  <Compare />
                  &nbsp;Compare&nbsp;
                  {(state.Compare > 0) ? (
                    <Badge color="primary" className={classes.navLink}>
                      <big style={{ fontSize: "1.3em" }}>
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
        </List>
      </div>
    );
  }
}

export default withStyles(headerLinksStyle)(LandingPageMobile);
