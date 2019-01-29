import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import ListItem from "@material-ui/core/ListItem";

import CustomDropdown from "../CustomDropdown/CustomDropdown";
import headerLinksStyle from "../../assets/jss/material-kit-react/components/headerLinksStyle";
import { userIs } from "../Auth/AccessControl";

class TopMenuAuthLinks extends React.Component {
  constructor(props) {
    super(props);
    this.events = props.events;
  }

  render() {
    const { classes, users } = this.props;

    return (
      <span>
        {(!userIs([users])) ? (
          <span>
            <ListItem className={classes.listItem}>
              <CustomDropdown
                buttonText="Login"
                dropdownHeader="Login as"
                buttonProps={{
                  className: classes.navLink,
                  color: "transparent",
                }}
                dropdownList={[
                  <span
                    onClick={() => {
                      this.events.emit("usersLogin", "Customer");
                    }}
                    className={classes.dropdownLink}
                  >
                    Customer Login
                  </span>,
                  <span
                    onClick={() => {
                      this.events.emit("usersLogin", "Vendor");
                    }}
                    className={classes.dropdownLink}
                  >
                    Vendor Login
                  </span>,
                ]}
              />
            </ListItem>
            <ListItem className={classes.listItem}>
              <CustomDropdown
                buttonText="Sign Up"
                dropdownHeader="Sign Up as"
                buttonProps={{
                  className: classes.navLink,
                  color: "transparent",
                }}
                dropdownList={[
                  <span
                    onClick={() => {
                      this.events.emit("usersSignUp", "Customer");
                    }}
                    className={classes.dropdownLink}
                  >
                    Customer Sign Up
                  </span>,
                  <span
                    onClick={() => {
                      this.events.emit("usersSignUp", "Vendor");
                    }}
                    className={classes.dropdownLink}
                  >
                    Vendor Sign Up
                  </span>,
                ]}
              />
            </ListItem>
          </span>)
          : null
        }
      </span>
    );
  }
}

export default withStyles(headerLinksStyle)(TopMenuAuthLinks);
