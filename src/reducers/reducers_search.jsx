import {
  FETCH_VENDORS,
  FETCH_PRODUCTS,
  FETCH_CATEGORIES,
  FETCH_BRANDS,
  FETCH_BLOGS,
} from "../actions/actions_search";


const search = (state = {}, action) => {
  let output;
  let data;
  switch (action.type) {
    case FETCH_VENDORS:
      data = action.payload.success ? action.payload.data : action.payload.message;
      output = { getVendors: data };
      break;
    case FETCH_BLOGS:
      data = action.payload.success ? action.payload.data : action.payload.message;
      output = { getBlogs: data };
      break;
    case FETCH_PRODUCTS:
      data = action.payload.success ? action.payload.data : action.payload.message;
      output = { getProducts: data };
      break;
    case FETCH_CATEGORIES:
      data = action.payload.success ? action.payload.data : action.payload.message;
      output = { getCategories: data };
      break;
    case FETCH_BRANDS:
      data = action.payload.success ? action.payload.data : "There was an error uploading product images";
      output = { getBrands: data };
      break;
    default:
      output = state;
      break;
  }
  return output;
};

export default search;
