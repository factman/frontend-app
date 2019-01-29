import Validator from "../helpers/validator";
export const POST_BLOG_DETAILS = "POST_BLOG_DETAILS";
export const FETCH_BLOGS = "FETCH_BLOGS";
export const UPDATE_BLOG_DETAILS = "UPDATE_BLOG_DETAILS";
export const DELETE_BLOG = "DELETE_BLOG";

export function loadBlogs(result) {
  return {
    type: FETCH_BLOGS,
    payload: result,
  };
}

export function fetchBlogs() {
  return dispatch => fetch(`${process.env.REACT_APP_DEV_API_URL}/blogs/vendor/${JSON.parse(localStorage["bezop-login:vendor"]).profile.domainName}/?key=${process.env.REACT_APP_API_KEY}`,
    {
      method: "GET",
      headers: {
        authorization: `Bearer ${JSON.parse(localStorage["bezop-login:vendor"]).accessToken}`,
      },
    })
    .then(response => response.json())
    .then((json) => {
      if (Validator.propertyExist(json, "error")) {
        throw json.error;
      }
      return dispatch(loadBlogs(json));
    })
    .catch(error => (
      dispatch(loadBlogs({
        success: false,
        message: error.message,
      }))
    ));
}


export function loadBlogDetail(results) {
  return {
    type: POST_BLOG_DETAILS,
    payload: results,
  };
}


export function postBlogDetails(blogDetails) {
  return dispatch => fetch(`${process.env.REACT_APP_DEV_API_URL}/blogs/?key=${process.env.REACT_APP_API_KEY}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Bearer ${JSON.parse(localStorage["bezop-login:vendor"]).accessToken}`,
    },
    body: JSON.stringify(blogDetails),
  })
    .then(response => response.json())
    .then((json) => {
      if (Validator.propertyExist(json, "error")) {
        throw json.error;
      }
      return dispatch(loadBlogDetail(json));
    })
    .catch(error => (
      dispatch(loadBlogDetail({
        success: false,
        message: error.message,
      }))
    ));
}

export function loadUpdatedBlogDetails(results) {
  return {
    type: UPDATE_BLOG_DETAILS,
    payload: results,
  };
}

export function putBlogDetails(blogDetails, blogID) {
  return dispatch => fetch(`${process.env.REACT_APP_DEV_API_URL}/blogs/${blogID}/?key=${process.env.REACT_APP_API_KEY}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Bearer ${JSON.parse(localStorage["bezop-login:vendor"]).accessToken}`,
    },
    body: JSON.stringify(blogDetails),
  })
    .then(response => response.json())
    .then((json) => {
      if (Validator.propertyExist(json, "error")) {
        throw json.error;
      }
      return dispatch(loadUpdatedBlogDetails(json));
    })
    .catch(error => (
      dispatch(loadUpdatedBlogDetails({
        success: false,
        message: error.message,
      }))
    ));
}

export function loadDeleteBlog(results) {
  return {
    type: DELETE_BLOG,
    payload: results,
  };
}

export function deleteBlog(blogID) {
  return dispatch => fetch(`${process.env.REACT_APP_DEV_API_URL}/blogs/${blogID}/?key=${process.env.REACT_APP_API_KEY}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Bearer ${JSON.parse(localStorage["bezop-login:vendor"]).accessToken}`,
    },
  })
    .then(response => response.json())
    .then((json) => {
      if (Validator.propertyExist(json, "error")) {
        throw json.error;
      }
      return dispatch(loadDeleteBlog(json));
    })
    .catch(error => (
      dispatch(loadDeleteBlog({
        success: false,
        message: error.message,
      }))
    ));
}
