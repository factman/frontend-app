import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import SwipeableViews from "react-swipeable-views";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import isEqual from "lodash/isEqual";

// core components
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import productStyle from "../../assets/jss/material-kit-react/views/landingPageSections/productStyle";
// import { Paper, GridList, GridListTile, Hidden } from "../../../node_modules/@material-ui/core";
import { Paper, Hidden } from "../../../node_modules/@material-ui/core";
import ImagePlaceholder from "../Images/ImagePlaceholder";

function TabContainer({ children, dir }) {
  return (
    <Typography
      component="div"
      dir={dir}
      style={{ padding: "20px" }}
    >
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
};


class SideView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currantPoint: 0,
      newMarginTop: null,
      selectedRow: [],
    };
    this.tableMainPanel = React.createRef();
  }

  componentDidMount() {
    document.querySelector("div.App-mainPanel-2").addEventListener("scroll", this.tableMenu);
  }

  componentWillReceiveProps(newProps) {
    const { selectedRow } = this.props;
    if (isEqual(selectedRow, newProps.selectedRow) !== true) {
      this.setState({
        selectedRow: newProps.selectedRow,
      });
    }
  }

  componentWillUnmount() {
    document.querySelector("div.App-mainPanel-2").removeEventListener("scroll", this.tableMenu);
  }

  handleChange = (event, currantPoint) => {
    this.setState({ currantPoint });
  };

  handleChangeIndex = (index) => {
    this.setState({ currantPoint: index });
  };

  tableMenu = () => {
    if (this.tableMainPanel.current.getBoundingClientRect().top > 5) {
      this.setState({
        newMarginTop: this.tableMainPanel.current.getBoundingClientRect().top,
      });
    } else {
      this.setState({
        newMarginTop: 5,
      });
    }
  }

  render() {
    const {
      classes,
      theme,
      imagePropertiesDisplay,
      contentPropertiesDisplay,
      postImage,
      collection,
    } = this.props;
    const {
      currantPoint,
      newMarginTop,
      selectedRow,
    } = this.state;
    return (
      <div ref={this.tableMainPanel} style={{ marginTop: "70px" }}>
        <div
          className={classNames({
            [classes.dynamicMarginTopSpec]: true,
          })}
          style={{ marginTop: newMarginTop }}
        >
          <Paper>
            <div className={classes.root}>
              <AppBar position="static" color="default">
                <Tabs
                  value={currantPoint}
                  onChange={this.handleChange}
                  indicatorColor="primary"
                  textColor="primary"
                  fullWidth
                  className={classes.marginDynamic}
                  classes={{
                    indicator: classes.selectedButton,
                  }}
                >
                  { imagePropertiesDisplay
                    ? (
                      <Tab label="Image" classes={{ label: classes.labelFontSmall, selected: classes.tabSelected }} />
                    ) : null
                  }
                  { contentPropertiesDisplay
                    ? (
                      <Tab label="View" classes={{ label: classes.labelFontSmall, selected: classes.tabSelected }} />
                    ) : null
                  }
                </Tabs>
              </AppBar>
            </div>
            <div>
              <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={12}>
                  <SwipeableViews
                    axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                    index={currantPoint}
                    onChangeIndex={this.handleChangeIndex}
                  >
                    { imagePropertiesDisplay
                      ? (
                        <TabContainer dir={theme.direction}>
                          {
                            Object.values(selectedRow).length > 0
                              ? imagePropertiesDisplay.map(property => (
                                <ImagePlaceholder
                                  srcImage={selectedRow[property.name]}
                                  label={property.name}
                                  fileInput={`${property.name}${selectedRow.id}`}
                                  width={property.width}
                                  height={property.height}
                                  postImage={postImage}
                                  collection={collection}
                                  eachData={selectedRow}
                                  fullwidth
                                  key={`${property.name}${selectedRow.id}`}
                                />
                              ))
                              : <Hidden>Nothing2</Hidden>
                          }
                        </TabContainer>
                      ) : <Hidden>Nothing4</Hidden>
                    }
                    { contentPropertiesDisplay
                      ? (
                        <TabContainer dir={theme.direction}>
                          &nbsp;
                        </TabContainer>
                      ) : <Hidden>Nothing</Hidden>
                    }
                  </SwipeableViews>
                </GridItem>
                <GridItem xs={12} sm={12} md={4} />
              </GridContainer>
            </div>
          </Paper>
        </div>
      </div>
    );
  }
}

export default withStyles(productStyle, { withTheme: true })(SideView);
