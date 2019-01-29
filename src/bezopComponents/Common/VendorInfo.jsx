import React from "react";
import isEqual from "lodash/isEqual";
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
    height: "fit-content",
  },
  TypePoMariginBottom: {
    marginBottom: "10px !important",
    height: "fit-content",
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
      adminVendorInfo: eachData,
    };
  }

  componentWillReceiveProps(newProps) {
    if (Validator.propertyExist(newProps, "eachData", "role")) {
      const { eachData } = this.props;
      if (!isEqual(eachData, newProps.eachData)) {
        this.setState({
          adminVendorInfo: newProps.eachData,
        });
      }
    }
  }

  render() {
    const {
      adminVendorInfo,
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
            >
              Fullname
            </Typography>
          </GridListTile>
          <GridListTile cols={1}>
            <Typography variant="body1" gutterBottom>
              {adminVendorInfo.fullname}
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
            >
              Username
            </Typography>
          </GridListTile>
          <GridListTile cols={1}>
            <Typography variant="body1" gutterBottom>
              {adminVendorInfo.username}
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
            >
              Email
            </Typography>
          </GridListTile>
          <GridListTile cols={1}>
            <Typography variant="body1" gutterBottom>
              {adminVendorInfo.email}
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
            >
              Domain Name
            </Typography>
          </GridListTile>
          <GridListTile cols={1}>
            <Typography variant="body1" gutterBottom>
              {adminVendorInfo.domainName}
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
            >
              Phone
            </Typography>
          </GridListTile>
          <GridListTile cols={1}>
            <Typography variant="body1" gutterBottom>
              {adminVendorInfo.phone}
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
            >
              Address
            </Typography>
          </GridListTile>
          <GridListTile cols={1}>
            <Typography variant="body1" gutterBottom>
              {`${adminVendorInfo.address.building}, ${adminVendorInfo.address.street}, ${adminVendorInfo.address.city}, ${adminVendorInfo.address.state}, ${adminVendorInfo.address.country}`}
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
            >
              Zip Code
            </Typography>
          </GridListTile>
          <GridListTile cols={1}>
            <Typography variant="body1" gutterBottom>
              {`${adminVendorInfo.address.zip}`}
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
            >
              Compelete Profile
            </Typography>
          </GridListTile>
          <GridListTile cols={1}>
            <Typography variant="body1" gutterBottom>
              {adminVendorInfo.completeProfile === true ? "complete" : "pending"}
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
            >
              Email Verified
            </Typography>
          </GridListTile>
          <GridListTile cols={1}>
            <Typography variant="body1" gutterBottom>
              {adminVendorInfo.emailVerified === true ? "verified" : "unverified"}
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
            >
              Business Verified
            </Typography>
          </GridListTile>
          <GridListTile cols={1}>
            <Typography variant="body1" gutterBottom>
              {adminVendorInfo.businessVerified === true ? "verified" : "unverified"}
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
            >
              Approval
            </Typography>
          </GridListTile>
          <GridListTile cols={1}>
            <Typography variant="body1" gutterBottom>
              {adminVendorInfo.approval.replace(/\^w/, c => c.toUpperCase())}
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
            >
              Status
            </Typography>
          </GridListTile>
          <GridListTile cols={1}>
            <Typography variant="body1" gutterBottom>
              {adminVendorInfo.standing.replace(/\^w/, c => c.toUpperCase())}
            </Typography>
          </GridListTile>
        </GridList>
      </div>
    );
  }
}

export default withStyles(styles)(AdminView);
