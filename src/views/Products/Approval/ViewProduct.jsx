import React from "react";
import classNames from "classnames";
import isEqual from "lodash/isEqual";
import Button from "../../../components/CustomButtons/Button";
import Card from "../../../components/Card/Card";
import CardBody from "../../../components/Card/CardBody";
import { withStyles, CircularProgress, FormControl, InputLabel, Snackbar } from "../../../../node_modules/@material-ui/core";
import ProductView from "../../../bezopComponents/Common/ProductView";
import Validator from "../../../helpers/validator";
import Select from "../../../../node_modules/react-select/lib/Select";
import CustomInput from "../../../components/CustomInput/CustomInput";
import BezopSnackBar from "../../../assets/jss/bezop-mkr/BezopSnackBar";


const styles = theme => ({
  wrapper: {
    margin: theme.spacing.unit,
    position: "relative",
  },
  formControl: {
    margin: theme.spacing.unit,
    width: "100%",
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
    fontSize: "15px",
  },
  RemovePaddingBottom: {
    paddingBottom: "0px",
  },
  RemovePaddingTop: {
    paddingTop: "0px",
  },
});

class ViewProduct extends React.Component {
  constructor(props) {
    super(props);
    const { approveProductDetails } = this.props;
    this.state = {
      approveProductDetails,
      selectedApproved: approveProductDetails.approved !== "" ? { value: approveProductDetails.approved, label: approveProductDetails.approved.replace(/^\w/, c => c.toUpperCase()) } : null,
      selectedApprovedStyle: `react-select-label-${approveProductDetails.approved !== "" ? "visible" : "hidden"}`,
      loading: false,
      snackBarOpen: false,
      snackBarMessage: "",
    };
  }

  componentWillReceiveProps(newProps) {
    const { product } = this.props;
    if (Validator.propertyExist(newProps, "product", "approvedProduct") && !isEqual(newProps.product.approvedProduct, product.approvedProduct)) {
      if (typeof newProps.product.approvedProduct === "string") {
        this.setState({
          loading: false,
        });
        return false;
      }
      const { onHandleModalClose } = this.props;
      this.setState({
        loading: false,
      });
      onHandleModalClose();
    }
    return false;
  }

  onCloseHandler = () => {
    this.setState({
      snackBarOpen: false,
    });
  }

  onChangeSelect = (type, selected, parent = null) => {
    this.setState({
      [`selected${type}`]: selected,
      [`selected${type}Style`]: `react-select-label-${selected === null ? "hidden" : "visible"}`,
    });
    const value = selected !== null ? selected.value : "";
    this.setApprovalProduct(type.toLowerCase(), value, parent);
  }

  // Setting the state of all input feilds
  setApprovalProduct = (type, value, parent = null) => {
    const { approveProductDetails } = this.state;
    const newapproveProductDetails = JSON.parse(JSON.stringify(approveProductDetails));
    if (parent !== null) {
      newapproveProductDetails[parent][type] = value;
    } else {
      newapproveProductDetails[type] = value;
    }
    this.setState({
      approveProductDetails: newapproveProductDetails,
    });
  }

  handleChange = (event) => {
    const names = event.target.name.split("|");
    if (names.length === 1) {
      this.setApprovalProduct(names[0], event.target.value);
    } else {
      this.setApprovalProduct(names[1], event.target.value, names[0]);
    }
  };

  handleBeforeSubmit = () => {
    const { approveProductDetails } = this.state;
    const newapproveProductDetails = JSON.parse(JSON.stringify(approveProductDetails));
    newapproveProductDetails.comment = newapproveProductDetails.approved !== "rejected"
      ? "" : approveProductDetails.comment;
    if (newapproveProductDetails.approved === "rejected" && newapproveProductDetails.comment.length < 4) {
      this.setState({
        snackBarOpen: true,
        snackBarMessage: "Why was the product rejected",
      });
    } else {
      this.setState({
        loading: true,
      });
      this.submitActionstatus(newapproveProductDetails);
    }
  }

  submitActionstatus = (approveProductDetails) => {
    const { approveProduct, eachData } = this.props;
    approveProduct(approveProductDetails, eachData.id);
  }

  render() {
    const {
      brands,
      categories,
      classes,
      eachData,
    } = this.props;
    const {
      approveProductDetails,
      loading,
      snackBarOpen,
      snackBarMessage,
      selectedApproved,
      selectedApprovedStyle,
    } = this.state;
    return (
      <div>
        <Card>
          <CardBody className={classes.RemovePaddingBottom}>
            <ProductView
              brands={brands}
              categories={categories}
              eachData={eachData}
            >
              <div style={{ paddingTop: "15px" }}>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="selectedApproved" className={selectedApprovedStyle}>
                    Type or Select Product Status
                  </InputLabel>
                  <Select
                    id="selectedApproved"
                    name="selectedApproved"
                    value={selectedApproved}
                    placeholder="Type or Select Discount Type"
                    onChange={selected => this.onChangeSelect("Approved", selected)}
                    options={["Pending", "Accepted", "Rejected"].map((approve, key) => ({ value: approve.toLowerCase(), label: approve }))
                    }
                  />
                </FormControl>
                {
                    approveProductDetails.approved === "rejected"
                      ? (
                        <FormControl className={classes.formControl}>
                          <CustomInput
                            labelText="Comment"
                            id="comment"
                            formControlProps={{
                              fullWidth: true,
                              required: true,
                            }}
                            inputProps={{
                              value: approveProductDetails.comment,
                              name: "comment",
                              onChange: this.handleChange,
                              multiline: true,
                              rows: 3,
                            }}
                          />
                        </FormControl>
                      ) : null
                }
                <div className={classes.wrapper}>
                  <Button
                    color="primary"
                    className={classes.fullWidth}
                    disabled={loading}
                    onClick={() => this.handleBeforeSubmit()}
                  >
                    Change Product Status
                  </Button>
                  {loading && (
                  <CircularProgress
                    size={24}
                    className={
                       classNames({
                         [classes.buttonProgress]: true,
                         [classes.loadingPosition]: true,
                       })}
                  />)}
                </div>
              </div>
            </ProductView>
          </CardBody>
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={snackBarOpen}
            onClose={this.onCloseHandler}
          >
            <BezopSnackBar
              onClose={this.onCloseHandler}
              variant="error"
              message={snackBarMessage}
            />
          </Snackbar>
        </Card>
      </div>
    );
  }
}


export default withStyles(styles)(ViewProduct);
