import React from "react";
import Hidden from "@material-ui/core/Hidden";
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import ProfileTab from "./ProfileTab";
import UserCard from "./UserCard";
import { ProfileObject } from "../../../helpers/customerOperations";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleUpdate = (profileData) => {
    ProfileObject.update(profileData)
      .then((data) => {
        if (data) {
          window.location.reload();
        } else {
          console.log("Error Updating Profile.");
        }
      });
  };

  render() {
    const { classes, profile } = this.props;

    return (
      <GridContainer justify="center" spacing={40}>
        <GridItem lg={8}>
          <ProfileTab profile={profile} handleUpdate={this.handleUpdate} />
        </GridItem>
        <GridItem lg={4}>
          <Hidden mdDown>
            <UserCard classes={classes} profile={profile} />
          </Hidden>
        </GridItem>
      </GridContainer>
    );
  }
}

export default Profile;
