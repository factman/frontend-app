import React from "react";
import Link from "react-router-dom/Link";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import sidebarStyle from "./sidebarStyle";
import VendorMenuLinks from "./VendorMenuLinks";

class MobileSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  // verifies if routeName is the one active (in browser input)
  activeRoute = routeName => (this.props.match.url === routeName)

  activeParentMenu = (parentPath, subMenuPath) => subMenuPath.search(parentPath) !== -1

  // The Submenu Toggle
  handleClick = () => {
    this.setState(state => ({ open: !this.state.open }));
  };

  render() {
    const { classes, color, logo, image, logoText, routes, dropdowns } = this.props;

    const links = (
      <VendorMenuLinks
        activeRoute={this.activeRoute}
        activeParentMenu={this.activeParentMenu}
        dropdowns={dropdowns}
        handleClick={this.handleClick}
        open={this.state.open}
        color={color}
        routes={routes}
        classes={classes}
        match={this.props.match}
      />
    );

    const brand = (
      <div className={classes.logo}>
        <Link to="/dashboard" className={classes.logoLink}>
          <div className={classes.logoImage}>
            <img src={logo} alt="logo" className={classes.img} />
          </div>
          {logoText}
        </Link>
      </div>
    );
    return (
      <div classes={{ paper: classes.drawerPaper }}>
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
      </div>
    );
  }
}

MobileSidebar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(sidebarStyle)(MobileSidebar);
