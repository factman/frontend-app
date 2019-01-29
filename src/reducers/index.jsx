import { combineReducers } from "redux";

import front from "./reducers_front";
import map from "./reducers_map";
import products from "./reducers_products";
import productCategory from "./reducers_product_category";
import productBrand from "./reducers_product_brand";
import vendorCoupon from "./reducers_vendor_coupon";
import vendorProfile from "./reducers_vendor";
import vendorBlog from "./reducers_vendor_blog";
import vendorSlider from "./reducers_vendor_slider";
import productStock from "./reducers_product_stock";
import supportTicketVendor from "./reducers_vendor_ticket";
import orders from "./reducers_orders";

import adminBlog from "./reducers_admin_blog";
import adminUser from "./reducers_admin_adminuser";
import adminCoupon from "./reducers_admin_coupon";
import adminCurrency from "./reducers_admin_currency";
import adminCustomers from "./reducers_admin_customers";
import adminOrder from "./reducers_admin_order";
import adminBrand from "./reducers_admin_productBrands";
import adminCategory from "./reducers_admin_productCategory";
import adminProduct from "./reducers_admin_products";
import adminProfile from "./reducers_admin_adminProfile";
import adminVendor from "./reducers_admin_vendor";
import subscriber from "./reducers_admin_subscribers";
import adminTransaction from "./reducers_admin_transactions";
import supportTicket from "./reducers_admin_ticket";
import adminMailTemplate from "./reducers_admin_mail_template";
import search from "./reducers_search";
import dashboard from "./reducers_dashboard";

import product from "./reducers_product";
import customerReview from "./reducers_customer_review";

const rootReducer = combineReducers({
  search,
  front,
  map,
  products,
  productCategory,
  productBrand,
  vendorCoupon,
  vendorBlog,
  vendorSlider,
  productStock,
  vendorProfile,
  supportTicketVendor,
  orders,
  dashboard,
  // Admin Reducer
  adminTransaction,
  adminMailTemplate,
  supportTicket,
  adminBlog,
  adminUser,
  adminCoupon,
  adminCurrency,
  adminCustomers,
  adminOrder,
  adminBrand,
  adminCategory,
  adminProduct,
  adminProfile,
  adminVendor,
  subscriber,
  product,
  // Customer
  customerReview,
});

export default rootReducer;
