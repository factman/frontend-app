import React from "react";

import withStyles from "@material-ui/core/styles/withStyles";
import Hidden from "@material-ui/core/Hidden";

import basicsStyle from "../../assets/jss/material-kit-react/views/componentsSections/basicsStyle";
import GridContainer from "../Grid/GridContainer";
import GridItem from "../Grid/GridItem";
import VendorGrid from "./VendorGrid";

class VendorView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { params } = this.props;

    const styles = {
      cols: {
        display: "block",
        marginBottom: "30px",
      },
      container: {
        padding: "0px 30px",
      },
      header: {
        borderBottom: "1px solid lightgray",
      },
      bigMore: {
        float: "right", fontSize: "0.4em",
      },
      smallMore: {
        fontSize: "0.5em",
        marginTop: "0px",
      },
      productArea: {
        padding: "30px 0px",
      },
    };

    return (
      <div>
        <Hidden smDown>
          <h2 style={styles.header}>
All Vendors
          </h2>
        </Hidden>
        <Hidden mdUp>
          <h3 style={styles.header}>
All Vendors
          </h3>
        </Hidden>
        <GridContainer style={styles.productArea}>
          <GridItem>
            <VendorGrid params={params} />
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default withStyles(basicsStyle)(VendorView);
