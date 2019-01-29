// import parseDomain from "parse-domain";
import { createBrowserHistory } from "history";

export const getBaseUrl = () => {
  if (process.env.NODE_ENV === "development") {
    return process.env.DEV_BASE_DOMAIN;
  }
  return process.env.PROD_BASE_DOMAIN;
};

export const nonDomain = ["login", "compare", "cart", "profile", "checkout", "about", "contact", "dashboard", "admin", "vendor", "terms", "policy", "search", "home"];

export const writeDevUrl = () => {
  const hist = createBrowserHistory();
  const urlObject = window.location;
  const vendor = urlObject.pathname.split("/")[1];
  if (!nonDomain.includes(vendor)) {
    const url = `${urlObject.pathname}`;
    const paths = url.split("/").filter(path => (path !== ""));
    hist.location.shopLocation = {
      vendor,
      subDomain: urlObject.pathname.split("/")[1],
      url,
      paths,
    };
  }
  return (hist);
};

export const getShopLocation = () => {
  const urlObject = window.location;
  const vendor = urlObject.pathname.split("/")[1];
  const url = `${urlObject.pathname}`;
  const paths = url.split("/").filter(path => (path !== ""));
  return {
    vendor,
    subDomain: urlObject.pathname.split("/")[1],
    url,
    paths,
  };
};

// const writeProdUrl = () => {
//   const subdomain = parseDomain(window.location.href);
//   if (subdomain.subdomain !== "") {
//     const urlObject = Object.assign({}, window.location, subdomain);
//     if (urlObject.pathname !== "/") {
//       const url = `/${urlObject.subdomain}${urlObject.pathname}`;
//       const paths = url.split("/").filter(path => (path !== ""));
//       const shopLocation = {
//         vendor: urlObject.subdomain,
//         subDomain: urlObject.subdomain,
//         url,
//         paths,
//       };
//       return ({ location: { pathname: url, shopLocation } });
//     }
//     const url = `/${urlObject.subdomain}`;
//     const paths = url.split("/").filter(path => (path !== ""));
//     const shopLocation = {
//       vendor: urlObject.subdomain,
//       subDomain: urlObject.subdomain,
//       url,
//       paths,
//     };
//     return ({ location: { pathname: url, shopLocation } });
//   }
//   const urlObject = Object.assign({}, window.location, subdomain);
//   const url = `${urlObject.pathname}`;
//   const paths = url.split("/").filter(path => (path !== ""));
//   const shopLocation = {
//     vendor: urlObject.pathname.split("/")[1],
//     subDomain: urlObject.pathname.split("/")[1],
//     url,
//     paths,
//   };
//   return ({ location: { pathname: url, shopLocation } });
// };

export const rewriteUrl = () => {
  if (process.env.NODE_ENV === "development") {
    return (writeDevUrl());
  }
  return (writeDevUrl());
};
