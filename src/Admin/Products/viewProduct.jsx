import React from "react";
import Grid from "@material-ui/core/Grid";
import CheckIcon from "@material-ui/icons/Check";
import classNames from "classnames";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import withStyles from "@material-ui/core/styles/withStyles";
import CircularProgress from "@material-ui/core/CircularProgress";
import GridItem from "../../components/Grid/GridItem";
import CardFooter from "../../components/Card/CardFooter";
import Button from "../../components/CustomButtons/Button";
import Card from "../../components/Card/Card";
import CardBody from "../../components/Card/CardBody";
import ProductView from "../../bezopComponents/Common/ProductView";
import Validator from "../../helpers/validator";


const styles = theme => ({
  wrapper: {
    margin: theme.spacing.unit,
    position: "relative",
  },
  buttonProgress: {
    position: "absolute",
    marginTop: -12,
    marginLeft: -12,
    color: "#ffffff",
  },
  loadingPosition: {
    top: "50%",
    left: "90%",
  },
  checkIconPosition: {
    top: "5px !important",
    left: "45px",
  },
  checkIconPositionDeny: {
    top: "5px !important",
    left: "53px",
  },
  fullWidth: {
    width: "100%",
    fontSize: "20px",
  },
});

class ViewProduct extends React.Component {
  constructor(props) {
    super(props);
    const { eachData } = this.props;
    this.state = {
      productDetails: eachData,
      success: false,
      action: null,
    };
  }

  componentWillReceiveProps(newProps) {
    if (Validator.propertyExist(newProps, "adminProduct", "updatedAction")) {
      if (typeof newProps.adminProduct.updatedAction === "string") {
        this.setState({
          action: null,
        });
        return false;
      }

      console.log(newProps.adminProduct.updatedAction);

      this.setState({
        productDetails: newProps.adminProduct.updatedAction,
        success: true,
        action: null,
      });
    }
    return false;
  }

  handleActionStatus = (status) => {
    const { productDetails } = this.state;
    const newProductDetails = JSON.parse(JSON.stringify(productDetails));
    newProductDetails.action = status;
    this.setState({
      action: status,
    });
    this.submitActionstatus(newProductDetails);
  }

  submitActionstatus = (productDetails) => {
    const { patchProduct } = this.props;
    patchProduct(productDetails, productDetails.id);
  }

  render() {
    const {
      vendors,
      brands,
      categories,
      classes,
      eachData,
    } = this.props;
    const {
      success,
      productDetails,
      action,
    } = this.state;
    return (
      <div>
        <Card>
          <CardBody>
            <ProductView
              vendors={vendors}
              brands={brands}
              categories={categories}
              eachData={eachData}
            />
          </CardBody>
          <CardFooter>
            <Grid container>
              <GridItem xs={12} sm={12} md={6} />
              <GridItem xs={12} sm={12} md={6}>
                <GridList cols={2} cellHeight="auto" spacing={8}>
                  <GridListTile cols={1}>
                    <div className={classes.wrapper}>
                      <Button
                        color="danger"
                        className={classes.fullWidth}
                        onClick={() => this.handleActionStatus("deny")}
                        disabled={Validator.propertyExist(productDetails, "action") && productDetails.action === "deny"}
                      >
                        Deny
                        {success && action === null
                        && Validator.propertyExist(productDetails, "action")
                        && productDetails.action === "deny" ? (
                          <CheckIcon
                            className={
                               classNames({
                                 [classes.buttonProgress]: true,
                                 [classes.checkIconPositionDeny]: true,
                               })}
                          />) : null}
                      </Button>
                      {action === "deny" && (
                      <CircularProgress
                        size={24}
                        className={
                           classNames({
                             [classes.buttonProgress]: true,
                             [classes.loadingPosition]: true,
                           })}
                      />)}
                    </div>
                  </GridListTile>
                  <GridListTile cols={1}>
                    <div className={classes.wrapper}>
                      <Button
                        color="success"
                        className={classes.fullWidth}
                        disabled={Validator.propertyExist(productDetails, "action") && productDetails.action === "allow"}
                        onClick={() => this.handleActionStatus("allow")}
                      >
                        Allow
                        {success && action === null
                        && Validator.propertyExist(productDetails, "action")
                        && productDetails.action === "allow" ? (
                          <CheckIcon
                            className={
                               classNames({
                                 [classes.buttonProgress]: true,
                                 [classes.checkIconPosition]: true,
                               })}
                          />) : null}
                      </Button>
                      {action === "allow" && (
                      <CircularProgress
                        size={24}
                        className={
                           classNames({
                             [classes.buttonProgress]: true,
                             [classes.loadingPosition]: true,
                           })}
                      />)}
                    </div>
                  </GridListTile>
                </GridList>
              </GridItem>
            </Grid>
          </CardFooter>
        </Card>
      </div>
    );
  }
}


export default withStyles(styles)(ViewProduct);
