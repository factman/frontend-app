import React from "react";
import PropTypes from "prop-types";
// material-ui components
import withStyles from "@material-ui/core/styles/withStyles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Typography from "@material-ui/core/Typography";
import imagesStyles from "../../assets/jss/material-kit-react/imagesStyles";
import {
  cardTitle,
  // primaryColor,
} from "../../assets/jss/material-kit-react";
import GridContainer from "../Grid/GridContainer";
import GridItem from "../Grid/GridItem";
// import image from "../../assets/img/avatar-default.jpg";

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
    margin: "20px 0px",
  },
  cardBody: {
    padding: 0,

  },
  cardText: {
    fontSize: "1em",
  },
  cardFootText: {
    fontSize: "1em",
    marginTop: "10px",
    marginBottom: "10px",
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

class BlogComment extends React.Component {
  state = {};

  render() {
    const { classes, review } = this.props;
    // const commentDate = new Date(comment.createdAt).toLocaleString("en-GB");

    return (
      <div>
        <GridContainer className={classes.con} justify="center">
          {/* <GridItem lg={1} sm={2} xs={12}>
            <Avatar
              alt="User"
              src={image}
              className={classes.avatar}
            />
            <Hidden smUp>
              <p className={classes.cardFootText} style={{ marginTop: "30px" }}>
                <strong style={{ color: primaryColor }}>
                  {comment.customer.fullname}
                </strong>
                {`, ${commentDate}`}
              </p>
            </Hidden>
          </GridItem> */}
          <GridItem sm={12}>
            <Table>
              <TableBody>
                {review.map(comment => (
                  <TableRow key={comment.id}>
                    <TableCell>
                      <Typography paragraph>
                        {comment.comment}
                      </Typography>
                    </TableCell>
                  </TableRow>))}
              </TableBody>
            </Table>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

BlogComment.prototypes = {
  classes: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
};

export default withStyles(style)(BlogComment);
