import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import basicsStyle from "../../../assets/jss/material-kit-react/views/componentsSections/basicsStyle";
import ProductView from "../../../components/ProductView/ProductView";
import Sidebar from "../../../components/Sidebar/CategoryCard";
import MinSearch from "../../../components/Search/MinSearch";
import AdvanceSearch from "../../../components/Search/AdvanceSearch";
import UsersAuth from "../../../components/Auth/UsersAuth";

class Stage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      priceRange: [1, 2],
      checkedCategories: [],
      checkedBrands: [],
    };

    props.events.on("handleCategories", this.handleCategories.bind(this));
    props.events.on("handleBrands", this.handleBrands.bind(this));
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      priceRange: this.getPriceRange(newProps.products),
    });
  }

  getPriceRange = (products) => {
    const arr = [];

    products.deal.map((deal) => {
      arr.push(deal);
      return null;
    });

    products.latest.map((latest) => {
      arr.push(latest);
      return null;
    });

    products.feature.map((feature) => {
      arr.push(feature);
      return null;
    });

    products.popular.map((popular) => {
      arr.push(popular);
      return null;
    });

    let min = 1;
    let max = 2;
    if (arr.length > 0) {
      const { price } = arr[0];
      min = price.unitPrice;
      max = price.unitPrice;

      for (let i = 0; i < arr.length; i += 1) {
        const v = arr[i].price.unitPrice;
        min = (v < min) ? v : min;
        max = (v > max) ? v : max;
      }

      min = Math.floor((min + 1) / 100) * 100;
      max = Math.ceil((max + 1) / 100) * 100;
    }
    return ([min, max]);
  };

  setPriceRange = (values) => {
    this.setState({ priceRange: values });
  };

  handleCategories = (value) => {
    const { checkedCategories } = this.state;
    const currentIndex = checkedCategories.indexOf(value);
    const newChecked = [...checkedCategories];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checkedCategories: newChecked,
    });
  };

  handleBrands = (value) => {
    const { checkedBrands } = this.state;
    const currentIndex = checkedBrands.indexOf(value);
    const newChecked = [...checkedBrands];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checkedBrands: newChecked,
    });
  };

  render() {
    const { classes, products, shop, events, ...data } = this.props;
    let priceRange = [1, 2];
    priceRange = this.getPriceRange(products);

    const styles = {
      cols: {
        display: "block",
        marginBottom: "30px",
      },
      container: {
        padding: "0px 30px",
      },
      header: {
        borderBottom: "1px solid lightgray",
      },
      bigMore: {
        float: "right", fontSize: "0.4em",
      },
      smallMore: {
        float: "right",
        fontSize: "0.6em",
        marginTop: "-10px",
      },
    };

    const todaysDeal = products.deal ? products.deal : [];
    const featured = products.feature ? products.feature : [];
    const latest = products.latest ? products.latest : [];
    const popular = products.popular ? products.popular : [];

    let content = <div />;

    if (data.categories.length !== 0) {
      const cards = data.categories.filter(category => category.parent === "0");
      content = cards.map(category => (
        <GridItem md={12} sm={6} xs={12} key={category.id}>
          <Sidebar shop={shop} category={category} />
        </GridItem>));
    }

    const { state, props } = this;

    return (
      <div className={classes.sections}>
        <UsersAuth events={events} />
        <div style={styles.container}>
          <div>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={9}>
                <div style={styles.cols}>
                  <MinSearch shop={shop} location="stage" />
                  {todaysDeal.length > 0 ? (
                    <ProductView
                      products={todaysDeal}
                      moreLink={`${shop.vendor}/products/deal`}
                      range={state.priceRange}
                      data={data}
                      events={events}
                      heading="Today's Deals"
                      filters={{
                        categories: state.checkedCategories,
                        brands: state.checkedBrands,
                      }}
                      shop={shop}
                    />)
                    : null}
                  {featured.length > 0 ? (
                    <ProductView
                      products={featured}
                      moreLink={`${shop.vendor}/products/featured`}
                      range={state.priceRange}
                      data={data}
                      events={events}
                      heading="Featured Products"
                      filters={{
                        categories: state.checkedCategories,
                        brands: state.checkedBrands,
                      }}
                      shop={shop}
                    />)
                    : null}
                  {latest.length > 0 ? (
                    <ProductView
                      products={latest}
                      moreLink={`${shop.vendor}/products/latest`}
                      range={state.priceRange}
                      data={data}
                      events={events}
                      heading="Latest Products"
                      filters={{
                        categories: state.checkedCategories,
                        brands: state.checkedBrands,
                      }}
                      shop={shop}
                    />)
                    : null}
                  {popular.length > 0 ? (
                    <ProductView
                      products={popular}
                      moreLink={`${shop.vendor}/products/popular`}
                      range={state.priceRange}
                      data={data}
                      events={events}
                      heading="Popular Products"
                      filters={{
                        categories: state.checkedCategories,
                        brands: state.checkedBrands,
                      }}
                      shop={shop}
                    />)
                    : null}
                </div>
              </GridItem>
              <GridItem xs={12} sm={12} md={3}>
                <div style={styles.cols}>
                  <MinSearch location="sidebar" shop={shop} />
                  <AdvanceSearch
                    shop={shop}
                    slideRange={{ min: priceRange[0], max: priceRange[1] }}
                    slideState={state.priceRange}
                    slideStep={(priceRange[1] / 100)}
                    data={data}
                    slideEvent={this.setPriceRange}
                    checkedCategories={state.checkedCategories}
                    checkedBrands={state.checkedBrands}
                    events={props.events}
                  />
                  <GridContainer spacing={16}>
                    {content}
                  </GridContainer>
                </div>
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(basicsStyle)(Stage);
