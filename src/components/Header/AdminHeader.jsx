import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Avatar from "@material-ui/core/Avatar";
import AccountCircle from "@material-ui/icons/AccountCircle";
import PowerSettingsNew from "@material-ui/icons/PowerSettingsNew";

import Events from "events";

import headerLinksStyle from "../../assets/jss/material-kit-react/components/headerLinksStyle";
import UsersAuth from "../Auth/UsersAuth";
import { userIs } from "../Auth/AccessControl";
import CustomDropdown from "../CustomDropdown/CustomDropdown";

const image = require("../../assets/img/avatar-default.jpg");

class AdminHeader extends React.Component {
  constructor(props) {
    super(props);
    this.events = new Events();
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <UsersAuth events={this.events} />
        <List className={classes.list}>
          { (userIs(["admin"]))
            ? (
              <ListItem className={classes.listItem}>
                <CustomDropdown
                  buttonText={
                    <Avatar className={classes.Avatar} alt="User Avatar" src={image} />
                  }
                  buttonProps={{
                    className: classes.navLink,
                    style: { padding: "7px 12px" },
                    color: "transparent",
                  }}
                  dropdownList={[
                    <a
                      href="/admin/profile"
                      className={classes.dropdownLink}
                    >
                      <AccountCircle style={{ marginBottom: "-8px" }} />
                      My Profile
                    </a>,
                    <span
                      onClick={() => this.events.emit("usersLogOut", "admin")}
                      className={classes.dropdownLink}
                    >
                      <PowerSettingsNew style={{ marginBottom: "-8px" }} />
                      Logout
                    </span>,
                  ]}
                />
              </ListItem>
            )
            : null }
        </List>
      </div>
    );
  }
}

export default withStyles(headerLinksStyle)(AdminHeader);
