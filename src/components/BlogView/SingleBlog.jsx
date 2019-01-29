import React from "react";
import PropTypes from "prop-types";
// material-ui components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import Avatar from "@material-ui/core/Avatar";
import Card from "../Card/Card";
import CardBody from "../Card/CardBody";
import imagesStyles from "../../assets/jss/material-kit-react/imagesStyles";
import { cardTitle, primaryColor } from "../../assets/jss/material-kit-react";
import GridContainer from "../Grid/GridContainer";
import GridItem from "../Grid/GridItem";
import Button from "../CustomButtons/Button";
import DraftToHtml from "../../bezopComponents/Editor/DraftToHtml";
import image from "../../assets/img/avatar-default.jpg";
import { IsJsonString } from "../../helpers/logic";

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
    p: {
      fontSize: "1.5em",
      lineHeight: "1.8em",
      textAlign: "justify",
    },
  },
  cardFootText: {
    fontSize: "1em",
    marginTop: "20px",
    paddingTop: "35px",
    marginBottom: "50px",
  },
  postButtonCon: {
    float: "right",
    marginTop: 14,
  },
  avatar: {
    margin: "10px 10px 0px 0px",
    width: 70,
    height: 70,
    float: "left",
  },
};

class SingleBlog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  htmlDecode = (input) => {
    if (input) {
      const e = document.createElement("div");
      e.innerHTML = input.replace(/\n/g, "<br>")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
      return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
    }
    return null;
  }

  render() {
    const { classes, shop, blog } = this.props;
    const blogDate = new Date(blog.createdAt).toLocaleString("en-GB");

    // console.log(blog.content ? stateToHTML(convertFromRaw(JSON.parse(blog.content))) : null);
    return (
      <div>
        <GridContainer justify="center" className={classes.con}>
          {(blog.image && blog.image.includes("https://")) ? (
            <GridItem lg={6} className={classes.scene}>
              <Button simple className={classes.cardButton}>
                <Card className={classes.cardCon}>
                  <img
                    className={classes.imgCardTop}
                    src={blog.image}
                    alt="Blog"
                  />
                </Card>
              </Button>
            </GridItem>)
            : null}
          <GridItem sm={12}>
            <CardBody className={classes.cardBody}>
              <Avatar
                alt="User"
                src={image}
                className={classes.avatar}
              />
              <p className={classes.cardFootText}>
                <strong style={{ color: primaryColor }}>
                  {shop.vendor}
                </strong>
                {`, ${blogDate}`}
              </p>
              <div className={classes.cardText}>
                {
                  IsJsonString(blog.content) === "object"
                    ? <DraftToHtml content={blog.content} />
                    : blog.content
                }

              </div>
            </CardBody>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

SingleBlog.prototypes = {
  classes: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
};

export default withStyles(style)(SingleBlog);
