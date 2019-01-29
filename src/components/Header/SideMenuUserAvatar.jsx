import React from "react";
import Link from "react-router-dom/Link";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import AccountCircle from "@material-ui/icons/AccountCircle";
import PowerSettingsNew from "@material-ui/icons/PowerSettingsNew";
import NotificationsActive from "@material-ui/icons/NotificationsActive";
import NotificationsNone from "@material-ui/icons/NotificationsNone";
import Dashboard from "@material-ui/icons/Dashboard";

import headerLinksStyle from "../../assets/jss/material-kit-react/components/headerLinksStyle";
import { userIs, getUserProfile } from "../Auth/AccessControl";
import avatar from "../../assets/img/avatar-default.jpg";
import Badge from "../Badge/Badge";

class HeaderLinks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accountOpen: false,
    };

    this.events = props.events;
  }

  getUserAvatar = (classes, users) => {
    const { accountOpen } = this.state;
    const { notifications } = getUserProfile(users);

    switch (users) {
      case "customer":
        return (
          <span>
            <ListItem className={classes.listItem} onClick={this.handleAccount}>
              <span className={classes.navLink} color="transparent">
                <Avatar alt="User Avatar" src={avatar} style={{ marginRight: "10px" }} />
                <span style={{ marginTop: "8px" }}>
                  Account
                  {accountOpen ? <ExpandLess style={{ marginBottom: "-8px" }} /> : <ExpandMore style={{ marginBottom: "-8px" }} />}
                </span>
              </span>
            </ListItem>
            <ListItem className={classes.listItem}>
              <Collapse in={accountOpen} timeout="auto" unmountOnExit color="transparent">
                <List component="div" style={{ marginLeft: "30px" }}>
                  <ListItem button className={classes.nested}>
                    <Link to="/profile" className={classes.dropdownLink}>
                      <Dashboard style={{ marginBottom: "-8px" }} />
                      {" "}
                      Account Overview
                    </Link>
                  </ListItem>
                  <ListItem button className={classes.nested}>
                    <Link to="/profile/profile" className={classes.dropdownLink}>
                      <AccountCircle style={{ marginBottom: "-8px" }} />
                      {" "}
                      My Profile
                    </Link>
                  </ListItem>
                  <ListItem button className={classes.nested}>
                    <span onClick={() => this.events.emit("usersLogOut", "customer")} className={classes.dropdownLink}>
                      <PowerSettingsNew style={{ marginBottom: "-8px" }} />
                      {" "}
                      Logout
                    </span>
                  </ListItem>
                </List>
              </Collapse>
            </ListItem>
            <ListItem className={classes.listItem}>
              {(notifications.length > 0) ? (
                <Link to="/profile/notifications" className={classes.navLink} color="transparent">
                  <NotificationsActive />
                  &nbsp;Notifications&nbsp;
                  <Badge color="primary" className={classes.navLink}>
                    <big style={{ fontSize: "1.3em" }}>
                      {notifications.length}
                    </big>
                  </Badge>
                </Link>)
                : (
                  <span className={classes.navLink} color="transparent">
                    <NotificationsNone />
                    &nbsp;Notifications
                  </span>)
            }
            </ListItem>
          </span>
        );

      case "vendor":
        return (
          <span>
            <ListItem className={classes.listItem} onClick={this.handleAccount}>
              <span className={classes.navLink} color="transparent">
                <Avatar alt="User Avatar" src={avatar} style={{ marginRight: "10px" }} />
                <span style={{ marginTop: "8px" }}>
                  Account
                  {accountOpen ? <ExpandLess style={{ marginBottom: "-8px" }} /> : <ExpandMore style={{ marginBottom: "-8px" }} />}
                </span>
              </span>
            </ListItem>
            <ListItem className={classes.listItem}>
              <Collapse in={accountOpen} timeout="auto" unmountOnExit color="transparent">
                <List component="div" style={{ marginLeft: "30px" }}>
                  <ListItem button className={classes.nested}>
                    <Link to="/dashboard" className={classes.dropdownLink}>
                      <Dashboard style={{ marginBottom: "-8px" }} />
                      {" "}
                      Dashboard
                    </Link>
                  </ListItem>
                  <ListItem button className={classes.nested}>
                    <span onClick={() => this.events.emit("usersLogOut", "vendor")} className={classes.dropdownLink}>
                      <PowerSettingsNew style={{ marginBottom: "-8px" }} />
                      {" "}
                      Logout
                    </span>
                  </ListItem>
                </List>
              </Collapse>
            </ListItem>
            <ListItem className={classes.listItem}>
              {(notifications.length > 0) ? (
                <Link to="/dashboard/notifications" className={classes.navLink} color="transparent">
                  <NotificationsActive />
                  &nbsp;Notifications&nbsp;
                  <Badge color="primary" className={classes.navLink}>
                    <big style={{ fontSize: "1.3em" }}>
                      {notifications.length}
                    </big>
                  </Badge>
                </Link>)
                : (
                  <span className={classes.navLink} color="transparent">
                    <NotificationsNone />
                    &nbsp;Notifications
                  </span>)
                    }
            </ListItem>
          </span>
        );

      default:
        return null;
    }
  };

  handleAccount = () => {
    this.setState(state => ({ accountOpen: !state.accountOpen }));
  };

  render() {
    const { classes, users } = this.props;

    const userAvatar = (userIs([users])) ? this.getUserAvatar(classes, users) : null;

    return (
      <span>
        {userAvatar}
      </span>
    );
  }
}

export default withStyles(headerLinksStyle)(HeaderLinks);
