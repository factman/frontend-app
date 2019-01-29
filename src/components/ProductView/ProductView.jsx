import React from "react";
import Link from "react-router-dom/Link";
import withStyles from "@material-ui/core/styles/withStyles";
import More from "@material-ui/icons/ViewList";
import Hidden from "@material-ui/core/Hidden";

import Button from "../CustomButtons/Button";
import basicsStyle from "../../assets/jss/material-kit-react/views/componentsSections/basicsStyle";
import GridContainer from "../Grid/GridContainer";
import GridItem from "../Grid/GridItem";
import ProductList from "./ProductList";

class ProductView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { products, heading, moreLink, range, events, data, filters, all, shop } = this.props;

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
        fontSize: "0.5em",
        marginTop: "0px",
      },
      productArea: {
        padding: "30px 0px",
      },
    };

    let boxProducts = [];
    try {
      if (products.length > 0) {
        boxProducts = products.filter(product => (
          product.price.unitPrice >= range[0] && product.price.unitPrice <= range[1]
        ));
        if (filters.categories.length > 0) {
          boxProducts = boxProducts.filter(product => (
            (product.category.main && product.category.main.id
            === filters.categories[filters.categories.indexOf(product.category.main.id)])
          || (product.category.sub && product.category.sub.id
            === filters.categories[filters.categories.indexOf(product.category.sub.id)])
          ));
        }
        if (filters.brands.length > 0) {
          boxProducts = boxProducts.filter(product => (
            product.brand.id === filters.brands[filters.brands.indexOf(product.brand.id)]
          ));
        }
        boxProducts = boxProducts.slice(0, ((all) ? undefined : 8));
        boxProducts.sort((a, b) => 0.5 - Math.random());
      }
    } catch (ex) {
      console.log(ex.message);
    }

    return (
      <div>
        <Hidden smDown>
          <h2 style={styles.header}>
            {heading}
            {(moreLink)
              ? (
                <Link to={moreLink}>
                  <Button color="primary" size="sm" round style={styles.bigMore}>
                    <More />
                    More...
                  </Button>
                </Link>)
              : null}
          </h2>
        </Hidden>
        <Hidden mdUp>
          <h3 style={styles.header}>
            {`${heading} `}
            {(moreLink)
              ? (
                <Link to={moreLink}>
                  <Button color="primary" size="sm" round style={styles.smallMore}>
                    <More />
                    More...
                  </Button>
                </Link>)
              : null}
          </h3>
        </Hidden>
        <GridContainer style={styles.productArea}>
          {boxProducts.map(product => (
            <GridItem
              xs={12}
              // sm={6}
              // md={4}
              // lg={3}
              key={product.id}
            >
              <ProductList shop={shop} product={product} data={data} events={events} />
            </GridItem>))}
        </GridContainer>
      </div>
    );
  }
}

export default withStyles(basicsStyle)(ProductView);
