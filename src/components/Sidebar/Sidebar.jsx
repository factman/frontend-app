import React from "react";
import Link from "react-router-dom/Link";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
// core components
import HeaderLinks from "../Header/HeaderLinks";

import sidebarStyle from "./sidebarStyle";
import VendorMenuLinks from "./VendorMenuLinks";

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Open: false,
    };
  }

  // verifies if routeName is the one active (in browser input)
  activeRoute = (routeName) => {
    const { match } = this.props;
    return match.url === routeName;
  }

  activeParentMenu = (parentPath, subMenuPath) => subMenuPath.search(parentPath) !== -1

  render() {
    const {
      classes, color, logo, image, logoText, routes,
      dropdowns,
    } = this.props;

    const { Open } = this.state;
    const { match } = this.props;
    // To check parent main.

    const links = (
      <VendorMenuLinks
        activeRoute={this.activeRoute}
        dropdowns={dropdowns}
        activeParentMenu={this.activeParentMenu}
        handleClick={this.handleClick}
        open={Open}
        color={color}
        routes={routes}
        classes={classes}
        match={match}
      />);

    const brand = (
      <div className={classes.logo}>
        <Link to="/dashboard" className={classes.logoLink}>
          <div className={classes.logoImage}>
            <img src={logo} alt="logo" className={classes.img} />
          </div>
          {logoText}
        </Link>
      </div>);

    return (
      <div>
        <Hidden mdUp>
          <Drawer
            variant="temporary"
            anchor="right"
            open={this.props.open}
            classes={{
              paper: classes.drawerPaper,
            }}
            onClose={this.props.handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {brand}
            <div className={classes.sidebarWrapper}>
              <HeaderLinks />
              {links}
            </div>
            {image !== undefined ? (
              <div
                className={classes.background}
                style={{ backgroundImage: `url("${image}")` }}
              />
            ) : null}
          </Drawer>
        </Hidden>
        <Hidden smDown>
          <Drawer
            anchor="left"
            variant="permanent"
            open
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            {brand}
            <div className={classes.sidebarWrapper}>
              {links}
            </div>
            {image !== undefined ? (
              <div
                className={classes.background}
                style={{ backgroundImage: `url("${image}")` }}
              />
            ) : null}
          </Drawer>
        </Hidden>
      </div>
    );
  }
}

export default withStyles(sidebarStyle)(Sidebar);
