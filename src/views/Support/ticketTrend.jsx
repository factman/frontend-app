import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import classNames from "classnames";
import PerfectScrollbar from "perfect-scrollbar";

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  trendWrapper: {
    height: "300px",
    backgroundColor: "#f3f3f3",
    position: "relative",
  },
  leftSide: {
    margin: "10px 50px 10px 10px",
    backgroundColor: "#ededed",
  },
  rightSide: {
    margin: "10px 10px 10px 50px",
  },
});

class TicketTrend extends React.Component {
  constructor(props) {
    super(props);
    this.ticketTrendPanel = React.createRef();
    this.ticketTrendWrapper = React.createRef();
  }

  componentDidMount() {
    const ps = new PerfectScrollbar(this.ticketTrendPanel.current);
    ps.update();
    // this.ticketTrendPanel.current.addEventListener("scroll", this.trendPanel);
  }

  trendPanel = () => {
    // console.log(this.ticketTrendPanel.current.getBoundingClientRect());
    // console.log(this.ticketTrendPanel.current.getBoundingClientRect().top);
  }

  render() {
    const {
      classes,
      messages,
    } = this.props;
    return (
      <div>
        <div className={classes.trendWrapper} ref={this.ticketTrendPanel}>
          <div ref={this.ticketTrendWrapper}>
            {
              messages.map(message => (
                <Paper
                  key={message.id}
                  className={classNames({
                    [classes.root]: true,
                    [classes.leftSide]: message.sentBy === "customer",
                    [classes.rightSide]: message.sentBy === "vendor",
                  })}
                  elevation={1}
                >
                  <Typography component="p">
                    {message.message}
                  </Typography>
                </Paper>
              ))
            }
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(TicketTrend);
