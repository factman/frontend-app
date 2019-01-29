import React from "react";
import Redirect from "react-router/Redirect";
import Loadable from "react-loadable";
import { userIs, isVerified } from "../components/Auth/AccessControl";
import { PageLoader } from "../components/PageLoader/PageLoader";

const loading = () => <PageLoader display />;

// Vendor Containers
const Dashboard = Loadable({
  loader: () => import("../layouts/Dashboard/Dashboard" /* webpackChunkName: "Dashboard" */),
  loading,
});
const VendorSetup = Loadable({
  loader: () => import("../containers/VendorSetup" /* webpackChunkName: "VendorSetup" */),
  loading,
});

// Admin Containers
const Admin = Loadable({
  loader: () => import("../Admin/LandingPage/layout" /* webpackChunkName: "layout" */),
  loading,
});
const AdminSetup = Loadable({
  loader: () => import("../containers/AdminSetup" /* webpackChunkName: "AdminSetup" */),
  loading,
});

// Customer Containers
const Home = Loadable({
  loader: () => import("../containers/Home" /* webpackChunkName: "Home" */),
  loading,
});
const Cart = Loadable({
  loader: () => import("../containers/Cart" /* webpackChunkName: "Cart" */),
  loading,
});
const Compare = Loadable({
  loader: () => import("../containers/Compare" /* webpackChunkName: "Compare" */),
  loading,
});
const Login = Loadable({
  loader: () => import("../containers/Login" /* webpackChunkName: "Login" */),
  loading,
});
const Page404 = Loadable({
  loader: () => import("../containers/Page404" /* webpackChunkName: "Page404" */),
  loading,
});
const Category = Loadable({
  loader: () => import("../containers/Category" /* webpackChunkName: "Category" */),
  loading,
});
const CategoryProductList = Loadable({
  loader: () => import("../containers/CategoryProductList" /* webpackChunkName: "CategoryProductList" */),
  loading,
});
const Brand = Loadable({
  loader: () => import("../containers/Brand" /* webpackChunkName: "Brand" */),
  loading,
});
const About = Loadable({
  loader: () => import("../containers/AboutPage" /* webpackChunkName: "AboutPage" */),
  loading,
});
const Blogs = Loadable({
  loader: () => import("../containers/BlogPage" /* webpackChunkName: "BlogPage" */),
  loading,
});
const BrandProductList = Loadable({
  loader: () => import("../containers/BrandProductList" /* webpackChunkName: "BrandProductList" */),
  loading,
});
const SingleBlog = Loadable({
  loader: () => import("../containers/SingleBlogPage" /* webpackChunkName: "SingleBlogPage" */),
  loading,
});
const Contact = Loadable({
  loader: () => import("../containers/ContactPage" /* webpackChunkName: "ContactPage" */),
  loading,
});
const SingleProduct = Loadable({
  loader: () => import("../containers/SingleProduct" /* webpackChunkName: "SingleProduct" */),
  loading,
});
const ProductList = Loadable({
  loader: () => import("../containers/ProductList" /* webpackChunkName: "ProductList" */),
  loading,
});
const Profile = Loadable({
  loader: () => import("../containers/ProfilePage" /* webpackChunkName: "ProfilePage" */),
  loading,
});
const LandingPage = Loadable({
  loader: () => import("../containers/LandingPage" /* webpackChunkName: "LandingPage" */),
  loading,
});
const SearchPage = Loadable({
  loader: () => import("../containers/SearchPage" /* webpackChunkName: "SearchPage" */),
  loading,
});
const PolicyPage = Loadable({
  loader: () => import("../containers/PolicyPage" /* webpackChunkName: "PolicyPage" */),
  loading,
});
const TermsPage = Loadable({
  loader: () => import("../containers/TermsPage" /* webpackChunkName: "TermsPage" */),
  loading,
});
const Checkout = Loadable({
  loader: () => import("../containers/Checkout" /* webpackChunkName: "Checkout" */),
  loading,
});

const validateAdmin = (props) => {
  const { location } = props;
  if (userIs(["admin"])) {
    if (isVerified("admin")) {
      return <Admin {...props} />;
    }
    return <Redirect to={{ pathname: "/admin/account-setup", state: { from: location } }} />;
  }
  return <Redirect to={{ pathname: "/login/admin", state: { from: location } }} />;
};

const validateVendor = (props) => {
  const { location } = props;
  if (userIs(["vendor"])) {
    if (isVerified("vendor")) {
      return <Dashboard {...props} />;
    }
    return <Redirect to={{ pathname: "/vendor/account-setup", state: { from: location } }} />;
  }
  return <Redirect to={{ pathname: "/login/vendor", state: { from: location } }} />;
};

const searchValidation = (props) => {
  const { location } = props;
  if (!location.search) {
    return <Redirect to={{ pathname: "/", state: { from: location } }} />;
  }
  return <SearchPage {...props} />;
};

const indexRoutes = [
  /**
   * @description Admin Route Directories.
   */
  {
    path: "/admin/templates",
    name: "EmailTemplate",
    exact: true,
    Component: props => validateAdmin(props),
  },
  {
    path: "/admin/users",
    name: "Admin Users",
    Component: props => validateAdmin(props),
  },
  {
    path: "/admin/currency",
    name: "Currency",
    exact: true,
    Component: props => validateAdmin(props),
  },
  {
    path: "/admin/categories",
    name: "AdminProductCategory",
    exact: true,
    Component: props => validateAdmin(props),
  },
  {
    path: "/admin/transactions",
    name: "Transactions",
    exact: true,
    Component: props => validateAdmin(props),
  },
  {
    path: "/admin/subscribers",
    name: "Subscribers",
    exact: true,
    Component: props => validateAdmin(props),
  },
  {
    path: "/admin/customers",
    name: "Customers",
    exact: true,
    Component: props => validateAdmin(props),
  },
  {
    path: "/admin/messages",
    name: "AdminMessages",
    exact: true,
    Component: props => validateAdmin(props),
  },
  {
    path: "/admin/settings",
    name: "AdminStore",
    exact: true,
    Component: props => validateAdmin(props),
  },
  {
    path: "/admin/products",
    name: "AdminProducts",
    exact: true,
    Component: props => validateAdmin(props),
  },
  {
    path: "/admin/vendors",
    name: "AdminVendors",
    exact: true,
    Component: props => validateAdmin(props),
  },
  {
    path: "/admin/tickets",
    name: "SupportTicket",
    exact: true,
    Component: props => validateAdmin(props),
  },
  {
    path: "/admin/profile",
    name: "AdminProfile",
    exact: true,
    Component: props => validateAdmin(props),
  },
  {
    path: "/admin/coupons",
    name: "DiscountCoupons",
    exact: true,
    Component: props => validateAdmin(props),
  },
  {
    path: "/admin/orders",
    name: "AdminOrder",
    exact: true,
    Component: props => validateAdmin(props),
  },
  {
    path: "/admin/brands",
    name: "AdminBrands",
    exact: true,
    Component: props => validateAdmin(props),
  },
  {
    path: "/admin/blog",
    name: "AdminBlog",
    exact: true,
    Component: props => validateAdmin(props),
  },
  {
    path: "/admin/seo",
    name: "AdminSeo",
    exact: true,
    Component: props => validateAdmin(props),
  },
  {
    path: "/admin",
    name: "Dashboard",
    exact: true,
    Component: props => validateAdmin(props),
  },
  {
    path: "/admin/account-setup",
    name: "AdminAccountSetup",
    exact: true,
    Component: (props) => {
      const { location } = props;
      if (userIs(["admin"])) {
        return <AdminSetup {...props} />;
      }
      return <Redirect to={{ pathname: "/login/admin", state: { from: location } }} />;
    },
  },

  /**
   * @description Vendor Route Directories
   */

  {
    path: "/dashboard/messages",
    name: "Messages",
    exact: true,
    Component: props => validateVendor(props),
  },
  {
    path: "/dashboard/approve/products",
    name: "Product Stock",
    exact: true,
    Component: props => validateVendor(props),
  },
  {
    path: "/dashboard/approved/products",
    name: "Approved Product",
    exact: true,
    Component: props => validateVendor(props),
  },
  {
    path: "/dashboard/products/stock",
    name: "Product Stock",
    exact: true,
    Component: props => validateVendor(props),
  },
  {
    path: "/dashboard/products/category",
    name: "Product Category",
    exact: true,
    Component: props => validateVendor(props),
  },
  {
    path: "/dashboard/products/brand",
    name: "Product Brand",
    exact: true,
    Component: props => validateVendor(props),
  },
  {
    path: "/dashboard/products",
    name: "Products",
    exact: true,
    Component: props => validateVendor(props),
  },
  {
    path: "/dashboard/settings",
    name: "Settings",
    exact: true,
    Component: props => validateVendor(props),
  },
  {
    path: "/dashboard/coupons",
    name: "Coupons",
    exact: true,
    Component: props => validateVendor(props),
  },
  {
    path: "/dashboard/support",
    name: "Support",
    exact: true,
    Component: props => validateVendor(props),
  },
  {
    path: "/dashboard/blog",
    name: "Blog",
    exact: true,
    Component: props => validateVendor(props),
  },
  {
    path: "/dashboard/slider",
    name: "banners",
    exact: true,
    Component: props => validateVendor(props),
  },
  {
    path: "/dashboard/orders",
    name: "Orders",
    exact: true,
    Component: props => validateVendor(props),
  },
  {
    path: "/dashboard/user",
    name: "Users",
    exact: true,
    Component: props => validateVendor(props),
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    exact: true,
    Component: props => validateVendor(props),
  },
  {
    path: "/vendor/account-setup",
    name: "VendorAccountSetup",
    exact: true,
    Component: (props) => {
      const { location } = props;
      if (userIs(["vendor"])) {
        return <VendorSetup {...props} />;
      }
      return <Redirect to={{ pathname: "/login/vendor", state: { from: location } }} />;
    },
  },

  /**
   * @description Customers Route Directories.
   */

  {
    path: "/policy",
    name: "PrivacyPolicy",
    Component: props => <PolicyPage {...props} />,
  },
  {
    path: "/terms",
    name: "TermsConditions",
    Component: props => <TermsPage {...props} />,
  },
  {
    path: "/:vendor/categories",
    name: "Categories",
    Component: props => <Category {...props} />,
  },
  {
    path: "/:vendor/category/:category",
    name: "CategoryProducts",
    Component: props => <CategoryProductList {...props} />,
  },
  {
    path: "/:vendor/products/:productKind",
    name: "ProductList",
    Component: props => <ProductList {...props} />,
  },
  {
    path: "/:vendor/products",
    name: "ProductList",
    Component: props => <ProductList {...props} />,
  },
  {
    path: "/:vendor/product/:product",
    name: "Product",
    Component: props => <SingleProduct {...props} />,
  },
  // {
  //   path: "/vendors",
  //   name: "Vendors",
  //   Component: props => <Vendor {...props} />,
  // },
  // {
  //   path: "/vendor/:vendor",
  //   name: "Vendor",
  //   Component: props => <VendorProductList {...props} />,
  // },
  {
    path: "/:vendor/brands",
    name: "Brands",
    exact: true,
    Component: props => <Brand {...props} />,
  },
  {
    path: "/:vendor/brand/:brand",
    name: "Brand",
    Component: props => <BrandProductList {...props} />,
  },
  {
    path: "/:vendor/blog/:post",
    name: "Blog",
    Component: props => <SingleBlog {...props} />,
  },
  {
    path: "/:vendor/contact",
    name: "Contact",
    exact: true,
    Component: props => <Contact {...props} />,
  },
  {
    path: "/profile",
    name: "CustomerProfile",
    exact: true,
    Component: (props) => {
      const { location } = props;
      return (
        userIs(["customer"])
          ? <Profile {...props} />
          : <Redirect to={{ pathname: "/login/customer", state: { from: location } }} />
      );
    },
  },
  {
    path: "/profile/:link",
    name: "CustomerProfile",
    exact: true,
    Component: (props) => {
      const { location } = props;
      return (
        userIs(["customer"])
          ? <Profile {...props} />
          : <Redirect to={{ pathname: "/login/customer", state: { from: location } }} />
      );
    },
  },
  {
    path: "/cart",
    name: "Cart",
    exact: true,
    Component: props => <Cart {...props} />,
  },
  {
    path: "/checkout",
    name: "Checkout",
    exact: true,
    Component: props => <Checkout {...props} />,
  },
  {
    path: "/:vendor/compare",
    name: "Compare",
    Component: props => <Compare {...props} />,
  },
  {
    path: "/compare",
    name: "Compare",
    exact: true,
    Component: props => <Compare {...props} />,
  },
  {
    path: "/:vendor/blogs",
    name: "Blog",
    Component: props => <Blogs {...props} />,
  },
  {
    path: "/login/customer",
    exact: true,
    name: "CustomerLoginPage",
    Component: (props) => {
      const { location } = props;
      return (
        userIs(["customer"])
          ? <Redirect to={{ pathname: "/profile", state: { from: location } }} />
          : <Login {...props} />
      );
    },
  },
  {
    path: "/login/vendor",
    exact: true,
    name: "VendorLoginPage",
    Component: (props) => {
      const { location } = props;
      return (
        userIs(["vendor"])
          ? <Redirect to={{ pathname: "/dashboard", state: { from: location } }} />
          : <Login {...props} />
      );
    },
  },
  {
    path: "/login/admin",
    exact: true,
    name: "AdminLoginPage",
    Component: (props) => {
      const { location } = props;
      return (
        userIs(["admin"])
          ? <Redirect to={{ pathname: "/admin", state: { from: location } }} />
          : <Login {...props} />
      );
    },
  },
  {
    path: "/about",
    name: "About",
    exact: true,
    Component: props => <About {...props} />,
  },
  {
    path: "/search",
    name: "Search Page",
    Component: props => searchValidation(props),
  },
  {
    path: "/:vendor",
    exact: true,
    name: "FrontStore",
    Component: props => <Home {...props} />,
  },
  {
    path: "/",
    exact: true,
    name: "Landing Page",
    Component: props => <LandingPage {...props} />,
  },
  {
    path: "*",
    name: "Page404",
    Component: props => <Page404 {...props} />,
  },
];

export default indexRoutes;
