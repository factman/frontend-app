import React from "react";
import Link from "react-router-dom/Link";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import Carousel from "react-slick";
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import { primaryBackground, warningColor, warningBoxShadow } from "../../../assets/jss/material-kit-react";

const styles = {
  carousel: {
    padding: "10px",
    height: "fit-content",
    overflow: "Hidden",
  },
  collectionContainer: {
    padding: "10px",
  },
  collectionImage: {
    width: "100%",
    height: "auto",
    borderRadius: "5px",
    marginBottom: "10px",
    border: "1px solid rgba(0,0,0,0.05)",
  },
  badge: {
    ...primaryBackground,
    margin: "50px auto -20px auto",
    width: "70%",
    zIndex: "1",
    position: "relative",
    borderRadius: "10px",
    color: "white",
    fontSize: "1em",
  },
};

const SampleNextArrow = (props) => {
  const { style, onClick } = props;
  return (
    <div
      style={{
        ...style,
        display: "table",
        background: "white",
        position: "absolute",
        top: "55%",
        right: "5px",
        zIndex: "2",
        padding: "4px 8px 2px 14px",
        borderRadius: "100%",
        color: warningColor,
        fontSize: "1.8em",
        cursor: "pointer",
        ...warningBoxShadow,
      }}
      onClick={onClick}
    >
      <i className="fas fa-caret-right" />
    </div>
  );
};

const SamplePrevArrow = (props) => {
  const { style, onClick } = props;
  return (
    <div
      style={{
        ...style,
        display: "table",
        background: "white",
        position: "absolute",
        top: "55%",
        left: "5px",
        zIndex: "2",
        padding: "4px 12px 2px 9px",
        borderRadius: "100%",
        color: warningColor,
        fontSize: "1.8em",
        cursor: "pointer",
        ...warningBoxShadow,
      }}
      onClick={onClick}
    >
      <i className="fas fa-caret-left" />
    </div>
  );
};

class Collections extends React.Component {
  state={};

  websiteOrigin = window.location.origin;

  render() {
    const { classes, data } = this.props;
    const settings = {
      dots: false,
      infinite: true,
      autoplay: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      initialSlide: 0,
      vertical: false,
      rows: 1,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
      responsive: [
        {
          breakpoint: 800,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            rows: 1,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            rows: 1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            rows: 1,
          },
        },
      ],
    };

    if (data.length === 0) return (<div />);

    const content = (
      <Carousel {...settings} className={classes.carousel}>
        {data.map(collection => (
          <Link to={`/search?q=${collection}`} className={`${classes.collectionContainer}`} key={collection}>
            <Typography className={classes.badge} noWrap variant="body2" align="center">
              {collection}
            </Typography>
            <img
              src={require(`../../../assets/img/home/${collection}.png`)}
              alt={collection}
              className={classes.collectionImage}
            />
          </Link>
        ))}
      </Carousel>
    );

    return (
      <GridContainer spacing={40} justify="center">
        <GridItem lg={12}>
          {content}
        </GridItem>
      </GridContainer>
    );
  }
}

export default withStyles(styles)(Collections);
