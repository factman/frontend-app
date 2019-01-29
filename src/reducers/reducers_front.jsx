import { SLIDERS, CATEGORIES, BRANDS, BLOGS, BLOG, VENDOR } from "../actions/actions_front";

const front = (state = {
  sliders: [],
  categories: [],
  brands: [],
  blogs: [],
  blog: {},
  vendor: {},
}, action) => {
  switch (action.type) {
    case SLIDERS:
      return Object.assign({}, state, { sliders: action.payload });
    case CATEGORIES:
      return Object.assign({}, state, { categories: action.payload });
    case BRANDS:
      return Object.assign({}, state, { brands: action.payload });
    case BLOGS:
      return Object.assign({}, state, { blogs: action.payload });
    case BLOG:
      return Object.assign({}, state, { blog: action.payload });
    case VENDOR:
      return Object.assign({}, state, { vendor: action.payload });
    default:
      return state;
  }
};

export default front;
