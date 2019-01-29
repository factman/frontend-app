import React from "react";
// core components
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import image from "../../../assets/img/avatar-default.jpg";

class UserCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentWillReceiveProps(newProps) {
    this.setState(newProps.state);
  }

  render() {
    const { classes, profile } = this.props;

    return (
      <Paper className={classes.paper} elevation={4}>
        <img src={image} width="100%" alt="Profile" />
        <Paper className={classes.innerPaper} elevation={0}>
          <Typography className={classes.userName} align="center" variant="title">
            {profile.fullname}
          </Typography>
          <Typography gutterBottom align="center" variant="body1">
            {profile.username}
          </Typography>
          <Typography gutterBottom align="center" variant="subheading">
            {profile.email}
          </Typography>
          <Typography gutterBottom align="center" variant="subheading">
            {profile.phone}
          </Typography>
          <br />
        </Paper>
      </Paper>
    );
  }
}

export default (UserCard);
