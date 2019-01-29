import {
  POST_BLOG_DETAILS,
  FETCH_BLOGS,
  UPDATE_BLOG_DETAILS,
  DELETE_BLOG,
} from "../actions/actions_vendor_blog";
import { PUT_IMAGE } from "../actions/actions_imageupload";


const blog = (state = {}, action) => {
  let output;
  let data;
  switch (action.type) {
    case POST_BLOG_DETAILS:
      data = action.payload.success ? action.payload.data : action.payload.message;
      output = { addBlog: data };
      break;
    case FETCH_BLOGS:
      data = action.payload.success ? action.payload.data : action.payload.message;
      output = { getBlog: data };
      break;
    case UPDATE_BLOG_DETAILS:
      data = action.payload.success ? action.payload.data : action.payload.message;
      output = { updateBlog: data };
      break;
    case DELETE_BLOG:
      data = action.payload.success ? action.payload.data : action.payload.message;
      output = { deleteBlog: data };
      break;
    case PUT_IMAGE:
      data = action.payload.success ? action.payload.data : "There was an error uploading product images";
      output = { updateImage: data };
      break;
    default:
      output = state;
      break;
  }
  return output;
};

export default blog;
