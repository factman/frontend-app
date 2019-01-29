// @desc the blog action used by redux on admin marketplace
// @author Sylvia Onwukwe
export const FETCH_BLOG = "FETCH_BLOG";
export const DELETE_BLOG = "DELETE_BLOG";


export function loadBlog(result) {
  return {
    type: FETCH_BLOG,
    payload: result,
  };
}

export function fetchBlog() {
  return dispatch => fetch(`${process.env.REACT_APP_PROD_API_URL}/blogs/?key=${process.env.REACT_APP_API_KEY}`,
    { method: "GET" })
    .then(response => response.json())
    .then((json) => {
      dispatch(loadBlog(json));
    })
    .catch(error => console.log(error));
}

export function loadDeleteBlog(results) {
  return {
    type: DELETE_BLOG,
    payload: results,
  };
}

export function deleteBlog(blogID) {
  console.log(blogID);
  return dispatch => fetch(`${process.env.REACT_APP_PROD_API_URL}/blogs/${blogID}/?key=${process.env.REACT_APP_API_KEY}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then(response => response.json())
    .then((json) => {
      dispatch(loadDeleteBlog(json));
    })
    .catch(error => console.log(error));
}
