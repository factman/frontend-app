import React from "react";
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import ProfileTable from "./ProfileTable";
import { primaryColor } from "../../../assets/jss/material-kit-react";

class Notifications extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const { classes } = this.props;

    return (
      <GridContainer justify="center" spacing={40}>
        <GridItem xs={12}>
          <ProfileTable
            title="My Notifications"
            classes={classes}
            Icon={null}
            color={primaryColor}
          />
        </GridItem>
      </GridContainer>
    );
  }
}

export default Notifications;
