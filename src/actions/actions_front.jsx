import { API_URL } from "../components/Auth/UsersAuth";

export const SLIDERS = "SLIDERS";
export const CATEGORIES = "CATEGORIES";
export const BRANDS = "BRANDS";
export const BLOGS = "BLOGS";
export const BLOG = "BLOG";
export const VENDOR = "VENDOR";

export function displayVendor(vendor) {
  return {
    type: VENDOR,
    payload: vendor,
  };
}

export function getVendor(domainName) {
  return dispatch => fetch(`${API_URL}/vendors/domain/${domainName}/?key=${process.env.REACT_APP_API_KEY}`, { method: "GET" })
    .then(response => response.json())
    .then((json) => {
      if (json.success && Object.keys(json.data).length > 0) {
        dispatch(displayVendor(json.data));
      } else {
        window.location.href = "/";
        throw new Error(json.message);
      }
    })
    .catch(error => console.log(error.message));
}

export function displayBlog(blog) {
  return {
    type: BLOG,
    payload: blog,
  };
}

export function getBlog(id) {
  return dispatch => fetch(`${API_URL}/blogs/${id}/?key=${process.env.REACT_APP_API_KEY}`, { method: "GET" })
    .then(response => response.json())
    .then((json) => {
      if (json.success && Object.keys(json.data).length > 0) {
        dispatch(displayBlog(json.data));
      } else {
        throw new Error(json.message);
      }
    })
    .catch(error => console.log(error.message));
}

export function displayBlogs(blogs) {
  return {
    type: BLOGS,
    payload: blogs,
  };
}

export function getBlogs(vendor) {
  return dispatch => fetch(`${API_URL}/blogs/vendor/${vendor}/?key=${process.env.REACT_APP_API_KEY}`, { method: "GET" })
    .then(response => response.json())
    .then((json) => {
      if (json.success && json.data.length > 0) {
        dispatch(displayBlogs(json.data));
      } else {
        throw new Error(json.message);
      }
    })
    .catch(error => console.log(error.message));
}

export function displayBrands(brands) {
  return {
    type: BRANDS,
    payload: brands,
  };
}

export function getBrands(vendor) {
  return dispatch => fetch(`${API_URL}/brands/vendor/${vendor}/?key=${process.env.REACT_APP_API_KEY}`, { method: "GET" })
    .then(response => response.json())
    .then((json) => {
      if (json.success && json.data.length > 0) {
        dispatch(displayBrands(json.data));
      } else {
        throw new Error(json.message);
      }
    })
    .catch(error => console.log(error.message));
}

export function displayCategories(categories) {
  return {
    type: CATEGORIES,
    payload: categories,
  };
}

export function getCategories(vendor) {
  return dispatch => fetch(`${API_URL}/categories/vendor/${vendor}/?key=${process.env.REACT_APP_API_KEY}`, { method: "GET" })
    .then(response => response.json())
    .then((json) => {
      if (json.success && json.data.length > 0) {
        dispatch(displayCategories(json.data));
      } else {
        throw new Error(json.message);
      }
    })
    .catch(error => console.log(error.message));
}

export function displaySliders(sliders) {
  return {
    type: SLIDERS,
    payload: sliders,
  };
}

export function getSliders(vendor) {
  return dispatch => fetch(`${API_URL}/sliders/vendor/${vendor}/?key=${process.env.REACT_APP_API_KEY}`, { method: "GET" })
    .then(response => response.json())
    .then((json) => {
      if (json.success && json.data.length > 0) {
        dispatch(displaySliders(json.data));
      } else {
        throw new Error(json.message);
      }
    })
    .catch(error => console.log(error.message));
}
