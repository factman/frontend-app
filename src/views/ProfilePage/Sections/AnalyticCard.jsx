import React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

class AnalyticCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { classes, color, title, Icon, value } = this.props;

    return (
      <Paper className={classes.paper} elevation={4} style={{ cursor: "pointer" }}>
        <Button style={{ padding: "0px", margin: "0px", width: "100%" }}>
          <Paper className={classes.innerPaper} square={false} elevation={0} style={{ width: "100%" }}>
            <Typography style={{ margin: "10px auto", color }} variant="headline" align="right">
              {Icon}
            </Typography>
            <Typography style={{ color }} variant="display1" align="center">
              <span style={{ fontSize: "1em" }}>
                {value}
              </span>
            </Typography>
            <Typography align="center" variant="subheading">
              {title}
            </Typography>
            <br />
          </Paper>
        </Button>
      </Paper>
    );
  }
}

export default AnalyticCard;
