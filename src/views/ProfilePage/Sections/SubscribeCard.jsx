import React from "react";
// core components
import Paper from "@material-ui/core/Paper";
import InputAdornment from "@material-ui/core/InputAdornment";

import Email from "@material-ui/icons/Email";

import Button from "../../../components/CustomButtons/Button";
import CustomInput from "../../../components/CustomInput/CustomInput";


class SubscribeCard extends React.Component {
  state = {};

  render() {
    const { classes } = this.props;

    return (
      <Paper className={classes.paper} elevation={4}>
        <h4 style={{ textAlign: "center" }}>
                    Subscribe To Newsletter
        </h4>
        <Paper className={classes.innerPaper} square={false} elevation={0}>
          <CustomInput
            labelText="Email Address"
            id="subscribe"
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              endAdornment: (<InputAdornment position="start">
                <Email />
              </InputAdornment>),
            }}
          />
          <Button round color="primary" style={{ margin: "20px auto", display: "block" }}>
                    Subscribe
          </Button>
        </Paper>
      </Paper>
    );
  }
}

export default (SubscribeCard);
