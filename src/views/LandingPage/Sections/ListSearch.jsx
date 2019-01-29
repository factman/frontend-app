import React from "react";
import Link from "react-router-dom/Link";
import PropTypes from "prop-types";
// @material-ui/core components
// import IconButton from "@material-ui/core/IconButton";
// import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import SwipeableViews from "react-swipeable-views";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import SearchIcon from "@material-ui/icons/Search";
import Typography from "@material-ui/core/Typography";
import isEqual from "lodash/isEqual";
import StarRatings from "react-star-ratings";
import Paper from "@material-ui/core/Paper";
import Hidden from "@material-ui/core/Hidden";
// import FormControl from "@material-ui/core/FormControl";
import { PageLoader } from "../../../components/PageLoader/PageLoader";
import Footer from "../../../components/Footer/Footer";

// core components
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import Validator from "../../../helpers/validator";
import { getAverageReview } from "../../../helpers/logic";
import LinkManager from "../../../helpers/linkManager";
import searchLogo from "../../../assets/img/white-favicon.png";
import Header from "../../../components/Header/Header";
import LandingPageLinks from "../../../components/Header/LandingPageLinks";
import LandingPageMobile from "../../../components/Header/LandingPageMobile";
import SearchDataStructure from "./components/SearchDataStructure";
import Pagination from "../../../bezopComponents/Table/Pagination";
import { primaryBackground, secondaryBackground, primaryColor } from "../../../assets/jss/material-kit-react";
import CustomInput from "../../../components/CustomInput/CustomInput";
import Collections from "./Collections";

function TabContainer({ children, dir }) {
  return (
    <Typography
      component="div"
      dir={dir}
      style={{ padding: "20px" }}
    >
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
};

class ListSearch extends React.Component {
  constructor(props) {
    super(props);
    this.search = this.decodeSearch(props.location.search);
    this.state = {
      value: 0,
      vendors: [],
      brands: [],
      categories: [],
      blogs: [],
      products: [],
      search: this.search,
      searchText: this.search,
      loader: "block",
      mainSearch: {},
      page: 0,
      rowsPerPage: 5,
    };
    this.websiteOrigin = window.location.origin;
  }

  componentDidMount() {
    this.searchApiCall(this.props);
  }

  componentWillReceiveProps(newsProps) {
    const { search } = this.state;

    if (search !== this.decodeSearch(newsProps.location.search)) {
      window.scrollTo(0, 0);
      this.setState({ search: this.decodeSearch(newsProps.location.search), loader: "block" }, this.searchApiCall(newsProps));
    } else {
      if (Validator.propertyExist(newsProps, "search", "getVendors")) {
        if (typeof newsProps.search.getVendors === "object") {
          this.setState({
            vendors: newsProps.search.getVendors
              .filter((vendor) => {
                try {
                  if (vendor.domainName) {
                    return !vendor.domainName.startsWith("0x");
                  }
                  return false;
                } catch (err) {
                  return false;
                }
              })
              .map(vendor => ({
                id: vendor.id,
                type: "vendor",
                title: vendor.businessName || "Business Name",
                description: vendor.frontend.description,
                image: vendor.frontend.logo,
                link: `/${vendor.domainName}`,
              })),
            loader: "none",
          });
        }
      }
      if (Validator.propertyExist(newsProps, "search", "getProducts")) {
        if (typeof newsProps.search.getProducts === "object") {
          this.setState({
            products: newsProps.search.getProducts
              .filter(product => product.vendor !== null
              && Validator.propertyExist(product, "vendor", "domainName"))
              .map(product => ({
                id: product.id,
                type: "product",
                title: product.name,
                rating: getAverageReview(product.review),
                description: product.descriptionShort,
                image: product.images.image_lg.includes("default-product-lg-image.jpg")
                  ? `${this.websiteOrigin}/assets/img/default-product.jpg` : product.images.image_lg,
                link: `/${product.vendor.domainName}/product/${LinkManager.parse(product.name, product.id)}`,
              })),
            loader: "none",
          });
        }
      }
      if (Validator.propertyExist(newsProps, "search", "getCategories")) {
        if (typeof newsProps.search.getCategories === "object") {
          this.setState({
            categories: newsProps.search.getCategories
              .filter(category => category.vendor !== null
              && Validator.propertyExist(category, "vendor", "domainName"))
              .map(category => ({
                id: category.id,
                type: "category",
                title: category.name,
                description: category.description,
                image: !Validator.propertyExist(category, "icon")
                  ? `${this.websiteOrigin}/assets/img/Shopping-Basket-Icon.ico` : category.icon,
                link: `/${category.vendor.domainName}/category/${LinkManager.parse(category.name, category.id)}`,
              })),
            loader: "none",
          });
        }
      }
      if (Validator.propertyExist(newsProps, "search", "getBrands")) {
        if (typeof newsProps.search.getBrands === "object") {
          this.setState({
            brands: newsProps.search.getBrands
              .filter(brand => brand.vendor !== null
              && Validator.propertyExist(brand, "vendor", "domainName"))
              .map(brand => ({
                id: brand.id,
                type: "brand",
                title: brand.name,
                description: brand.description,
                image: !Validator.propertyExist(brand, "icon")
                  ? `${this.websiteOrigin}/assets/img/Brand.png` : brand.icon,
                link: `/${brand.vendor.domainName}/brand/${LinkManager.parse(brand.name, brand.id)}`,
              })),
            loader: "none",
          });
        }
      }
      if (Validator.propertyExist(newsProps, "search", "getBlogs")) {
        if (typeof newsProps.search.getBlogs === "object") {
          this.setState({
            blogs: newsProps.search.getBlogs
              .filter(blog => blog.vendor !== null
              && Validator.propertyExist(blog, "vendor", "domainName"))
              .map(blog => ({
                id: blog.id,
                type: "blog",
                title: blog.title,
                description: blog.summary,
                link: `/${blog.vendor.domainName}/blog/${LinkManager.parse(blog.title, blog.id)}`,
              })),
            loader: "none",
          });
        }
      }
    }
  }

  decodeSearch = searchQuery => decodeURIComponent(searchQuery.replace("?q=", "").replace(/\+/g, " "));

  searchApiCall = (Props) => {
    const {
      fetchVendors,
      fetchProducts,
      fetchCategories,
      fetchBrands,
      fetchBlogs,
      location,
    } = Props;

    fetchProducts(location.search);
    fetchVendors(location.search);
    fetchBrands(location.search);
    fetchCategories(location.search);
    fetchBlogs(location.search);
  };

  onChangeHandler = (e) => {
    this.setState({
      searchText: e.target.value,
    });
  }

  onEnterKey = (e) => {
    if (e.key === "Enter") {
      this.searchMarcketPlace();
    }
  }

  rowsPerPageHandler = (rowsPerPage) => {
    this.setState({ rowsPerPage });
  }

  pageHandler = (page) => {
    this.setState({ page });
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = (index) => {
    this.setState({ value: index });
  };

  searchMarcketPlace = () => {
    const { searchText } = this.state;
    const { props } = this;
    if (searchText.length > 0) {
      // window.location.href = `${this.websiteOrigin}/search?q=${encodeURIComponent(searchText)}`;
      window.scrollTo(0, 0);
      // this.setState({ loader: "block" }, this.searchApiCall(props));
      props.history.push(`/search?q=${encodeURIComponent(searchText)}`);
    }
  }

  viewItemDetails = (item) => {
    this.setState({ mainSearch: item });
  }

  render() {
    const {
      classes,
      theme,
      location,
      ...rest
    } = this.props;

    const {
      vendors,
      products,
      categories,
      brands,
      blogs,
      value,
      search,
      searchText,
      loader,
      mainSearch,
      rowsPerPage,
      page,
    } = this.state;

    const slideContents = ["Baby", "Beauty", "Games", "Fitness", "Phone", "Sports", "Tools", "Toys"];

    const all = value === 0 ? products.concat(vendors, categories, brands, blogs) : [];
    const displayVendors = value === 1 ? vendors : [];
    const displayBlogs = value === 5 ? blogs : [];
    const displayProducts = value === 2 ? products : [];
    const displayCategories = value === 3 ? categories : [];
    const displayBrands = value === 4 ? brands : [];
    let currentData;

    switch (value) {
      case 0:
        currentData = all;
        break;
      case 1:
        currentData = displayVendors;
        break;
      case 2:
        currentData = displayProducts;
        break;
      case 3:
        currentData = displayCategories;
        break;
      case 4:
        currentData = displayBrands;
        break;
      case 5:
        currentData = displayBlogs;
        break;
      default:
        currentData = [];
        break;
    }

    const [firstObj] = currentData;
    let displayHyperSearch;
    if (isEqual(mainSearch, {}) === true) {
      displayHyperSearch = firstObj !== undefined ? firstObj : mainSearch;
    } else {
      displayHyperSearch = mainSearch !== undefined ? mainSearch : {};
    }

    return (
      <div>
        <div
          style={{
            backgroundColor: "#ffffff",
            minHeight: "90vh",
          }}
        >
          <PageLoader display={loader} />
          <div
            className={classes.root}
            style={{
              ...primaryBackground,
              paddingLeft: "5%",
              paddingRight: "5%",
            }}
          >
            <AppBar
              position="static"
              color="default"
            >
              <GridContainer
                style={{
                  paddingTop: 10,
                }}
              >
                <GridItem xs={12} sm={12} md={2}>
                  <Link to="/">
                    <img
                      src={searchLogo}
                      alt="search-logo"
                      style={{
                        height: "40px",
                        display: "flex",
                        marginBottom: "30px",
                      }}
                    />
                  </Link>
                  <Hidden mdUp>
                    <div style={{
                      float: "right",
                      position: "absolute",
                      top: "-5px",
                      right: "0px",
                    }}
                    >
                      <Header
                        color="transparent"
                        brand=""
                        nologo
                        blackColor
                        leftLinks={<LandingPageLinks user="customer" />}
                        rightLinks={<LandingPageMobile user="customer" />}
                        changeColorOnScroll={{
                          height: 1500,
                          color: "white",
                        }}
                        {...rest}
                      />
                    </div>
                  </Hidden>
                </GridItem>
                <GridItem
                  xs={12}
                  sm={12}
                  md={6}
                  className={classes.specialSearch}
                >
                  {/* <FormControl fullWidth className={classes.margin}>
                    <Input
                      placeholder="Search for any products or store"
                      type="text"
                      className={classes.inputSearch}
                      classes={{
                        underline: classes.cssUnderline,
                      }}
                      value={search}
                      onChange={this.onChangeHandler}
                      onKeyPress={this.onEnterKey}
                      endAdornment={
                        (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="Click to Search"
                              onClick={this.searchMarcketPlace}
                            >
                              <Search style={{ color: "#5fb8f0" }} />
                            </IconButton>
                          </InputAdornment>
                        )
                      }
                    />
                  </FormControl> */}
                  <CustomInput
                    id="regular"
                    formControlProps={{
                      fullWidth: true,
                      style: {
                        margin: "0px",
                        padding: "0px",
                      },
                    }}
                    inputProps={{
                      placeholder: "Search for any products or store",
                      type: "search",
                      value: searchText,
                      onChange: this.onChangeHandler,
                      onKeyPress: this.onEnterKey,
                      classes: {
                        underline: classes.cssUnderline,
                      },
                      style: {
                        backgroundColor: "rgb(249, 249, 249)",
                        padding: "15px 20px 10px",
                        position: "relative",
                        display: "flex",
                        margin: "auto",
                        width: "100%",
                        borderRadius: "100px",
                        fontSize: "1em",
                        boxShadow: "0px 1px 5px rgba(0,0,0,0.2)",
                        overflow: "hidden",
                      },
                      endAdornment: (
                        <InputAdornment position="end">
                          <SearchIcon
                            style={{
                              ...secondaryBackground,
                              color: "white",
                              padding: "28px 50px 35px 20px",
                              margin: "-30px -24px -12px 0px",
                              zIndex: "10",
                              cursor: "pointer",
                            }}
                            aria-label="Click to Search"
                            onClick={this.searchMarcketPlace}
                          />
                        </InputAdornment>),
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <Hidden smDown>
                    <Header
                      color="transparent"
                      brand=""
                      nologo
                      blackColor
                      leftLinks={<LandingPageLinks user="customer" />}
                      rightLinks={<LandingPageMobile user="customer" />}
                      changeColorOnScroll={{
                        height: 1500,
                        color: "white",
                      }}
                      {...rest}
                    />
                  </Hidden>
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={8}>
                  <Tabs
                    value={value}
                    onChange={this.handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    scrollable
                    scrollButtons="on"
                    fullWidth
                    className={classes.marginDynamic}
                    classes={{
                      root: classes.tabsRoot,
                      indicator: classes.selectedButton,
                    }}
                  >
                    <Tab label="All" classes={{ root: classes.tabRoot, label: classes.labelFontSmall, selected: classes.tabSelected }} />
                    <Tab label="Vendors" classes={{ root: classes.tabRoot, label: classes.labelFontSmall, selected: classes.tabSelected }} />
                    <Tab label="Products" classes={{ root: classes.tabRoot, label: classes.labelFontSmall, selected: classes.tabSelected }} />
                    <Tab label="Categories" classes={{ root: classes.tabRoot, label: classes.labelFontSmall, selected: classes.tabSelected }} />
                    <Tab label="Brands" classes={{ root: classes.tabRoot, label: classes.labelFontSmall, selected: classes.tabSelected }} />
                    <Tab label="Blogs" classes={{ root: classes.tabRoot, label: classes.labelFontSmall, selected: classes.tabSelected }} />
                  </Tabs>
                </GridItem>
              </GridContainer>
            </AppBar>
          </div>
          <div className={classes.marginDynamic}>
            <GridContainer justify="center" className={classes.containerMaxWidth}>
              <GridItem xs={12} sm={12} md={8}>
                <div style={{ padding: "20px", paddingBottom: "0px" }}>
                  <Typography
                    variant="subheading"
                  >
                    Search Result&nbsp;:&nbsp;
                    <Typography
                      style={{ display: "inline-block", color: primaryColor, fontWeight: "bold" }}
                    >
                      {search}
                    </Typography>
                  </Typography>
                </div>
                <SwipeableViews
                  axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                  index={value}
                  onChangeIndex={this.handleChangeIndex}
                >
                  <TabContainer dir={theme.direction}>
                    <SearchDataStructure
                      displayItems={all}
                      classes={classes}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      viewItemDetails={this.viewItemDetails}
                    />
                  </TabContainer>
                  <TabContainer dir={theme.direction}>
                    <SearchDataStructure
                      displayItems={displayVendors}
                      classes={classes}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      viewItemDetails={this.viewItemDetails}
                    />
                  </TabContainer>
                  <TabContainer dir={theme.direction}>
                    <SearchDataStructure
                      displayItems={displayProducts}
                      classes={classes}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      viewItemDetails={this.viewItemDetails}
                    />
                  </TabContainer>
                  <TabContainer dir={theme.direction}>
                    <SearchDataStructure
                      displayItems={displayCategories}
                      classes={classes}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      viewItemDetails={this.viewItemDetails}
                    />
                  </TabContainer>
                  <TabContainer dir={theme.direction}>
                    <SearchDataStructure
                      displayItems={displayBrands}
                      classes={classes}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      viewItemDetails={this.viewItemDetails}
                    />
                  </TabContainer>
                  <TabContainer dir={theme.direction}>
                    <SearchDataStructure
                      displayItems={displayBlogs}
                      classes={classes}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      viewItemDetails={this.viewItemDetails}
                    />
                  </TabContainer>
                </SwipeableViews>
              </GridItem>
              <GridItem xs={12} sm={12} md={4}>
                {
                  Validator.propertyExist(displayHyperSearch, "title")
                    ? (
                      <Paper elevation={2} style={{ marginTop: 70, padding: 15 }}>
                        <GridContainer>
                          {
                            Validator.propertyExist(displayHyperSearch, "image")
                              ? (
                                <GridItem xs={12}>
                                  <img
                                    src={displayHyperSearch.image}
                                    alt={mainSearch.name}
                                    style={{ width: "100%" }}
                                  />
                                </GridItem>
                              ) : null
                          }
                          <GridItem xs={12}>
                            <Link to={displayHyperSearch.link}>
                              <Typography
                                variant="title"
                                align="justify"
                              >
                                {displayHyperSearch.title}
                              </Typography>
                            </Link>
                            {
                              Validator.propertyExist(displayHyperSearch, "rating")
                                ? (
                                  <div style={{ paddingTop: 10 }}>
                                    <StarRatings
                                      rating={displayHyperSearch.rating}
                                      starRatedColor="gold"
                                      numberOfStars={5}
                                      starDimension="15px"
                                      starSpacing="0px"
                                      name="rating"
                                    />
                                    <span>
                                      &nbsp;
                                      {displayHyperSearch.rating.toFixed(2) === 1.00 ? "1 star " : `${displayHyperSearch.rating.toFixed(2)} stars`}
                                    </span>
                                  </div>
                                ) : null
                            }
                            <Typography
                              variant="body1"
                              align="justify"
                              style={{ paddingTop: 10 }}
                            >
                              {displayHyperSearch.description}
                            </Typography>
                          </GridItem>
                        </GridContainer>
                      </Paper>
                    ) : null
                }
              </GridItem>
            </GridContainer>
            <Collections data={slideContents} />
          </div>
        </div>
        <Pagination
          data={currentData}
          rowsPerPageHandler={this.rowsPerPageHandler}
          pageHandler={this.pageHandler}
        />
        <Footer greyBg />
      </div>
    );
  }
}

export default ListSearch;
