import React from "react";
import Link from "react-router-dom/Link";
// core components
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import List from "@material-ui/core/List";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";

import Notifications from "@material-ui/icons/Notifications";
import Comment from "@material-ui/icons/Comment";
import Favorite from "@material-ui/icons/Favorite";
import Dashboard from "@material-ui/icons/Dashboard";
import AccountCircle from "@material-ui/icons/AccountCircle";
import ShoppingBasket from "@material-ui/icons/ShoppingBasket";
import Receipt from "@material-ui/icons/Receipt";
import Edit from "@material-ui/icons/Edit";

import { primaryColor, successColor, dangerColor, warningColor } from "../../../assets/jss/material-kit-react";
import image from "../../../assets/img/avatar-default.jpg";
import Button from "../../../components/CustomButtons/Button";

class ProfileCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.state;
  }

  componentWillReceiveProps(newProps) {
    this.setState(newProps.state);
  }

  render() {
    const {
      classes,
      goto,
      profileData,
    } = this.props;
    const { overview, profile, notifications, orders, wishlist, ticket } = this.state;

    return (
      <Paper className={classes.paper} elevation={4}>
        <div className={classes.profileHead}>
          <img className={classes.profileImage} src={image} height="100px" alt="Profile" />
          <Typography style={{ color: "white" }} align="center" variant="title">
            {profileData.fullname}
            &nbsp;
            <Link to="/profile/profile">
              <Button simple justIcon round>
                <Edit />
              </Button>
            </Link>
          </Typography>
          <Typography gutterBottom style={{ color: "white" }} align="center" variant="body1">
            {profileData.email}
          </Typography>
        </div>
        <List component="nav" dense={false} style={{ padding: "0px" }}>
          <Link to="/profile/overview">
            <ListItem
              onClick={() => goto("overview")}
              button
              style={(overview)
                ? { borderLeft: "4px solid #1479fb", backgroundColor: "#ceeefd" }
                : null}
            >
              <ListItemIcon>
                <Dashboard style={(overview)
                  ? { color: "#1479fb" }
                  : null}
                />
              </ListItemIcon>
              <ListItemText primary="Overview" />
            </ListItem>
          </Link>
          <Link to="/profile/profile">
            <ListItem
              onClick={() => goto("profile")}
              button
              style={(profile)
                ? { borderLeft: "4px solid #1479fb", backgroundColor: "#ceeefd" }
                : null}
            >
              <ListItemIcon>
                <AccountCircle style={(profile)
                  ? { color: "#1479fb" }
                  : null}
                />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItem>
          </Link>
          <Link to="/profile/notifications">
            <ListItem
              onClick={() => goto("notifications")}
              button
              style={(notifications)
                ? { borderLeft: "4px solid #1479fb", backgroundColor: "#ceeefd" }
                : null}
            >
              <ListItemIcon>
                <Notifications style={(notifications)
                  ? { color: "#1479fb" }
                  : null}
                />
              </ListItemIcon>
              <ListItemText primary="Notifications" />
            </ListItem>
          </Link>
          <Link to="/profile/orders">
            <ListItem
              onClick={() => goto("orders")}
              button
              style={(orders)
                ? { borderLeft: "4px solid #1479fb", backgroundColor: "#ceeefd" }
                : null}
            >
              <ListItemIcon>
                <ShoppingBasket style={(orders)
                  ? { color: "#1479fb" }
                  : null}
                />
              </ListItemIcon>
              <ListItemText primary="Orders" />
            </ListItem>
          </Link>
          <Link to="/profile/wishlist">
            <ListItem
              onClick={() => goto("wishlist")}
              button
              style={(wishlist)
                ? { borderLeft: "4px solid #1479fb", backgroundColor: "#ceeefd" }
                : null}
            >
              <ListItemIcon>
                <Favorite style={(wishlist)
                  ? { color: "#1479fb" }
                  : null}
                />
              </ListItemIcon>
              <ListItemText primary="Wishlist" />
            </ListItem>
          </Link>
          <Link to="/profile/ticket">
            <ListItem
              onClick={() => goto("ticket")}
              button
              style={(ticket)
                ? { borderLeft: "4px solid #1479fb", backgroundColor: "#c4ebfd" }
                : null}
            >
              <ListItemIcon>
                <Receipt style={(ticket)
                  ? { color: "#1479fb" }
                  : null}
                />
              </ListItemIcon>
              <ListItemText primary="Ticket" />
            </ListItem>
          </Link>
        </List>
        <BottomNavigation showLabels style={{ overflowX: "scroll", margin: "0px 0%", cursor: "pointer" }}>
          <BottomNavigationAction
            icon={(
              <span>
                <Notifications />
                <br />
                {(profileData.notifications) ? profileData.notifications.length : 0}
              </span>)}
            style={{ borderTop: `4px solid ${primaryColor}`, color: primaryColor }}
          />
          <BottomNavigationAction
            icon={(
              <span>
                <Comment />
                <br />
                0
              </span>)}
            style={{ borderTop: `4px solid ${successColor}`, color: successColor }}
          />
          <BottomNavigationAction
            icon={(
              <span>
                <Favorite />
                <br />
                {(profileData.wishlist) ? profileData.wishlist.length : 0}
              </span>)}
            style={{ borderTop: `4px solid ${dangerColor}`, color: dangerColor }}
          />
          <BottomNavigationAction
            icon={(
              <span>
                <Receipt />
                <br />
                0
              </span>)}
            style={{ borderTop: `4px solid ${warningColor}`, color: warningColor }}
          />
        </BottomNavigation>
      </Paper>
    );
  }
}

export default (ProfileCard);
