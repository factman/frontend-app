import { connect } from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import BlogComponent from "../../views/Blog/blog";
import { fetchBlogs, postBlogDetails, putBlogDetails, deleteBlog } from "../../actions/actions_vendor_blog";
import { postImage } from "../../actions/actions_imageupload";


const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "white",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};


const mapStateToProps = state => ({
  blog: state.vendorBlog
});

const mapStateToDispatch= (dispatch, newProps) => {
  return {
    fetchBlogs: () => {
      dispatch(fetchBlogs());
    },
    postBlogDetails: (blogDetails) => {
      dispatch(postBlogDetails(blogDetails));
    },
    putBlogDetails: (blogDetails, blogId) => {
      dispatch(putBlogDetails(blogDetails, blogId))
    },
    deleteBlog: (blogId) => {
      dispatch(deleteBlog(blogId));
    },
    postImage: (imageDetails, mediaId)=>{
      dispatch(postImage(imageDetails, mediaId))
    }
  }
}

const Blog = connect(
  mapStateToProps,
  mapStateToDispatch
)(BlogComponent);

export default withStyles(styles)(Blog);
