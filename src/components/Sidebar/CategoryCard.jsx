import React from "react";
import Link from "react-router-dom/Link";
// material-ui components
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
// core components
import Card from "../Card/Card";
import CardBody from "../Card/CardBody";
import imagesStyles from "../../assets/jss/material-kit-react/imagesStyles";
import catIcon from "../../assets/img/Shopping-Basket-Icon.ico";
import LinkManager from "../../helpers/linkManager";

const style = {
  ...imagesStyles,
  textMuted: {
    color: "#6c757d",
  },
  categoryCard: {
    overflow: "hidden",
  },
  cardBody: {
    transition: "background-color 0.6s, padding 0.6s",
    backgroundColor: "rgba(0,0,0,0)",
    paddingTop: "100%",
    "&:hover": {
      backgroundColor: "rgba(0,0,0,0.6)",
      paddingTop: "20px",
    },
  },
  cardTitle: {
    color: "#ffffff",
    fontWeight: "bold",
    Position: "relative",
    marginTop: "20%",
    textAlign: "center",
    textShadow: "2px 2px 5px black",
  },
  cardText: {
    color: "#ffffff",
    fontWeight: "bold",
    Position: "relative",
    marginTop: "-2%",
    textAlign: "center",
    textShadow: "2px 2px 5px black",
  },
  cardCon: {
    overflow: "hidden",
    margin: "0px",
  },
  cardButton: {
    padding: "0px",
    margin: "0px",
    marginBottom: "30px",
    fontWeight: "normal",
    width: "100%",
    marginTop: "23px",
  },
};

class CategoryCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { classes, category, shop } = this.props;
    return (
      <Link to={`/${shop.vendor}/category/${LinkManager.parse(category.name, category.id)}`}>
        <Button simple="true" className={classes.cardButton}>
          <Card className={classes.cardCon}>
            <img
              className={classes.imgCardTop}
              src={category.icon
                ? category.icon
                : catIcon}
              alt={category.name}
            />
            <CardBody className={`${classes.imgCardOverlay} ${classes.cardBody}`}>
              <h3 className={classes.cardTitle}>
                {category.name}
              </h3>
              <p className={classes.cardText}>
                {category.description}
              </p>
            </CardBody>
          </Card>
        </Button>
      </Link>
    );
  }
}

export default withStyles(style)(CategoryCard);
