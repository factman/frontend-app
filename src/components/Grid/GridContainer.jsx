import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
import classNames from "classnames";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";

const style = {
  grid: {
    marginRight: "-15px",
    marginLeft: "-15px",
    width: "auto",
  },
};

function GridContainer({ ...props }) {
  const { classes, children, className, ...rest } = props;
  return (
    <Grid
      container
      {...rest}
      className={
        classNames({
          [classes.grid]: true,
          [className]: true,
        })
      }
    >
      {children}
    </Grid>
  );
}

GridContainer.defaultProps = {
  className: "",
};

GridContainer.propTypes = {
  classes: PropTypes.shape({
    grid: PropTypes.string,
  }).isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default withStyles(style)(GridContainer);
