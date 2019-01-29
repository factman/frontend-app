import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Desc from "@material-ui/icons/Description";
import Info from "@material-ui/icons/Info";
import Detail from "@material-ui/icons/Assessment";

const styles = theme => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "50%",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
});

class DetailInfo extends React.Component {
  state = {
    expanded: null,
  };

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

  render() {
    const { classes, product, vendor, brand } = this.props;
    const { expanded } = this.state;

    return (
      <div className={classes.root}>
        <ExpansionPanel expanded={expanded === "panel1"} onChange={this.handleChange("panel1")}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>
              <Desc />
&nbsp;Description
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              {product.description}
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={expanded === "panel2"} onChange={this.handleChange("panel2")}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>
              <Info />
&nbsp;Vendor&nbsp;Information
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails style={{ display: "block" }}>
            <h3>
              {(vendor) ? vendor.name : null}
            </h3>
            <p>
                Email Address:
              {" "}
              {(vendor) ? vendor.email : null}
            </p>
            <p>
                Address:
              {" "}
              {(vendor) ? vendor.address : null}
            </p>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={expanded === "panel3"} onChange={this.handleChange("panel3")}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>
              <Detail />
&nbsp;Product&nbsp;Details
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <ul>
              <li>
                <strong>
Brand:
                </strong>
                {" "}
                {(brand) ? brand.name : null}
              </li>
              <li>
                <strong>
Length:
                </strong>
                {" "}
                {product.length}
              </li>
              <li>
                <strong>
Width:
                </strong>
                {" "}
                {product.width}
              </li>
              <li>
                <strong>
Height:
                </strong>
                {" "}
                {product.height}
              </li>
              <li>
                <strong>
Color:
                </strong>
                {" "}
                {product.color}
              </li>
            </ul>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }
}

DetailInfo.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string,
    heading: PropTypes.string,
    secondaryHeading: PropTypes.string,
  }).isRequired,
};

export default withStyles(styles)(DetailInfo);
