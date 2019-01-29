import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
});

class BlogCategories extends React.Component {
  state = { open: false };

  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <List
          component="nav"
          subheader={<ListSubheader component="div">Blog Categories</ListSubheader>}
        >
          <ListItem button>
            <ListItemText primary="Category 1" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Category 2" />
          </ListItem>
          <ListItem button onClick={this.handleClick}>
            <ListItemText primary="Category 3" />
            {this.state.open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={this.state.open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button className={classes.nested}>
                <ListItemText primary="Sub Category 1" />
              </ListItem>
              <ListItem button className={classes.nested}>
                <ListItemText primary="Sub Category 2" />
              </ListItem>
              <ListItem button className={classes.nested}>
                <ListItemText primary="Sub Category 3" />
              </ListItem>
            </List>
          </Collapse>
        </List>
      </div>
    );
  }
}

BlogCategories.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BlogCategories);