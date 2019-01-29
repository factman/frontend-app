import React from "react";
import { Typography, Divider, withStyles, GridList, GridListTile } from "../../../node_modules/@material-ui/core";
import Validator from "../../helpers/validator";

const styles = theme => ({
  displayMargin: {
    marginTop: "10px",
    marginBottom: "10px",
  },
  russoOneFF: {
    fontFamily: "'Russo One', 'Open Sans'",
  },
  TypePoMariginTop: {
    marginTop: "15px !important",
  },
  TypePoMariginBottom: {
    marginBottom: "10px !important",
  },
  fullWidth: {
    width: "100%",
    fontSize: "20px",
  },
});

class AdminView extends React.Component {
  constructor(props) {
    super(props);
    const { eachData } = this.props;
    this.state = {
      adminUserInfo: eachData,
    };
  }

  componentWillReceiveProps(newProps) {
    if (Validator.propertyExist(newProps, "eachData", "role")) {
      const { eachData } = this.props;
      if (eachData.role !== newProps.eachData.role) {
        this.setState({
          adminUserInfo: newProps.eachData,
        });
      }
    }
  }

  render() {
    const {
      adminUserInfo,
    } = this.state;
    const {
      classes,
    } = this.props;
    return (
      <div>
        <GridList
          cols={2}
          cellHeight="auto"
          className={classes.TypePoMariginTop}
        >
          <GridListTile cols={1}>
            <Typography
              variant="subheading"
              gutterBottom
              className={classes.russoOneFF}
            >
              FULLNAME
            </Typography>
          </GridListTile>
          <GridListTile cols={1}>
            <Typography variant="body1" gutterBottom>
              {adminUserInfo.fullname}
            </Typography>
          </GridListTile>
        </GridList>
        <Divider light />
        <GridList
          cols={2}
          cellHeight="auto"
          className={classes.TypePoMariginTop}
        >
          <GridListTile cols={1}>
            <Typography
              variant="subheading"
              gutterBottom
              className={classes.russoOneFF}
            >
              USERNAME
            </Typography>
          </GridListTile>
          <GridListTile cols={1}>
            <Typography variant="body1" gutterBottom>
              {adminUserInfo.username}
            </Typography>
          </GridListTile>
        </GridList>
        <Divider light />
        <GridList
          cols={2}
          cellHeight="auto"
        >
          <GridListTile cols={1}>
            <Typography
              variant="subheading"
              gutterBottom
              className={classes.russoOneFF}
            >
              EMAIL
            </Typography>
          </GridListTile>
          <GridListTile cols={1}>
            <Typography variant="body1" gutterBottom>
              {adminUserInfo.email}
            </Typography>
          </GridListTile>
        </GridList>
        <Divider light />
        <GridList
          cols={2}
          cellHeight="auto"
          className={classes.TypePoMariginBottom}
        >
          <GridListTile cols={1}>
            <Typography
              variant="subheading"
              gutterBottom
              className={classes.russoOneFF}
            >
              ROLE
            </Typography>
          </GridListTile>
          <GridListTile cols={1}>
            <Typography variant="body1" gutterBottom>
              {adminUserInfo.role.replace(/^\w/, c => c.toUpperCase())}
            </Typography>
          </GridListTile>
        </GridList>
        <Divider light />
        <GridList
          cols={2}
          cellHeight="auto"
          className={classes.TypePoMariginBottom}
        >
          <GridListTile cols={1}>
            <Typography
              variant="subheading"
              gutterBottom
              className={classes.russoOneFF}
            >
              PHONE
            </Typography>
          </GridListTile>
          <GridListTile cols={1}>
            <Typography variant="body1" gutterBottom>
              {adminUserInfo.phone}
            </Typography>
          </GridListTile>
        </GridList>
        <Divider light />
        <GridList
          cols={2}
          cellHeight="auto"
          className={classes.TypePoMariginBottom}
        >
          <GridListTile cols={1}>
            <Typography
              variant="subheading"
              gutterBottom
              className={classes.russoOneFF}
            >
              ADDRESS
            </Typography>
          </GridListTile>
          <GridListTile cols={1}>
            <Typography variant="body1" gutterBottom>
              {adminUserInfo.address}
            </Typography>
          </GridListTile>
        </GridList>
      </div>
    );
  }
}

export default withStyles(styles)(AdminView);
