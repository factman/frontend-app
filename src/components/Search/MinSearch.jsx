import React from "react";
import PropTypes from "prop-types";

import withStyles from "@material-ui/core/styles/withStyles";
import Hidden from "@material-ui/core/Hidden";
import InputAdornment from "@material-ui/core/InputAdornment";
import Search from "@material-ui/icons/Search";
import CustomInput from "../CustomInput/CustomInput";

const styles = theme => ({
  rootSidebar: {
    display: "flex",
    flexWrap: "wrap",
    marginTop: "-19px",
    fontSize: "2em",
  },
  rootStage: {
    display: "flex",
    flexWrap: "wrap",
    marginTop: "-1px",
    fontSize: "2em",
  },
  header: {
    width: "100%",
    marginBottom: "0px",
  },
  search: {
    "&:before": {
      border: "0px !important",
    },
    "&:hover": {
      border: "0px !important",
    },
  },
});

class MinSearch extends React.Component {
  state = {};

  getByLocation = (location, classes) => {
    if (location === "sidebar") {
      const { naked } = this.props;
      return (
        <div className={classes.rootSidebar}>
          <Hidden smDown>
            <h4 className={classes.header}>
              What are you looking for?
            </h4>
            <CustomInput
              labelText="Search Store"
              id="search"
              formControlProps={{
                fullWidth: true,
                className: naked ? classes.search : "",
              }}
              inputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Search />
                  </InputAdornment>),
                type: "search",
                className: naked ? classes.search : "",
              }}
            />
          </Hidden>
        </div>
      );
    }
    if (location === "stage") {
      return (
        <div className={classes.rootStage}>
          <Hidden mdUp>
            <h3 className={classes.header}>
              What are you looking for?
            </h3>
            <CustomInput
              labelText="Search Store"
              id="search"
              formControlProps={{
                fullWidth: true,
              }}
              inputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Search />
                  </InputAdornment>),
                type: "search",
              }}
            />
          </Hidden>
        </div>
      );
    }
    return <div />;
  }

  render() {
    const { classes, location } = this.props;

    const search = this.getByLocation(location, classes);

    return (
      <div>
        {search}
      </div>
    );
  }
}

MinSearch.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MinSearch);
