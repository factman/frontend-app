import React from "react";
import Link from "react-router-dom/Link";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";
import Avatar from "@material-ui/core/Avatar";
import AccountCircle from "@material-ui/icons/AccountCircle";
import PowerSettingsNew from "@material-ui/icons/PowerSettingsNew";
import NotificationsActive from "@material-ui/icons/NotificationsActive";
import NotificationsNone from "@material-ui/icons/NotificationsNone";
import Dashboard from "@material-ui/icons/Dashboard";

import CustomDropdown from "../CustomDropdown/CustomDropdown";
import headerLinksStyle from "../../assets/jss/material-kit-react/components/headerLinksStyle";
import { userIs, getUserProfile } from "../Auth/AccessControl";
import avatar from "../../assets/img/avatar-default.jpg";
import Badge from "../Badge/Badge";
import Validator from "../../helpers/validator";

class LeftLinks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.events = props.events;
  }

  getUserAvatar = (classes, users) => {
    const getUserProfileConst = getUserProfile(users);
    const { notifications } = getUserProfileConst;
    switch (users) {
      case "customer":
        return (
          <span>
            <ListItem className={classes.listItem}>
              {Validator.propertyExist(getUserProfileConst, "notifications") && (notifications.length > 0) ? (
                <Tooltip title="View Notifications" placement="bottom" classes={{ tooltip: classes.tooltip }}>
                  <Link to="/profile/notifications" className={classes.navLink} color="transparent">
                    <NotificationsActive />
                    <Badge color="danger" className={classes.navLink}>
                      <big style={{ fontSize: "1.3em" }}>
                        {notifications.length}
                      </big>
                    </Badge>
                  </Link>
                </Tooltip>)
                : (
                  <Tooltip title="Empty Notification" placement="bottom" classes={{ tooltip: classes.tooltip }}>
                    <span className={classes.navLink} color="transparent">
                      <NotificationsNone />
                    </span>
                  </Tooltip>)
            }
            </ListItem>
            <ListItem className={classes.listItem}>
              <Tooltip title="My Account" placement="right" classes={{ tooltip: classes.tooltip }}>
                <span color="transparent" style={{ padding: "0px" }}>
                  <CustomDropdown
                    buttonText={
                      <Avatar alt="User Avatar" src={avatar} />
                }
                    buttonProps={{
                      className: classes.navLink,
                      style: { padding: "7px 12px" },
                      color: "transparent",
                    }}
                    dropdownList={[
                      <Link to="/profile" className={classes.dropdownLink}>
                        <Dashboard style={{ marginBottom: "-8px" }} />
                        {" "}
                        Account Overview
                      </Link>,
                      <Link to="/profile/profile" className={classes.dropdownLink}>
                        <AccountCircle style={{ marginBottom: "-8px" }} />
                        {" "}
                        My Profile
                      </Link>,
                      <span
                        onClick={() => this.events.emit("usersLogOut", "customer")}
                        className={classes.dropdownLink}
                      >
                        <PowerSettingsNew style={{ marginBottom: "-8px" }} />
                        {" "}
                        Logout
                      </span>,
                    ]}
                  />
                </span>
              </Tooltip>
            </ListItem>
          </span>
        );

      case "vendor":
        return (
          <span>
            <ListItem className={classes.listItem}>
              {(notifications !== undefined && notifications.length > 0) ? (
                <Tooltip title="View Notifications" placement="bottom" classes={{ tooltip: classes.tooltip }}>
                  <Link to="/dashboard/notifications" className={classes.navLink} color="transparent">
                    <NotificationsActive />
                    <Badge color="danger" className={classes.navLink}>
                      <big style={{ fontSize: "1.3em" }}>
                        {notifications.length}
                      </big>
                    </Badge>
                  </Link>
                </Tooltip>)
                : (
                  <Tooltip title="Empty Notification" placement="bottom" classes={{ tooltip: classes.tooltip }}>
                    <span className={classes.navLink} color="transparent">
                      <NotificationsNone />
                    </span>
                  </Tooltip>)
            }
            </ListItem>
            <ListItem className={classes.listItem}>
              <Tooltip title="My Account" placement="right" classes={{ tooltip: classes.tooltip }}>
                <span color="transparent" style={{ padding: "0px" }}>
                  <CustomDropdown
                    buttonText={
                      <Avatar alt="User Avatar" src={avatar} />
                }
                    buttonProps={{
                      className: classes.navLink,
                      style: { padding: "7px 12px" },
                      color: "transparent",
                    }}
                    dropdownList={[
                      <Link to="/dashboard" className={classes.dropdownLink}>
                        <Dashboard style={{ marginBottom: "-8px" }} />
                        {" "}
                        Dashboard
                      </Link>,
                      <span
                        onClick={() => this.events.emit("usersLogOut", "vendor")}
                        className={classes.dropdownLink}
                      >
                        <PowerSettingsNew style={{ marginBottom: "-8px" }} />
                        {" "}
                        Logout
                      </span>,
                    ]}
                  />
                </span>
              </Tooltip>
            </ListItem>
          </span>
        );

      default:
        return null;
    }
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

export default withStyles(headerLinksStyle)(LeftLinks);
