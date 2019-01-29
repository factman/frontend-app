// @desc blog reducers on the admin marketplace
// @author Sylvia Onwukwe
import {
  FETCH_BLOG,
  DELETE_BLOG,
} from "../actions/actions_admin_blog";

const adminBlog = (state = {}, action) => {
  let output;
  let data;
  switch (action.type) {
    case FETCH_BLOG:
      data = action.payload.success ? action.payload.data : action.payload.message;
      output = { blog: data };
      break;
    case DELETE_BLOG:
      data = action.payload.success ? action.payload.data : action.payload.message;
      output = { deleteBlog: data };
      break;
    default:
      output = state;
      break;
  }

  return output;
};

export default adminBlog;
