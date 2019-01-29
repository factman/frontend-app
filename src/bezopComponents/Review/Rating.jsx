import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import LinearProgress from "@material-ui/core/LinearProgress";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import Typography from "@material-ui/core/Typography";
import { getRanking } from "../../helpers/logic";

const styles = {
  root: {
    flexGrow: 1,
    marginTop: "5px",
  },
  bar1Determinate: {
    height: "10px",
    backgroundColor: "#ffe358",
  },
  colorPrimary: {
    height: "10px",
    backgroundColor: "#eeeeee",
  },
  body1: {
    fontSize: "13px",
  },
  preStyle: {
    margin: 0,
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    textAlign: "right",
    fontSize: "13px",
    color: "#000000",
    fontWeight: 400,
  },
};

class LinearDeterminate extends React.Component {
  progress = (numberOfRates, totalRates) => ((totalRates > 0)
    ? (parseFloat((numberOfRates / totalRates), 10) * 100) : 0);

  render() {
    const { classes, review } = this.props;
    return (
      <div>
        {[1, 2, 3, 4, 5].map(rank => getRanking(review, rank))
          .map(rateType => (
            <GridList cols={7} cellHeight="auto" key={rateType.label} style={{ height: "30px" }}>
              <GridListTile cols={1.5}>
                <pre
                  className={classes.preStyle}
                >
                  {rateType.label}
                </pre>
              </GridListTile>
              <GridListTile cols={4.2}>
                <div className={classes.root}>
                  <LinearProgress
                    variant="determinate"
                    value={this.progress(rateType.numberOfRate, rateType.totalRate)}
                    classes={{
                      bar1Determinate: classes.bar1Determinate,
                      colorPrimary: classes.colorPrimary,
                    }}
                  />
                </div>
              </GridListTile>
              <GridListTile cols={1.3}>
                <Typography
                  classes={{
                    body1: classes.body1,
                  }}
                >
                  {`(${rateType.numberOfRate})`}
                </Typography>
              </GridListTile>
            </GridList>
          ))}
      </div>
    );
  }
}

LinearDeterminate.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string.isRequired,
  }).isRequired,
};

export default withStyles(styles)(LinearDeterminate);
