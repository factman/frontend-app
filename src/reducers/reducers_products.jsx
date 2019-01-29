import { DEAL, FEATURE, LATEST, POPULAR, CART, SINGLE, NORMAL } from "../actions/actions_product_kind";

const front = (state = {
  deal: [],
  feature: [],
  latest: [],
  popular: [],
  shoppingCart: {},
  singleProduct: {},
  allProducts: [],
}, action) => {
  switch (action.type) {
    case DEAL:
      return Object.assign({}, state, { deal: action.payload });
    case FEATURE:
      return Object.assign({}, state, { feature: action.payload });
    case LATEST:
      return Object.assign({}, state, { latest: action.payload });
    case POPULAR:
      return Object.assign({}, state, { popular: action.payload });
    case CART:
      return Object.assign({}, state, { shoppingCart: action.payload });
    case SINGLE:
      return Object.assign({}, state, { singleProduct: action.payload });
    case NORMAL:
      return Object.assign({}, state, { allProducts: action.payload });
    default:
      return state;
  }
};

export default front;
