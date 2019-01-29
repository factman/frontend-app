import React from "react";
import Link from "react-router-dom/Link";
// material-ui components
import withStyles from "@material-ui/core/styles/withStyles";
import PlayArrow from "@material-ui/icons/PlayArrow";
import Email from "@material-ui/icons/Email";
import Home from "@material-ui/icons/Home";
import Mail from "@material-ui/icons/Mail";
import Forward from "@material-ui/icons/Forward";
import Call from "@material-ui/icons/Call";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";

import Button from "../CustomButtons/Button";
import GridContainer from "../Grid/GridContainer";
import GridItem from "../Grid/GridItem";
import logo from "../../assets/img/blue-favicon.png";
import LinkManager from "../../helpers/linkManager";

const style = {
  megaFoot: {
    padding: "90px 30px 30px 30px",
    marginTop: "-60px",
    borderBottom: "1px solid gray",
  },
  textCenter: {
    textAlign: "center",
  },
  footHead: {
    borderBottom: "1px solid lightgray",
  },
  footIcon: {
    fontSize: "2em",
  },
  link: {
    color: "",
  },
};

class MegaFooter extends React.Component {
    state = {
      subOpen: false,
    };

      subClickOpen = () => {
        this.setState({ subOpen: true });
      };

      subClose = () => {
        this.setState({ subOpen: false });
      };

      render() {
        const { classes, shop, categories, vendor } = this.props;
        const { subOpen } = this.state;
        const vendorAddress = Object.assign({}, vendor.address);

        return (
          <GridContainer className={classes.megaFoot}>
            <GridItem xs={12} sm={6} md={3}>
              <Typography className={classes.textCenter}>
                <img src={logo} height="30" style={{ marginTop: "-60px", verticalAlign: "baseline" }} alt="Logo" />
                &nbsp;
                <Forward className={classes.footIcon} />
                <Mail className={classes.footIcon} />
                <br />
                  Join our newsletter and get news in your inbox every week! We hate spam too,
                  so no worries about this.
                <Button style={{ fontSize: "0.9em" }} fullWidth onClick={this.subClickOpen} color="primary">
                  Subscribe
                </Button>
              </Typography>
              <Dialog
                open={subOpen}
                onClose={this.subClose}
                aria-labelledby="subscription-dialog"
              >
                <DialogTitle id="subscription-dialog">
                  <span color="primary">
                    <Mail />
                    {" "}
                    Subscribe To Newsletter
                  </span>
                </DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Join our newsletter and get news in your inbox every week! We hate spam too,
                    so no worries about this.
                  </DialogContentText>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="email"
                    label="Email Address"
                    type="email"
                    fullWidth
                  />
                </DialogContent>
                <DialogActions style={{ margin: "0px 25px 30px 25px" }}>
                  <Button onClick={this.subClose} color="primary" simple size="lg">
                    Cancel
                  </Button>
                  <Button onClick={this.subClose} color="primary" size="lg">
                    Subscribe
                  </Button>
                </DialogActions>
              </Dialog>
            </GridItem>
            <GridItem xs={12} sm={6} md={3}>
              <Typography variant="title">
                Categories
              </Typography>
              <List>
                <ListItem style={{ padding: "2px 0px" }}>
                  <PlayArrow style={{ fontSize: "1em" }} />
                  &nbsp;
                  <a
                    href={`/${shop.vendor}/categories`}
                    style={{ color: "#3C4858", fontSize: "0.9em", display: "block", width: "100%" }}
                  >
                    All Categories
                  </a>
                </ListItem>
                {categories.map(category => (
                  <ListItem key={category.id} style={{ padding: "2px 0px" }}>
                    <PlayArrow style={{ fontSize: "1em" }} />
                    &nbsp;
                    <a
                      href={`/${shop.vendor}/category/${LinkManager.parse(category.name, category.id)}`}
                      style={{ color: "#3C4858", fontSize: "0.9em", display: "block", width: "100%" }}
                    >
                      {category.name}
                    </a>
                  </ListItem>))}
              </List>
            </GridItem>

            <GridItem xs={12} sm={6} md={3}>
              <Typography variant="title">
                Useful Links
              </Typography>
              <List>
                <ListItem style={{ padding: "2px 0px" }}>
                  <PlayArrow style={{ fontSize: "1em" }} />
                  &nbsp;
                  <a
                    href={`/${shop.vendor}`}
                    style={{ color: "#3C4858", fontSize: "0.9em", display: "block", width: "100%" }}
                  >
                    All Products
                  </a>
                </ListItem>
                <ListItem style={{ padding: "2px 0px" }}>
                  <PlayArrow style={{ fontSize: "1em" }} />
                  &nbsp;
                  <a
                    href={`/${shop.vendor}/products/deal`}
                    style={{ color: "#3C4858", fontSize: "0.9em", display: "block", width: "100%" }}
                  >
                    {"Today's Deals"}
                  </a>
                </ListItem>
                <ListItem style={{ padding: "2px 0px" }}>
                  <PlayArrow style={{ fontSize: "1em" }} />
                  &nbsp;
                  <a
                    href={`/${shop.vendor}/products/featured`}
                    style={{ color: "#3C4858", fontSize: "0.9em", display: "block", width: "100%" }}
                  >
                    Featured Products
                  </a>
                </ListItem>
                <ListItem style={{ padding: "2px 0px" }}>
                  <PlayArrow style={{ fontSize: "1em" }} />
                  &nbsp;
                  <a
                    href={`/${shop.vendor}/contact`}
                    style={{ color: "#3C4858", fontSize: "0.9em", display: "block", width: "100%" }}
                  >
                    Contact Us
                  </a>
                </ListItem>
                {/* <ListItem style={{ padding: "2px 0px" }}>
                  <PlayArrow style={{ fontSize: "1em" }} />
                  &nbsp;
                  <a
                    href="/faq"
                    style={{ color: "#3C4858", fontSize: "0.9em", display: "block", width: "100%" }}
                  >
                    FAQ
                  </a>
                </ListItem> */}
              </List>
            </GridItem>

            <GridItem xs={12} sm={6} md={3}>
              <Typography variant="title">
                Contact Us
              </Typography>
              <Home style={{ fontSize: "1.2em", verticalAlign: "sub" }} />
              &nbsp;
              <span style={{ color: "#3C4858", fontSize: "0.9em", fontWeight: "bolder", width: "100%" }}>
                Address:&nbsp;
                {`${vendorAddress.building}, ${vendorAddress.street}, ${vendorAddress.city}, ${vendorAddress.state}, ${vendorAddress.country}`}
              </span>
              <br />
              <Call style={{ fontSize: "1.2em", verticalAlign: "sub" }} />
              &nbsp;
              <span style={{ color: "#3C4858", fontSize: "0.9em", fontWeight: "bolder", width: "100%" }}>
                Phone Number:&nbsp;
                <Link to={`tel:${vendor.phone}`} style={{ color: "#3C4858" }}>
                  {vendor.phone}
                </Link>
              </span>
              <br />
              <Email style={{ fontSize: "1.2em", verticalAlign: "sub" }} />
              &nbsp;
              <span style={{ color: "#3C4858", fontSize: "0.9em", fontWeight: "bolder", width: "100%" }}>
                Email:&nbsp;
                <Link to={`mailto:${vendor.email}`} style={{ color: "#3C4858" }}>
                  {vendor.email}
                </Link>
              </span>
              <br />
              {(vendor.profile.facebook !== "") ? (
                <Link to={vendor.profile.facebook}>
                  <Button color="facebook" justIcon>
                    <i className=" fab fa-facebook" />
                  </Button>
                </Link>)
                : null}
              {(vendor.profile.googlePlus !== "") ? (
                <Link to={vendor.profile.googlePlus}>
                  <Button color="google" justIcon>
                    <i className=" fab fa-google-plus-g" />
                  </Button>
                </Link>)
                : null}
              {(vendor.profile.instagram !== "") ? (
                <Link to={vendor.profile.instagram}>
                  <Button color="facebook" justIcon>
                    <i className=" fab fa-instagram" />
                  </Button>
                </Link>)
                : null}
              {(vendor.profile.linkedin !== "") ? (
                <Link to={vendor.profile.linkedin}>
                  <Button color="facebook" justIcon>
                    <i className=" fab fa-linkedin-in" />
                  </Button>
                </Link>)
                : null}
              {(vendor.profile.pinterest !== "") ? (
                <Link to={vendor.profile.pinterest}>
                  <Button color="google" justIcon>
                    <i className=" fab fa-pinterest-p" />
                  </Button>
                </Link>)
                : null}
              {(vendor.profile.skype !== "") ? (
                <Link to={vendor.profile.skype}>
                  <Button color="twitter" justIcon>
                    <i className=" fab fa-skype" />
                  </Button>
                </Link>)
                : null}
              {(vendor.profile.twitter !== "") ? (
                <Link to={vendor.profile.twitter}>
                  <Button color="twitter" justIcon>
                    <i className=" fab fa-twitter" />
                  </Button>
                </Link>)
                : null}
              {(vendor.profile.youtube !== "") ? (
                <Link to={vendor.profile.youtube}>
                  <Button color="google" justIcon>
                    <i className=" fab fa-youtube" />
                  </Button>
                </Link>)
                : null}
              {(vendor.profile.website !== "") ? (
                <Link to={vendor.profile.website}>
                  <Button color="github" justIcon>
                    <i className=" fas fa-globe" />
                  </Button>
                </Link>)
                : null}
            </GridItem>
          </GridContainer>
        );
      }
}

export default withStyles(style)(MegaFooter);
