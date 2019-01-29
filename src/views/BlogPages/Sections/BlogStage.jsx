import React from "react";
import Link from "react-router-dom/Link";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import basicsStyle from "../../../assets/jss/material-kit-react/views/componentsSections/basicsStyle";
// import MinSearch from "../../../components/Search/MinSearch";
import BlogList from "../../../components/BlogView/BlogList";
import { Typography } from "../../../../node_modules/@material-ui/core";
import MinSearch from "../../../components/Search/MinSearch";
import { primaryColor } from "../../../assets/jss/material-kit-react";
// import BlogGrid from "../../../components/BlogView/BlogGrid";
// import BlogCategories from "../../../components/Sidebar/BlogCategories";

class BlogStage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { classes, shop, blogs, vendor } = this.props;

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
        float: "right",
        fontSize: "0.6em",
        marginTop: "-10px",
      },
    };

    return (
      <div className={classes.sections}>
        <div style={styles.container}>
          <div>
            <GridContainer justify="center">
              <GridItem xs={12} md={12}>
                <div style={styles.cols}>
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
                          Blogs
                        </span>
                      </Typography>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3} style={{ marginTop: "-40px", marginBottom: "0px", paddingBottom: "0px" }}>
                      <MinSearch location="sidebar" naked />
                    </GridItem>
                  </GridContainer>
                  {blogs.map(blog => <BlogList shop={shop} blog={blog} key={blog.id} />)}
                  <br />
                  {/* <Hidden smDown>
                    <h2 style={styles.header}>
                      <ViewWeek style={{ fontSize: "1em" }} />
                      {" "}
                      Related Post
                    </h2>
                  </Hidden>
                  <Hidden mdUp>
                    <h3 style={styles.header}>
                      <ViewWeek style={{ fontSize: "1em" }} />
                      {" "}
                      Related Post
                    </h3>
                  </Hidden>
                  <GridContainer justify="left">
                    {[true,true,true,true].map(blog => (
                      <GridItem sm={4} md={3} key={blog.id}>
                        <BlogGrid shop={shop} />
                      </GridItem>
                    ))}
                  </GridContainer> */}
                </div>
              </GridItem>
              {/* <GridItem xs={12} sm={12} md={3}>
                <div style={styles.cols}>
                  <MinSearch location="sidebar" />
                  <BlogCategories />
                </div>
              </GridItem> */}
            </GridContainer>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(basicsStyle)(BlogStage);
