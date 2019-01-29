import React from "react";
import Link from "react-router-dom/Link";
import classNames from "classnames";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";

import footerStyle from "../../assets/jss/material-kit-react/components/footerStyle";
import MegaFooter from "./MegaFooter";
import { primaryBackground } from "../../assets/jss/material-kit-react";

class Footer extends React.Component {
  state = {};

  render() {
    const { classes, whiteFont, topFooter, shop, categories, vendor, greyBg, transparent } = this.props;

    const footerClasses = classNames({
      [classes.footer]: true,
      [classes.footerWhiteFont]: whiteFont,
      [classes.footerGreyFont]: greyBg,
    });
    const aClasses = classNames({
      [classes.a]: true,
      [classes.footerWhiteFont]: whiteFont,
    });

    const megaFooter = (topFooter && vendor) ? <MegaFooter shop={shop} categories={categories} vendor={vendor} /> : "";
    return (
      <div>
        {megaFooter}
        <footer className={footerClasses} style={(!transparent) ? { ...primaryBackground } : null}>
          <div className={classes.container}>
            <div className={classes.left}>
              <List className={classes.list}>
                <ListItem className={classes.inlineBlock}>
                  <Link to="/">
                    <Button simple="true" size="small" style={{ color: "white" }}>
                      Home
                    </Button>
                  </Link>
                </ListItem>
                <ListItem className={classes.inlineBlock}>
                  <Link to="/about">
                    <Button simple="true" size="small" style={{ color: "white" }}>
                      About us
                    </Button>
                  </Link>
                </ListItem>
                <ListItem className={classes.inlineBlock}>
                  <Link to="/policy">
                    <Button simple="true" size="small" style={{ color: "white" }}>
                      Privacy Policy
                    </Button>
                  </Link>
                </ListItem>
                <ListItem className={classes.inlineBlock}>
                  <Link to="/terms">
                    <Button simple="true" size="small" style={{ color: "white" }}>
                      Terms & Conditions
                    </Button>
                  </Link>
                </ListItem>
              </List>
            </div>
            <div className={classes.right}>
              <span style={{ color: "#eee" }}>
                &copy;
                {" "}
                {1900 + new Date().getYear()}
              </span>
              <Link to="/" className={aClasses}>
                <Button simple="true" size="small" style={{ color: "white" }}>
                  Bezop Network
                </Button>
              </Link>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

export default withStyles(footerStyle)(Footer);
