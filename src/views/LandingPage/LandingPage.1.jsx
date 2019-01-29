import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
import FormControl from "@material-ui/core/FormControl";
import Typography from "@material-ui/core/Typography";
import Slide from "@material-ui/core/Slide";

// @material-ui/icons

// core components
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import Button from "../../components/CustomButtons/Button";
import LandingPageMobile from "../../components/Header/LandingPageMobile";
import Parallax from "../../components/Parallax/Parallax";
import { PageLoader } from "../../components/PageLoader/PageLoader";

// Sections for this page
import ListSearch from "./Sections/ListSearch";
import LandingPageLinks from "../../components/Header/LandingPageLinks";
// import bgImage from "../../assets/img/landing-bg 2.jpg";
import Validator from "../../helpers/validator";
import LinkManager from "../../helpers/linkManager";

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      currentTop: 0,
      vendors: [],
      products: [],
      categories: [],
      brands: [],
      blogs: [],
      checked: false,
      loader: "none",
    };
    this.searchPanel = React.createRef();
    this.websiteOrigin = window.location.origin;
  }

  componentDidMount() {
    this.setState({
      currentTop: this.searchPanel.current !== undefined ? this.searchPanel.current : 0,
    });
    window.addEventListener("scroll", this.getCurrentTop);
  }

  componentWillReceiveProps(newsProps) {
    if (Validator.propertyExist(newsProps, "search", "getVendors")) {
      if (typeof newsProps.search.getVendors === "object") {
        this.setState({
          vendors: newsProps.search.getVendors
            .filter(vendor => !vendor.domainName.startsWith("0x"))
            .map(vendor => ({
              id: vendor.id,
              type: "vendor",
              title: vendor.businessName || "Business Name",
              description: vendor.frontend.description,
              image: vendor.frontend.logo,
              link: `${this.websiteOrigin}/${vendor.domainName}`,
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
              description: product.descriptionShort,
              image: product.images.image_lg.includes("default-product-lg-image.jpg")
                ? `${this.websiteOrigin}/assets/img/default-product.jpg` : product.images.image_lg,
              link: `${this.websiteOrigin}/${product.vendor.domainName}/product/${LinkManager.parse(product.name, product.id)}`,
            })),
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
              image: Validator.propertyExist(category, "icon")
                ? `${this.websiteOrigin}/assets/img/Shopping-Basket-Icon.ico` : category.icon,
              link: `${this.websiteOrigin}/${category.vendor.domainName}/category/${LinkManager.parse(category.name, category.id)}`,
            })),
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
              image: Validator.propertyExist(brand, "icon")
                ? `${this.websiteOrigin}/assets/img/Brand.png` : brand.icon,
              link: `${this.websiteOrigin}/${brand.vendor.domainName}/brand/${LinkManager.parse(brand.name, brand.id)}`,
            })),
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
              link: `${this.websiteOrigin}/${blog.vendor.domainName}/blog/${LinkManager.parse(blog.title, blog.id)}`,
            })),
        });
      }
    }
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.getCurrentTop);
  }

  onChangeHandler = (e) => {
    this.setState({
      search: e.target.value,
    });
  }

  onEnterKey = (e) => {
    if (e.key === "Enter") {
      this.searchMarcketPlace();
    }
  }

  getCurrentTop = () => {
    if (this.searchPanel.current !== null) {
      this.setState({
        currentTop: this.searchPanel.current.getBoundingClientRect().top,
      });
    }
  }

  getChildSearchUpdate = (newSearch) => {
    this.setState({
      search: newSearch,
    });
  }

  searchMarcketPlace = () => {
    const { search } = this.state;
    if (search.length > 0) {
      const {
        fetchVendors,
        fetchProducts,
        fetchCategories,
        fetchBrands,
        fetchBlogs,
      } = this.props;
      fetchVendors();
      fetchProducts();
      fetchCategories();
      fetchBrands();
      fetchBlogs();
      this.setState({
        checked: true,
        loader: "block",
      });
    }
  }

  render() {
    const { classes, ...rest } = this.props;
    const {
      search,
      currentTop,
      vendors,
      products,
      categories,
      brands,
      blogs,
      checked,
      loader,
    } = this.state;
    const all = vendors.concat(products, categories, brands, blogs);
    return (
      <div>
        <PageLoader display={loader} />
        <Header
          brand="&nbsp;"
          leftLinks={<LandingPageLinks user="customer" />}
          rightLinks={<LandingPageMobile user="customer" />}
          color="white"
          parentSearchUpdate={newSearch => this.getChildSearchUpdate(newSearch)}
          {...rest}
          mainPageSearch="exit"
          currentSearchValue={search}
          searchPanelTop={currentTop}
          querySearchMarketPlace={() => this.searchMarcketPlace()}
        />
        <Parallax filter style={{ backgroundPosition: "center" }} image={bgImage}>
          <div className={classes.container}>
            <GridContainer className={classes.constainerMaxWidth}>
              <GridItem xs={12} sm={12} md={12} className={classes.centerAlign}>
                <Typography variant="display3" className={classes.title}>
                  Marketplace
                </Typography>
                <FormControl fullWidth className={classes.margin}>
                  <input
                    placeholder="Search for any products or store"
                    type="text"
                    className={classes.inputSearch}
                    value={search}
                    onChange={this.onChangeHandler}
                    onKeyPress={this.onEnterKey}
                  />
                </FormControl>
                <Button
                  size="lg"
                  color="primary"
                  onClick={this.searchMarcketPlace}
                  disabled={search.length === 0}
                >
                  Search Marketplace
                </Button>
              </GridItem>
            </GridContainer>
          </div>
        </Parallax>
        <Slide
          direction="up"
          in={checked}
          mountOnEnter
          unmountOnExit
        >
          <div
            className={classNames({
              [classes.main]: true,
              [classes.mainRaised]: true,
            })}
          >
            <div ref={this.searchPanel}>
              <ListSearch
                vendors={vendors}
                products={products}
                categories={categories}
                brands={brands}
                blogs={blogs}
                all={all}
                search={search}
              />
            </div>
          </div>
        </Slide>
        <Footer />
      </div>
    );
  }
}

export default LandingPage;
