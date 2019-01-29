import React from "react";
import Link from "react-router-dom/Link";
// import { Link } from "react-router-dom";
import PropTypes from "prop-types";
// material-ui components
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
// core components
import Card from "../Card/Card";
import CardBody from "../Card/CardBody";
import imagesStyles from "../../assets/jss/material-kit-react/imagesStyles";
import GridContainer from "../Grid/GridContainer";
import GridItem from "../Grid/GridItem";

const style = {
  ...imagesStyles,
  textMuted: {
    color: "#6c757d",
  },
  categoryCard: {
    overflow: "hidden",
  },
  cardFoot: {
    backgroundColor: "#ffffff",
    padding: "20px",
    position: "relative",
    paddingTop: "0px",
    fontWeight: "bolder",
  },
  cardCon: {
    overflow: "hidden",
    margin: "0px",
  },
  cardButton: {
    padding: "0px",
    marginBottom: "30px",
    fontWeight: "normal",
    width: "100%",
    textTransform: "none",
  },
  cardScreen: {
    width: "100%",
    height: "200px",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  scene: {
    perspective: "600px",
  },
  card: {
    transformStyle: "preserve-3d",
    transformOrigin: "center top",
    transition: "transform 0.5s",
    display: "block",
    "&:hover": {
      transform: "rotateX(-8deg) rotateY(8deg)",
      zIndex: "3000",
    },
  },
  vendorImage: {
    position: "absolute",
    backgroundColor: "white",
    borderRadius: "inherit",
    padding: "6px",
  },
};

class VendorGrid extends React.Component {
  state = {};

  render() {
    const { classes, params } = this.props;

    return (
      <div>
        <GridContainer>
          {params.map((vendor, index) => (
            <GridItem xs={12} sm={6} md={4} lg={3} key={index} className={classes.scene}>
              <Link to={`/vendor/${index}`} className={classes.card}>
                <Button simple="true" className={classes.cardButton}>
                  <Card className={classes.cardCon}>
                    <div className={classes.cardScreen} style={{ backgroundImage: `url("${vendor.slide}")` }} />
                    <div className={classes.vendorImage}>
                      <img src={vendor.image} width="80" alt={vendor.name} />
                    </div>
                    <CardBody className={classes.cardFoot}>
                      <h4>
                        {vendor.name}
                      </h4>
                      <p>
                        {vendor.email}
                      </p>
                      <p>
                        {vendor.address}
                      </p>
                    </CardBody>
                  </Card>
                </Button>
              </Link>
            </GridItem>
          ))}
        </GridContainer>
      </div>
    );
  }
}

VendorGrid.prototypes = {
  classes: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
};

export default withStyles(style)(VendorGrid);
