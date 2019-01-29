import React from "react";
import Link from "react-router-dom/Link";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import Comment from "@material-ui/icons/Comment";
import Hidden from "@material-ui/core/Hidden";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import basicsStyle from "../../../assets/jss/material-kit-react/views/componentsSections/basicsStyle";
// import MinSearch from "../../../components/Search/MinSearch";
import SingleBlog from "../../../components/BlogView/SingleBlog";
// import BlogGrid from "../../../components/BlogView/BlogGrid";
// import BlogCategories from "../../../components/Sidebar/BlogCategories";
import BlogComment from "../../../components/BlogView/BlogComment";
import image from "../../../assets/img/avatar-default.jpg";
import CustomInput from "../../../components/CustomInput/CustomInput";
import Button from "../../../components/CustomButtons/Button";
import { API_URL } from "../../../components/Auth/UsersAuth";
import { getUsersToken, userIs } from "../../../components/Auth/AccessControl";
import MinSearch from "../../../components/Search/MinSearch";
import { primaryColor } from "../../../assets/jss/material-kit-react";

class SingleBlogStage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
    };
  }

  setMessage = (event) => {
    const message = event.target.value;
    if (message) {
      this.setState({ message });
    }
  };

  postComment = () => {
    if (!userIs(["customer"])) return null;
    const { message } = this.state;
    if (message.length < 3) return null;
    const { blog } = this.props;
    const { accessToken } = getUsersToken("customer");
    const body = {
      subject: "blog",
      subjectId: blog.id,
      comment: message,
    };
    fetch(`${API_URL}/reviews/customer/?key=${process.env.REACT_APP_API_KEY}`, {
      body: JSON.stringify(body),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      method: "POST",
    })
      .then(response => response.json())
      .then((json) => {
        if (json.success) {
          window.location.reload();
        } else {
          if (json.error) {
            throw new Error(json.error.message);
          }
          throw new Error(json.message);
        }
      })
      .catch(ex => console.log(ex.message));
  };

  render() {
    const { classes, shop, blog, vendor } = this.props;
    const { message } = this.state;

    const styles = {
      cols: {
        display: "block",
        marginBottom: "30px",
      },
      container: {
        padding: "0px 30px",
      },
      header: {
        borderBottom: "1px solid lightgray",
      },
      bigMore: {
        float: "right", fontSize: "0.4em",
      },
      smallMore: {
        float: "right",
        fontSize: "0.6em",
        marginTop: "-10px",
      },
    };

    return (
      <div className={classes.sections}>
        <div style={styles.container}>
          <div>
            <GridContainer justify="center">
              <GridItem xs={12} md={12}>
                <div style={styles.cols}>
                  <GridContainer
                    spacing={40}
                    style={{
                      borderBottom: "1px solid lightgray",
                      marginBottom: "20px",
                      paddingBottom: "0px",
                    }}
                  >
                    <GridItem xs={12} sm={12} md={9} style={{ paddingBottom: "0px" }}>
                      <MinSearch location="stage" />
                      <Typography variant="body2" gutterBottom paragraph noWrap>
                        <Link to={`/${vendor.domainName}`} style={{ color: primaryColor }}>
                          {`${vendor.businessName}`}
                        </Link>
                        &nbsp;{">"}&nbsp;
                        <Link to={`/${vendor.domainName}/blogs`} style={{ color: primaryColor }}>
                          Blogs
                        </Link>
                        &nbsp;{">"}&nbsp;
                        <span style={{ color: "rgba(0,0,0,0.3)" }}>
                          {blog.title}
                        </span>
                      </Typography>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3} style={{ marginTop: "-40px", marginBottom: "0px", paddingBottom: "0px" }}>
                      <MinSearch location="sidebar" naked />
                    </GridItem>
                  </GridContainer>
                  <SingleBlog shop={shop} blog={blog} />
                  {blog.review ? (
                    <span>
                      <Hidden smDown>
                        <h2 style={styles.header}>
                          <Comment style={{ fontSize: "1em" }} />
                          {` ${blog.review.length} Comments`}
                        </h2>
                      </Hidden>
                      <Hidden mdUp>
                        <h3 style={styles.header}>
                          <Comment style={{ fontSize: "1em" }} />
                          {` ${blog.review.length} Comments`}
                        </h3>
                      </Hidden>
                    </span>)
                    : null}
                  {(blog.review) ? (
                    <BlogComment review={blog.review} key={blog.id} />)
                    : null }
                  {(userIs(["customer"])) ? (
                    <GridItem sm={12}>
                      <Avatar
                        alt="User"
                        src={image}
                        className={classes.avatar}
                      />
                      <span>
                      Post your comment here.
                      </span>
                      <form>
                        <GridContainer>
                          <GridItem md={12}>
                            <CustomInput
                              labelText="Your Comment"
                              id="message"
                              value={message}
                              formControlProps={{
                                fullWidth: true,
                                className: classes.textArea,
                                onChange: event => this.setMessage(event),
                              }}
                              inputProps={{
                                multiline: true,
                                rows: 5,
                              }}
                            />
                            <GridContainer justify="center">
                              <GridItem
                                xs={12}
                                className={classes.textCenter}
                              >
                                <Button
                                  round
                                  color="primary"
                                  onClick={this.postComment}
                                >
                                  <Comment />
                                  {" "}
                                Post Comment
                                </Button>
                              </GridItem>
                            </GridContainer>
                          </GridItem>
                        </GridContainer>
                      </form>
                    </GridItem>)
                    : null}
                  <br />
                  {/* <Hidden smDown>
                    <h2 style={styles.header}>
                      <ViewWeek style={{ fontSize: "1em" }} />
                      {" "}
                      Related Post
                    </h2>
                  </Hidden>
                  <Hidden mdUp>
                    <h3 style={styles.header}>
                      <ViewWeek style={{ fontSize: "1em" }} />
                      {" "}
                      Related Post
                    </h3>
                  </Hidden>
                  <GridContainer justify="center">
                    {[true, true, true, true, true, true].map((item, index) => (
                      <GridItem sm={12} md={6} lg={4} key={index}>
                        <BlogGrid img={item} shop={shop} />
                      </GridItem>
                    ))}
                  </GridContainer> */}
                </div>
              </GridItem>
              {/* <GridItem xs={12} sm={12} md={3}>
                <div style={styles.cols}>
                  <MinSearch location="sidebar" />
                  <BlogCategories />
                </div>
              </GridItem> */}
            </GridContainer>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(basicsStyle)(SingleBlogStage);
