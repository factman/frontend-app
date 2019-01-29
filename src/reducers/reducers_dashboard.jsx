import { FETCH_PRODUCTS } from "../actions/actions_product";
import { FETCH_PRODUCT_BRANDS } from "../actions/actions_product_brand";
import { FETCH_PRODUCT_CATEGORIES } from "../actions/actions_product_category";
import { FETCH_PRODUCT_STOCKS } from "../actions/actions_product_stock";
import { FETCH_ORDERS } from "../actions/actions_order";
import { FETCH_COUPONS } from "../actions/actions_vendor_coupon";

const dashboard = (state = {}, action) => {
  let output;
  let data;
  switch (action.type) {
    case FETCH_PRODUCTS:
      data = action.payload.success ? action.payload.data : action.payload.message;
      output = { getAll: data };
      break;
    case FETCH_PRODUCT_BRANDS:
      data = action.payload.success ? action.payload.data : action.payload.message;
      output = { productBrands: data };
      break;
    case FETCH_PRODUCT_CATEGORIES:
      data = action.payload.success ? action.payload.data : action.payload.message;
      output = { productCategories: data };
      break;
    case FETCH_PRODUCT_STOCKS:
      data = action.payload.success ? action.payload.data : action.payload.message;
      output = { getProductStocks: data };
      break;
    case FETCH_COUPONS:
      data = action.payload.success ? action.payload.data : action.payload.message;
      output = { getProductCoupons: data };
      break;
    case FETCH_ORDERS:
      data = action.payload.success ? action.payload.data : action.payload.message;
      output = { getOrders: data };
      break;
    default:
      output = state;
      break;
  }
  return output;
};

export default dashboard;
