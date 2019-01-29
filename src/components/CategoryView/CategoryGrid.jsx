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
import catIcon from "../../assets/img/Shopping-Basket-Icon.ico";

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
  },
  cardScreen: {
    width: "100%",
    padding: "10px",
    // backgroundRepeat: "no-repeat",
    // backgroundSize: "contain",
    // backgroundPosition: "top center",
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
      transform: "rotateX(8deg) rotateY(-8deg)",
      zIndex: "3000",
    },
  },
};

class CategoryGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { classes, params, shop } = this.props;

    return (
      <div>
        <GridContainer>
          {params.map(category => (
            <GridItem xs={12} sm={4} md={3} lg={2} key={category.id} className={classes.scene}>
              <Link to={`/${shop.vendor}/category/${LinkManager.parse(category.name, category.id)}`} className={classes.card}>
                <Button simple="true" className={classes.cardButton}>
                  <Card className={classes.cardCon}>
                    <div className={classes.cardScreen}>
                      <img src={category.icon ? category.icon : catIcon} alt={category.id} width="100%" />
                    </div>
                    <CardBody className={classes.cardFoot}>
                      <Typography variant="subheading" noWrap>
                        {category.name}
                      </Typography>
                      <p>
                        <Typography variant="caption" noWrap>
                          {category.description}
                        </Typography>
                      </p>
                    </CardBody>
                  </Card>
                </Button>
              </Link>
            </GridItem>))}
        </GridContainer>
      </div>
    );
  }
}

CategoryGrid.prototypes = {
  classes: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
};

export default withStyles(style)(CategoryGrid);
