import React from "react";
import Link from "react-router-dom/Link";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";

import basicsStyle from "../../assets/jss/material-kit-react/views/componentsSections/basicsStyle";
import GridContainer from "../Grid/GridContainer";
import GridItem from "../Grid/GridItem";
import CategoryGrid from "./CategoryGrid";
import MinSearch from "../Search/MinSearch";
import { primaryColor } from "../../assets/jss/material-kit-react";

class CategoryView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { params, shop, vendor } = this.props;

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
        <GridContainer
          spacing={40}
          style={{
            borderBottom: "1px solid lightgray",
            marginBottom: "20px",
            paddingBottom: "0px",
          }}
        >
          <GridItem xs={12} sm={12} md={9} style={{ paddingBottom: "0px" }}>
            <MinSearch location="stage" />
            <Typography variant="body2" gutterBottom paragraph noWrap>
              <Link to={`/${vendor.domainName}`} style={{ color: primaryColor }}>
                {`${vendor.businessName}`}
              </Link>
              &nbsp;{">"}&nbsp;
              <span style={{ color: "rgba(0,0,0,0.3)" }}>
                Categories
              </span>
            </Typography>
          </GridItem>
          <GridItem xs={12} sm={12} md={3} style={{ marginTop: "-40px", marginBottom: "0px", paddingBottom: "0px" }}>
            <MinSearch location="sidebar" naked />
          </GridItem>
        </GridContainer>
        <GridContainer style={styles.productArea}>
          <GridItem>
            <CategoryGrid params={params} shop={shop} />
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default withStyles(basicsStyle)(CategoryView);
