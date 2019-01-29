import React from "react";
import Link from "react-router-dom/Link";
import PropTypes from "prop-types";
// material-ui components
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
// core components
import Card from "../Card/Card";
import CardBody from "../Card/CardBody";
import imagesStyles from "../../assets/jss/material-kit-react/imagesStyles";
import GridContainer from "../Grid/GridContainer";
import GridItem from "../Grid/GridItem";
import LinkManager from "../../helpers/linkManager";
import brandIcon from "../../assets/img/Brand.png";

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
      backgroundColor: "rgba(0,0,0,0.5)",
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
    marginBottom: "15px",
    fontWeight: "normal",
    width: "100%",
  },
};

class BrandGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { classes, params, shop } = this.props;

    return (
      <div>
        <GridContainer>
          {params.map(brand => (
            <GridItem xs={12} sm={4} md={3} lg={2} key={brand.id} className={classes.scene}>
              <Link to={`/${shop.vendor}/brand/${LinkManager.parse(brand.name, brand.id)}`} className={classes.card}>
                <Button simple="true" className={classes.cardButton}>
                  <Card className={classes.cardCon}>
                    <img
                      className={classes.imgCardTop}
                      src={brand.icon ? brand.icon : brandIcon}
                      alt={brand.name}
                    />
                    <CardBody className={`${classes.imgCardOverlay} ${classes.cardBody}`}>
                      <h5 className={classes.cardTitle}>
                        {brand.name}
                      </h5>
                    </CardBody>
                  </Card>
                </Button>
                <Typography variant="subheading" align="center" className={classes.cardButton}>
                  {brand.name}
                </Typography>
              </Link>
            </GridItem>
          ))}
        </GridContainer>
      </div>
    );
  }
}

BrandGrid.prototypes = {
  classes: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
};

export default withStyles(style)(BrandGrid);
