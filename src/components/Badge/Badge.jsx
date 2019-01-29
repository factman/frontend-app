import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

import badgeStyle from "../../assets/jss/material-kit-react/components/badgeStyle";

function Badge({ ...props }) {
  const { classes, color, children } = props;
  const style = (props.style) ? props.style : {};
  return (
    <span className={`${classes.badge} ${classes[color]}`} style={style}>
      {children}
    </span>
  );
}

Badge.defaultProps = {
  color: "gray",
};

Badge.propTypes = {
  classes: PropTypes.object.isRequired,
  color: PropTypes.oneOf([
    "primary",
    "warning",
    "danger",
    "success",
    "info",
    "rose",
    "gray",
  ]),
};

export default withStyles(badgeStyle)(Badge);
