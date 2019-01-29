/*
*@desc the container of the Blog used by REDUX 
*@author Sylvia Onwukwe
*/
import { connect } from "react-redux";
import AdminBlogComponent from "../../Admin/Blog/mainPage";
import { fetchBlog, deleteBlog } from "../../actions/actions_admin_blog";

const mapStateToProps = state => ({
  adminBlog: state.adminBlog
});

const mapDispatchToProps = (dispatch, newProps) => {
  return {
    fetchBlog: () => {
      dispatch(fetchBlog());
    },
    deleteBlog: (blogID) => {
      dispatch(deleteBlog(blogID));
    }
  }
}


const AdminBlog = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminBlogComponent);

export default AdminBlog;
