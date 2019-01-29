import React from "react";
import Link from "react-router-dom/Link";
import PropTypes from "prop-types";
// material-ui components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import Card from "../Card/Card";
import CardBody from "../Card/CardBody";
import imagesStyles from "../../assets/jss/material-kit-react/imagesStyles";
import { cardTitle, primaryColor } from "../../assets/jss/material-kit-react";
import GridContainer from "../Grid/GridContainer";
import GridItem from "../Grid/GridItem";
import Button from "../CustomButtons/Button";
import image from "../../assets/img/examples/mariya-georgieva.jpg";

const style = {
  ...imagesStyles,
  cardTitle,
  textMuted: {
    color: "#6c757d",
  },
  cardButton: {
    padding: "0px",
    margin: "0px",
    fontWeight: "normal",
    width: "100%",
  },
  cardCon: {
    overflow: "hidden",
    margin: "0px",
  },
  con: {
    margin: "50px 0px",
  },
  cardBody: {
    padding: 0,

  },
  cardText: {
    fontSize: "1em",
    marginTop: "-10px",
  },
  cardFootText: {
    fontSize: "0.8em",
    marginTop: "10px",
    marginBottom: "-10px",
  },
  postButtonCon: {
    float: "right",
    marginTop: 14,
  },
};

class BlogGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { classes, img, shop } = this.props;

    return (
      <div>
        <GridContainer className={classes.con}>
          <GridItem sm={(img) ? 12 : null} className={classes.scene}>
            {(img)
              ? (
                <Link to={`/${shop.vendor}/blog/blog`} className={classes.card}>
                  <Button simple className={classes.cardButton}>
                    <Card className={classes.cardCon}>
                      <img
                        className={classes.imgCardTop}
                        src={image}
                        alt="Blog"
                      />
                    </Card>
                  </Button>
                </Link>
              )
              : null}
          </GridItem>
          <GridItem sm={12}>
            <CardBody className={classes.cardBody}>
              <p className={classes.cardFootText}>
                <strong style={{ color: primaryColor }}>
Author Name
                </strong>
, Post Date
              </p>
              <Link to={`/${shop.vendor}/blog/blog`} className={classes.card}>
                <h4 className={classes.cardTitle}>
Article Title
                </h4>
              </Link>
              <p className={classes.cardText}>
                        Like so many organizations these days, Autodesk is a company in transition.
                        It was until recently a traditional boxed software company selling licenses.
                        Yet its own business model disruption is only part of the story — and
                <Link to={`/${shop.vendor}/blog/blog`} style={{ color: primaryColor }}>
                  {" "}
Read More...
                </Link>
              </p>
            </CardBody>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

BlogGrid.prototypes = {
  classes: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
};

export default withStyles(style)(BlogGrid);
