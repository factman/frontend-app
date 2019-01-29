import React from "react";
// material-ui components
import withStyles from "@material-ui/core/styles/withStyles";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
// @material-ui/icons
import Close from "@material-ui/icons/Close";
import Edit from "@material-ui/icons/Edit";
import DialogActions from "@material-ui/core/DialogActions";
import isEqual from "lodash/isEqual";
// core components
import CreateBlog from "./createBlog";
import Button from "../../components/CustomButtons/Button";
import modalStyle from "../../assets/jss/material-kit-react/modalStyle";
import { Grid, Snackbar } from "../../../node_modules/@material-ui/core";
import GridItem from "../../components/Grid/GridItem";
import Validator from "../../helpers/validator";
import BezopSnackBar from "../../assets/jss/bezop-mkr/BezopSnackBar";


function Transition(props) {
  return <Slide direction="down" {...props} />;
}

class NewPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      blogDetails: this.props.blogDetails,
      snackBarOpen: false,
      snackBarMessage: "",
    };
  }

  handleClickOpen = () => {
    this.setState({
      modal: true,
    });
  }

  handleClose = () => {
    this.setState({
      modal: false,
    });
  }

  setParentBlogDetails = (blogDetails) => {
    this.setState({
      blogDetails,
    });
  }

  componentWillReceiveProps(newProps) {
    const { blog, blogDetails } = this.props;
    if (
      Validator.propertyExist(newProps, "blog", "addBlog")
      && !isEqual(blog.addBlog, newProps.blog.addBlog)
    ) {
      if (typeof newProps.blog.addBlog === "string") {
        this.setState({
          snackBarOpen: true,
          snackBarMessage: newProps.blog.addBlog,
        });
        return false;
      }

      this.setState({
        blogDetails,
      });
      this.handleClose();
    }

    if (
      Validator.propertyExist(newProps, "blog", "updateBlog")
      && !isEqual(blog.updateBlog, newProps.blog.updateBlog)
    ) {
      if (typeof newProps.blog.updateBlog === "string") {
        this.setState({
          snackBarOpen: true,
          snackBarMessage: newProps.blog.updateBlog,
        });
        return false;
      }

      this.handleClose();
    }
    return false;
  }

  onCloseHandler = () => {
    this.setState({ snackBarOpen: false });
  }

  addBlogPost = () => {
    const { postBlogDetails } = this.props;
    const { blogDetails } = this.state;
    postBlogDetails(blogDetails);
  }

  updateBlogPost = () => {
    const { putBlogDetails, eachData } = this.props;
    const { blogDetails } = this.state;
    putBlogDetails(blogDetails, eachData.id);
  }


  render() {
    const { classes, type, blog, blogDetails, eachData } = this.props;
    const { snackBarOpen, snackBarMessage } = this.state;
    let header;
    let content;
    let submitButton;
    switch (type) {
      case "add":
        header = (
          <Button
            color="primary"
            onClick={this.handleClickOpen}
          >
          Create New Post
          </Button>
        );
        content = (
          <CreateBlog
            blogDetails={blogDetails}
            setParentBlogDetails={this.setParentBlogDetails}
            blog={blog}
          />
        );
        submitButton = (
          <Button variant="contained" color="primary" component="span" style={{ width: "100%" }} onClick={this.addBlogPost}>
        Create Blog Post
          </Button>
        );

        break;
      case "edit":
        header = (
          <Edit
            style={{ fontSize: "15px" }} 
            onClick={this.handleClickOpen}
          />
        );
        content = (
          <CreateBlog
            blogDetails={blogDetails}
            setParentBlogDetails={this.setParentBlogDetails}
            blog={blog}
            eachData={eachData}
          />
        );
        submitButton = (
          <Button variant="contained" color="primary" component="span" style={{ width: "100%" }} onClick={this.updateBlogPost}>
          Update Blog Post
          </Button>
        );
        break;
      default:
        return false;
    }
    return (
      <div>
        {header}
        <Dialog
          fullScreen
          fullWidth
          classes={{
            root: classes.center,
            paper: classes.modal,
          }}
          open={this.state.modal}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="modal-slide-title"
          aria-describedby="modal-slide-description"
        >
          <DialogTitle
            id="classic-modal-slide-title"
            disableTypography
            className={classes.modalHeader}
          >
            <IconButton
              className={classes.modalCloseButton}
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={this.handleClose}
            >
              <Close className={classes.modalClose} />
            </IconButton>

          </DialogTitle>
          <DialogContent
            id="modal-slide-description"
            className={classes.modalBody}
          >
            {content}
          </DialogContent>
          <DialogActions>
            <Grid container>
              <GridItem xs={12}>
                {submitButton}
              </GridItem>
            </Grid>
          </DialogActions>
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={snackBarOpen}
            onClose={this.onCloseHandler}
          >
            <BezopSnackBar
              onClose={this.onCloseHandler}
              variant="error"
              message={snackBarMessage}
            />
          </Snackbar>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(modalStyle)(NewPost);
