import React from "react";
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import Store from "@material-ui/icons/Store";
import ShoppingCart from "@material-ui/icons/ShoppingCart";
import SupervisorAccount from "@material-ui/icons/SupervisorAccount";
import Loyalty from "@material-ui/icons/Loyalty";
import Layers from "@material-ui/icons/Layers";
import Language from "@material-ui/icons/Language";
import Settings from "@material-ui/icons/Settings";
// import Email from "@material-ui/icons/Email";
import AttachMoney from "@material-ui/icons/AttachMoney";
import Loadable from "react-loadable";
import { PageLoader } from "../components/PageLoader/PageLoader";

const loading = () => <PageLoader display min />;

const adminRoutes = [
  {
    path: "/admin",
    sidebarName: "Dashboard",
    navbarName: "Dashboard",
    exact: true,
    icon: Dashboard,
    component: Loadable({
      loader: () => import("../containers/Admin/Dashboard" /* webpackChunkName: "AdminDashboard" */),
      loading,
    }),
  },
  {
    path: "/admin/users",
    sidebarName: "Admin Users",
    navbarName: "Admin Users",
    icon: SupervisorAccount,
    component: Loadable({
      loader: () => import("../containers/Admin/adminUser" /* webpackChunkName: "adminUser" */),
      loading,
    }),
  },
  // {
  //   path: "/admin/subscribers",
  //   sidebarName: "Subscribers",
  //   navbarName: "Subscribers",
  //   icon: Email,
  //   component: Subscribers,
  // },
  // {
  //   path: "/admin/tickets",
  //   sidebarName: "Tickets",
  //   navbarName: "Tickets",
  //   icon: Email,
  //   component: Tickets,
  // },
  {
    path: "/admin/products",
    sidebarName: "Products",
    navbarName: "Products",
    icon: Store,
    component: Loadable({
      loader: () => import("../containers/Admin/Products" /* webpackChunkName: "AdminProduct" */),
      loading,
    }),
  },
  {
    path: "/admin/categories",
    sidebarName: "Product Category",
    navbarName: "Categories",
    icon: Layers,
    component: Loadable({
      loader: () => import("../containers/Admin/ProductCategory" /* webpackChunkName: "AdminProductCategory" */),
      loading,
    }),
  },
  // {
  //   path: "/admin/brands",
  //   sidebarName: "Product Brands",
  //   navbarName: "brands",
  //   icon: LocalOffer,
  //   component: AdminBrands,
  // },
  {
    path: "/admin/orders",
    sidebarName: "Orders",
    navbarName: "Orders",
    icon: ShoppingCart,
    component: Loadable({
      loader: () => import("../containers/Admin/Order" /* webpackChunkName: "AdminProductOrder" */),
      loading,
    }),
  },
  {
    path: "/admin/vendors",
    sidebarName: "Vendors",
    navbarName: "Vendors",
    icon: SupervisorAccount,
    component: Loadable({
      loader: () => import("../containers/Admin/Vendor" /* webpackChunkName: "AdmiVendor" */),
      loading,
    }),
  },
  {
    path: "/admin/customers",
    sidebarName: "Customers",
    navbarName: "Customers",
    icon: SupervisorAccount,
    component: Loadable({
      loader: () => import("../containers/Admin/Customers" /* webpackChunkName: "AdminCustomer" */),
      loading,
    }),
  },
  {
    path: "/admin/currency",
    sidebarName: "Currency",
    navbarName: "Currency",
    icon: AttachMoney,
    component: Loadable({
      loader: () => import("../containers/Admin/Currency" /* webpackChunkName: "AdmiCurrency" */),
      loading,
    }),
  },
  {
    path: "/admin/transactions",
    sidebarName: "Transactions",
    navbarName: "Transactions",
    icon: AttachMoney,
    component: Loadable({
      loader: () => import("../containers/Admin/Transactions" /* webpackChunkName: "AdminTransaction" */),
      loading,
    }),
  },
  {
    path: "/admin/coupons",
    sidebarName: "Discount Coupons",
    navbarName: "Coupons",
    icon: Loyalty,
    component: Loadable({
      loader: () => import("../containers/Admin/Coupon" /* webpackChunkName: "AdminCoupon" */),
      loading,
    }),
  },
  {
    path: "/admin/blog",
    sidebarName: "Blog",
    navbarName: "Blog",
    icon: Language,
    component: Loadable({
      loader: () => import("../containers/Admin/Blog" /* webpackChunkName: "AdminBlog" */),
      loading,
    }),
  },
  {
    path: "/admin/templates",
    sidebarName: "Email Template",
    navbarName: "Email Template",
    icon: Language,
    component: Loadable({
      loader: () => import("../containers/Admin/EmailTemplates" /* webpackChunkName: "AdminEmailTemplate" */),
      loading,
    }),
  },
  {
    path: "/admin/profile",
    sidebarName: "Admin Profile",
    navbarName: "AdmilProfile",
    icon: Person,
    component: Loadable({
      loader: () => import("../containers/Admin/AdminProfile" /* webpackChunkName: "AdminProfile" */),
      loading,
    }),
  },
  {
    path: "/admin/settings",
    sidebarName: "Store Settings",
    navbarName: "Store Settings",
    icon: Settings,
    component: Loadable({
      loader: () => import("../containers/Admin/StoreSetting"/* webpackChunkName: "AdminStoreSettingd" */),
      loading,
    }),
  },
  {
    redirect: true,
    path: "/",
    to: "/admin",
    navbarName: "Redirect",
  },
];

export default adminRoutes;
