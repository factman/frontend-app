import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";


// material UI icon
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
// import StarBorder from "@material-ui/icons/StarBorder";
// core components
import sidebarStyle from "./sidebarStyle";

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdowns: this.props.dropdowns,
    };
  }

  componentDidMount() {
    // Prevent this code from running
    // when admin page is called
    if (this.props.match.url.search("admin") < 0) {
      let name;
      if (this.props.match.url.search("product") > 0
      && this.props.match.url.search("approve") === -1) {
        name = "product";
      } else if (this.props.match.url.search("blog") > 0) {
        name = "blog";
      }
      this.setDropDownState(name);
    }
  }

    // Setting dropdown state
    setDropDownState = (menu) => {
      const newDropdowns = JSON.parse(JSON.stringify(this.state.dropdowns));
      newDropdowns[menu] = !this.state.dropdowns[menu];
      this.setState({
        dropdowns: newDropdowns,
      });
    }

    // The Submenu Toggle
    handleClick = (menu) => {
      this.setDropDownState(menu);
    };

    render() {
      const { classes, color, routes } = this.props;
      // To check parent main
      let activeClass;

      let subMenuActiveClass;

      return (
        <List className={classes.list}>
          {routes.map((prop, key) => {
            // Check if prop has redirect property if so return null

            if (prop.redirect) return null;

            if (prop.path !== "/upgrade-to-pro") {
              activeClass = classNames({ [` ${classes[color]}`]: this.props.activeRoute(prop.path) });
              if (prop.hasOwnProperty("subMenu")) {
                activeClass = classNames({ [` ${classes[color]}`]: this.props.activeParentMenu(prop.path, this.props.match.url) });
              }
            }

            const whiteFontClasses = classNames({ [` ${classes.whiteFont}`]: this.props.activeRoute(prop.path) });
            // Check if prop has subMenu property
            if (!prop.hasOwnProperty("subMenu")) {
              return (
                <a
                  href={prop.path}
                  className={classes.item}
                  activeclassname="active"
                  key={key}
                >
                  <ListItem button className={classes.itemLink + activeClass}>
                    <ListItemIcon className={classes.itemIcon + whiteFontClasses}>
                      <prop.icon />
                    </ListItemIcon>
                    <ListItemText
                      primary={prop.sidebarName}
                      className={classes.itemText + whiteFontClasses}
                      disableTypography
                    />
                  </ListItem>
                </a>
              );
            }// If prop has submenu then create a submenu
            subMenuActiveClass = classNames({ [` ${classes[color]}`]: this.props.activeRoute(prop.path) });
            return (
              <div key={key}>
                <ListItem button className={classes.itemLink + activeClass} onClick={() => this.handleClick(prop.dropdown)} key={key}>
                  <ListItemIcon className={classes.itemIcon + whiteFontClasses}>
                    <prop.icon />
                  </ListItemIcon>
                  <ListItemText
                    inset
                    primary={prop.sidebarName}
                    className={classes.itemText + whiteFontClasses}
                    disableTypography
                  />
                  {(this.state.dropdowns[prop.dropdown])
                    ? <ExpandLess className={classes.expanded} />
                    : <ExpandMore className={classes.expanded} />
            }
                </ListItem>
                <Collapse in={this.state.dropdowns[prop.dropdown]} timeout="auto" unmountOnExit style={{ margin: "10px" }}>
                  {
            // Loop the current menu's submenu
          }
                  {prop.subMenu.map((submenu, subkey) => {
                    subMenuActiveClass = classNames({ [` ${classes[color]}`]: this.props.activeRoute(submenu.path) });

                    return (

                      <a
                        href={submenu.path}
                        className={classes.item}
           // activeClassName="active"
                        key={`${key}.${subkey + 1}`}
                      >
                        <List component="div" disablePadding>
                          <ListItem button className={`${classes.itemLink}${subMenuActiveClass}`}>
                            <ListItemIcon className={classes.itemIcon + whiteFontClasses}>
                              <submenu.icon />
                            </ListItemIcon>
                            <ListItemText
                              primary={submenu.sidebarName}
                              className={classes.itemText + whiteFontClasses}
                              disableTypography
                            />
                          </ListItem>
                        </List>
                      </a>
                    );
                  })}

                </Collapse>
              </div>
            );
          })}
        </List>
      );
    }
}

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(sidebarStyle)(Sidebar);
