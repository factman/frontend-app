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
import DetailView from "../../../components/ProductView/DetailView";
import UsersAuth from "../../../components/Auth/UsersAuth";

class Stage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      priceRange: [1, 2],
      checkedCategories: [],
      checkedBrands: [],
    };

    const { events } = this.props;

    events.on("handleCategories", this.handleCategories.bind(this));
    events.on("handleBrands", this.handleBrands.bind(this));
  }

  componentWillReceiveProps(newProps) {
    const { singleProduct, brandId, categoryId } = newProps;
    if (!singleProduct) {
      let priceRange = [1, 2];
      const checkedBrands = [];
      const checkedCategories = [];

      if (newProps.products.length > 0) {
        priceRange = this.getPriceRange(newProps.products);
      }
      if (brandId !== "" && brandId !== undefined) {
        checkedBrands.push(brandId);
      }
      if (categoryId !== "" && categoryId !== undefined) {
        checkedCategories.push(categoryId);
      }
      this.setState({ priceRange, checkedBrands, checkedCategories });
    }
  }

  setPriceRange = (values) => {
    this.setState({ priceRange: values });
  };

  getPriceRange = (arr) => {
    let min = 1;
    let max = 2;
    if (arr.length > 0) {
      const { price } = arr[0];
      min = price.unitPrice;
      max = price.unitPrice;

      arr.forEach((ar) => {
        const v = ar.price.unitPrice;
        min = (v < min) ? v : min;
        max = (v > max) ? v : max;
      });

      min = Math.floor((min + 1) / 10) * 10;
      max = Math.ceil((max + 1) / 10) * 10;
    }
    return ([min, max]);
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

  render() {
    const { classes, events, dispatch, customerReview, ...data } = this.props;
    const {
      priceRange,
      checkedCategories,
      checkedBrands,
    } = this.state;

    let range = [1, 2];

    if (!data.singleProduct) {
      range = (data.products.length > 0) ? this.getPriceRange(data.products) : [1, 2];
    }

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

    let content = <div />;

    if (!data.singleProduct) {
      if (data.categories.length !== 0) {
        const cards = data.categories.filter(category => category.parent === "0");
        content = cards.map(category => (
          <GridItem md={12} sm={6} xs={12} key={category.id}>
            <Sidebar shop={data.shop} category={category} />
          </GridItem>));
      }
    }

    return (
      <div className={classes.sections}>
        <div style={styles.container}>
          <div>
            <UsersAuth events={events} />
            <GridContainer justify="center">
              {(data.singleProduct)
                ? (
                  <GridItem sm={12}>
                    <div style={styles.cols}>
                      <DetailView
                        data={data}
                        product={data.product}
                        events={events}
                        dispatch={dispatch}
                        customerReview={customerReview}
                      />
                    </div>
                  </GridItem>
                )
                : (
                  <GridItem xs={12} sm={12} md={9}>
                    <div style={styles.cols}>
                      <MinSearch location="stage" />
                      <ProductView
                        products={data.products}
                        range={priceRange}
                        data={data}
                        events={events}
                        all
                        heading={data.heading}
                        filters={{
                          categories: checkedCategories,
                          brands: checkedBrands,
                        }}
                      />
                    </div>
                  </GridItem>
                )
                  }

              {(data.singleProduct)
                ? null
                : (
                  <GridItem xs={12} sm={12} md={3}>
                    <div style={styles.cols}>
                      <MinSearch location="sidebar" />
                      <AdvanceSearch
                        slideRange={{ min: range[0], max: range[1] }}
                        slideState={priceRange}
                        slideStep={(range[1] / range[0])}
                        data={data}
                        slideEvent={this.setPriceRange}
                        checkedCategories={checkedCategories}
                        checkedBrands={checkedBrands}
                        events={events}
                      />
                      <GridContainer spacing={16}>
                        {content}
                      </GridContainer>
                    </div>
                  </GridItem>
                )
                  }
            </GridContainer>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(basicsStyle)(Stage);
