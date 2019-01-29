import React from "react";
import Link from "react-router-dom/Link";
import withStyles from "@material-ui/core/styles/withStyles";
import StarRatings from "react-star-ratings";
import Typography from "@material-ui/core/Typography";
import Description from "@material-ui/icons/Description";
import Assessment from "@material-ui/icons/Assessment";
import Star from "@material-ui/icons/Star";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import LinkManager from "../../helpers/linkManager";
import NavPills from "../NavPills/NavPills";

const styles = theme => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "50%",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  iconPositionBottom: {
    verticalAlign: "bottom",
  },
});

class ProductInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { classes, product } = this.props;

    return (
      <div className={classes.root}>
        <NavPills
          alignCenter
          tabs={[
            {
              tabButton: "Description",
              tabContent: (
                <Typography>
                  {product.descriptionLong}
                </Typography>
              ),
              tabIcon: () => (
                <Description
                  className={classes.iconPositionBottom}
                />),
            },
            {
              tabButton: "Specifications",
              tabContent: (
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell numeric>
                      Brand:&nbsp;
                      </TableCell>
                      <TableCell>
                        {(product.brand) ? (
                          <Link to={`/${product.vendor.domainName}/brand/${LinkManager.parse(product.brand.name, product.id)}`}>
                            {product.brand.name}
                          </Link>)
                          : null}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell numeric>
                      Length:&nbsp;
                      </TableCell>
                      <TableCell>
                        {product.shippingDetails.length}
                      &nbsp;Inches
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell numeric>
                      Width:&nbsp;
                      </TableCell>
                      <TableCell>
                        {product.shippingDetails.width}
                      &nbsp;Inches
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell numeric>
                      Height:&nbsp;
                      </TableCell>
                      <TableCell>
                        {product.shippingDetails.height}
                      &nbsp;Inches
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell numeric>
                      Weight:&nbsp;
                      </TableCell>
                      <TableCell>
                        {product.shippingDetails.weight}
                      &nbsp;Inches
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell numeric>
                      Unit:&nbsp;
                      </TableCell>
                      <TableCell>
                        {product.descriptionUnit}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell numeric>
                      Color:&nbsp;
                      </TableCell>
                      <TableCell>
                        {product.descriptionColor.join(", ")}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              ),
              tabIcon: () => (
                <Assessment
                  className={classes.iconPositionBottom}
                />),
            },
            {
              tabButton: "Reviews",
              tabContent: (
                <Table>
                  <TableBody>
                    {product.review.map(review => (
                      <TableRow key={review.id}>
                        <TableCell style={{ width: "150px", paddingRight: "24px" }}>
                          <StarRatings
                            rating={review.rating}
                            starRatedColor="gold"
                            numberOfStars={5}
                            starDimension="15px"
                            starSpacing="0px"
                            name="rating"
                          />
                        </TableCell>
                        <TableCell>
                          {review.comment}
                        </TableCell>
                      </TableRow>))}
                  </TableBody>
                </Table>
              ),
              tabIcon: () => (
                <Star
                  className={classes.iconPositionBottom}
                />),
            },
          ]}
        />
      </div>
    );
  }
}

export default withStyles(styles)(ProductInfo);
