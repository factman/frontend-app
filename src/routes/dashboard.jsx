import React from "react";
import Loadable from "react-loadable";
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import Store from "@material-ui/icons/Store";
import ShoppingCart from "@material-ui/icons/ShoppingCart";
import Loyalty from "@material-ui/icons/Loyalty";
// import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import LocalMail from "@material-ui/icons/LocalMall";
import GroupWork from "@material-ui/icons/GroupWork";
import Slideshow from "@material-ui/icons/Slideshow";
import { PageLoader } from "../components/PageLoader/PageLoader";

const loading = () => <PageLoader display min />;

export const dashboardRoutes = [
  {
    path: "/dashboard",
    sidebarName: "Dashboard",
    navbarName: "Material Dashboard",
    icon: Dashboard,
    exact: true,
    component: Loadable({
      loader: () => import("../containers/Dashboard" /* webpackChunkName: "VendorDashboard" */),
      loading,
    }),
  },
  {
    path: "/dashboard/products",
    sidebarName: "Products",
    navbarName: "Products",
    icon: Store,
    component: Loadable({
      loader: () => import("../containers/Product/Products" /* webpackChunkName: "VendorProducts" */),
      loading,
    }),
    dropdown: "product",
    subMenu: [
      {
        path: "/dashboard/products",
        sidebarName: "Products",
        navbarName: "Products",
        icon: GroupWork,
        component: Loadable({
          loader: () => import("../containers/Product/Products" /* webpackChunkName: "VendorProducts" */),
          loading,
        }),
        exact: true,
      },
      {
        path: "/dashboard/products/category",
        sidebarName: "Product Category",
        navbarName: "Product Category",
        icon: GroupWork,
        component: Loadable({
          loader: () => import("../containers/Product/Category" /* webpackChunkName: "VendorCategory" */),
          loading,
        }),
      },
      {
        path: "/dashboard/products/brand",
        sidebarName: "Product Brand",
        navbarName: "Product Brand",
        icon: GroupWork,
        component: Loadable({
          loader: () => import("../containers/Product/Brand" /* webpackChunkName: "VendorBrand" */),
          loading,
        }),
      },
      {
        path: "/dashboard/products/stock",
        sidebarName: "Product Stock",
        navbarName: "Product Stock",
        icon: GroupWork,
        component: Loadable({
          loader: () => import("../containers/Product/Stock" /* webpackChunkName: "VendorStock" */),
          loading,
        }),
      },
    ],
  },
  {
    path: "/dashboard/approve/products",
    sidebarName: "Product Approval",
    navbarName: "Product Approval",
    icon: LocalMail,
    component: Loadable({
      loader: () => import("../containers/Product/Approval" /* webpackChunkName: "VendorApproval" */),
      loading,
    }),
  },
  {
    path: "/dashboard/approved/products",
    sidebarName: "Approved Product",
    navbarName: "Approved Product",
    icon: LocalMail,
    component: Loadable({
      loader: () => import("../containers/Product/Approved" /* webpackChunkName: "VendorApproved" */),
      loading,
    }),
  },
  {
    path: "/dashboard/orders",
    sidebarName: "Orders",
    navbarName: "Orders",
    icon: ShoppingCart,
    component: Loadable({
      loader: () => import("../containers/Orders" /* webpackChunkName: "VendorOrders" */),
      loading,
    }),
  },
  {
    path: "/dashboard/coupons",
    sidebarName: "Discount Coupons",
    navbarName: "Discount Coupons",
    icon: Loyalty,
    component: Loadable({
      loader: () => import("../containers/Coupons" /* webpackChunkName: "VendorCoupons" */),
      loading,
    }),
  },
  {
    path: "/dashboard/slider",
    sidebarName: "Slider",
    navbarName: "Slider",
    icon: Slideshow,
    component: Loadable({
      loader: () => import("../containers/Banners" /* webpackChunkName: "VendorBanners" */),
      loading,
    }),
  },
  {
    path: "/dashboard/settings",
    sidebarName: "Store Settings",
    navbarName: "Store Settings",
    icon: Notifications,
    component: Loadable({
      loader: () => import("../containers/Shops" /* webpackChunkName: "VendorShops" */),
      loading,
    }),
  },
  {
    path: "/dashboard/blog",
    sidebarName: "Blog",
    navbarName: "Blog",
    icon: Store,
    component: Loadable({
      loader: () => import("../containers/Blog/blog" /* webpackChunkName: "VendorBlog" */),
      loading,
    }),
  },
  {
    path: "/dashboard/support",
    sidebarName: "Support Tickets",
    navbarName: "Support Tickets",
    icon: Notifications,
    component: Loadable({
      loader: () => import("../containers/Supports" /* webpackChunkName: "VendorSupports" */),
      loading,
    }),
  },
  {
    path: "/dashboard/user",
    sidebarName: "User Profile",
    navbarName: "Profile",
    icon: Person,
    component: Loadable({
      loader: () => import("../containers/UserProfiles" /* webpackChunkName: "VendorUserProfiles" */),
      loading,
    }),
  },
  { redirect: true, path: "/", to: "/dashboard", navbarName: "Redirect" },
];

export const dropdowns = {
  product: false,
  blog: false,
};
