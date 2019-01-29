import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import catIcon from "../../assets/img/Shopping-Basket-Icon.ico";
import brandIcon from "../../assets/img/Brand.png";

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

class SearchDropdown extends React.Component {
  state = {
    expanded: null,
    checkedCategories: [],
    categories: [],
    checkedBrands: [],
    brands: [],
  };

  componentWillReceiveProps(newProps) {
    const { categories, brands } = newProps.data;
    const { checkedCategories, checkedBrands } = newProps.filters;
    this.setState({ categories, checkedCategories, brands, checkedBrands });
  }

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

  handleChecks = ({ type, index }) => {
    const { filters } = this.props;
    const { events } = filters;
    switch (type) {
      case "categories":
        events.emit("handleCategories", index);
        break;
      case "brands":
        events.emit("handleBrands", index);
        break;
      default:
    }
  };

  render() {
    const { classes } = this.props;
    const { expanded, categories, checkedCategories, brands, checkedBrands } = this.state;

    return (
      <div className={classes.root}>
        <ExpansionPanel expanded={expanded === "panel1"} onChange={this.handleChange("panel1")}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>
              Categories
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <List>
              {categories.map(value => (
                <ListItem key={value.id} dense button className={classes.listItem} onClick={() => this.handleChecks({ type: "categories", index: value.id })}>
                  <Avatar alt="Image" src={value.icon ? value.icon : catIcon} />
                  <ListItemText primary={value.name} />
                  <ListItemSecondaryAction>
                    <Checkbox
                      onClick={() => this.handleChecks({ type: "categories", index: value.id })}
                      checked={checkedCategories.indexOf(value.id) !== -1}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={expanded === "panel3"} onChange={this.handleChange("panel3")}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>
              Brands
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <List>
              {brands.map(value => (
                <ListItem key={value.id} dense button className={classes.listItem} onClick={() => this.handleChecks({ type: "brands", index: value.id })}>
                  <Avatar alt="Image" style={{ height: "50px", width: "50px", borderRadius: "0px" }} src={value.icon ? value.icon : brandIcon} />
                  <ListItemText primary={value.name} />
                  <ListItemSecondaryAction>
                    <Checkbox
                      onClick={() => this.handleChecks({ type: "brands", index: value.id })}
                      checked={checkedBrands.indexOf(value.id) !== -1}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }
}

export default withStyles(styles)(SearchDropdown);
