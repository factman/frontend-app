import React from "react";
import Link from "react-router-dom/Link";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
// core components
import HeaderLinks from "../Header/HeaderLinks";

import sidebarStyle from "./sidebarStyle";
import VendorMenuLinks from "./VendorMenuLinks";

class AdminSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  // verifies if routeName is the one active (in browser input)
  activeRoute = (routeName) => {
    const { match } = this.props;
    return match.url === routeName;
  }

  activeParentMenu = (parentPath, subMenuPath) => subMenuPath.search(parentPath) !== -1;

  render() {
    const {
      classes, color, logo, image, logoText, routes, dropdowns,
      match, handleDrawerToggle,
    } = this.props;
    const {
      open,
    } = this.state;
    // To check parent main
    const links = (
      <VendorMenuLinks
        activeRoute={this.activeRoute}
        dropdowns={dropdowns}
        activeParentMenu={this.activeParentMenu}
        handleClick={this.handleClick}
        open={open}
        color={color}
        routes={routes}
        classes={classes}
        match={match}
      />
    );

    const brand = (
      <div className={classes.logo}>
        <Link to="/admin" className={classes.logoLink}>
          <div className={classes.logoImage}>
            <img src={logo} alt="logo" className={classes.img} />
          </div>
          {logoText}
        </Link>
      </div>
    );
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
            onClose={handleDrawerToggle}
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
                style={{ backgroundImage: `url(${image})` }}
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
                style={{ backgroundImage: `url(${image})` }}
              />
            ) : null}
          </Drawer>
        </Hidden>
      </div>
    );
  }
}

AdminSidebar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(sidebarStyle)(AdminSidebar);
