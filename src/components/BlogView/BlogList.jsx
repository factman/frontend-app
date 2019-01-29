import React from "react";
import Link from "react-router-dom/Link";
import PropTypes from "prop-types";
// material-ui components
import withStyles from "@material-ui/core/styles/withStyles";
import Avatar from "@material-ui/core/Avatar";
import Comment from "@material-ui/icons/Comment";
// core components
import Card from "../Card/Card";
import CardBody from "../Card/CardBody";
import imagesStyles from "../../assets/jss/material-kit-react/imagesStyles";
import { cardTitle, primaryColor } from "../../assets/jss/material-kit-react";
import GridContainer from "../Grid/GridContainer";
import GridItem from "../Grid/GridItem";
import Button from "../CustomButtons/Button";
import image from "../../assets/img/avatar-default.jpg";
import LinkManager from "../../helpers/linkManager";

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
  },
  avatar: {
    margin: "10px 10px 0px 0px",
    width: 50,
    height: 50,
    float: "left",
  },
  cardFootText: {
    fontSize: "1em",
    marginTop: "30px",
  },
  postButtonCon: {
    float: "right",
    marginTop: 14,
  },
};

class BlogList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { classes, blog, shop } = this.props;
    const blogDate = new Date(blog.createdAt).toLocaleString("en-GB");

    return (
      <div>
        <GridContainer className={classes.con} justify="center" alignItems="center" direction="row">
          <GridItem
            sm={(blog.image && blog.image.includes("https://")) ? 4 : null}
            lg={(blog.image && blog.image.includes("https://")) ? 3 : null}
            className={classes.scene}
          >
            {(blog.image && blog.image.includes("https://"))
              ? (
                <Link to={`/${shop.vendor}/blog/${LinkManager.parse(blog.title, blog.id)}`} className={classes.card}>
                  <Button simple className={classes.cardButton}>
                    <Card className={classes.cardCon}>
                      <img
                        className={classes.imgCardTop}
                        src={blog.image}
                        alt="Blog"
                      />
                    </Card>
                  </Button>
                </Link>
              )
              : null}
          </GridItem>
          <GridItem sm={(blog.image && blog.image.includes("https://")) ? 8 : 12} lg={(blog.image && blog.image.includes("https://")) ? 9 : 12}>
            <CardBody className={classes.cardBody}>
              <Link to={`/${shop.vendor}/blog/${LinkManager.parse(blog.title, blog.id)}`} className={classes.card}>
                <h3 className={classes.cardTitle}>
                  {blog.title}
                </h3>
              </Link>
              <p className={classes.cardText}>
                {blog.summary}
                <Link to={`/${shop.vendor}/blog/${LinkManager.parse(blog.title, blog.id)}`} style={{ color: primaryColor }}>
                  {" "}
                  More...
                </Link>
              </p>
              <div className={classes.postButtonCon}>
                <Button color="primary" simple>
                  <Link to={`/${shop.vendor}/blog/${LinkManager.parse(blog.title, blog.id)}`} style={{ color: primaryColor }}>
                    <Comment />
                    {` (${blog.review.length}) Comments`}
                  </Link>
                </Button>
              </div>
              <Avatar
                alt="User"
                src={image}
                className={classes.avatar}
              />
              <p className={classes.cardFootText}>
                  By
                {" "}
                <strong>
                  {/* {shop.vendor} */}
                  {(blog.vendor) ? blog.vendor.businessName : null}
                </strong>
                {`, ${blogDate}`}
              </p>
            </CardBody>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

BlogList.prototypes = {
  classes: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
};

export default withStyles(style)(BlogList);
