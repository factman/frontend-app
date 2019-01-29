import React from "react";
// material-ui components
import withStyles from "@material-ui/core/styles/withStyles";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";

import Edit from "@material-ui/icons/Edit";
// @material-ui/icons
import Close from "@material-ui/icons/Close";
// core components
import Button from "../../components/CustomButtons/Button";
import AddCoupon from "./createcoupon";
import modalStyle from "../../assets/jss/material-kit-react/modalStyle";
import { Snackbar } from "../../../node_modules/@material-ui/core";
import BezopSnackBar from "../../assets/jss/bezop-mkr/BezopSnackBar";
import Validator from "../../helpers/validator";


function Transition(props) {
  return <Slide direction="down" {...props} />;
}


class CreateCoupon extends React.Component {
  constructor(props) {
    super(props);
    const { couponDetails } = this.props;
    this.state = {
      modal: false,
      couponDetails,
      snackBarOpenSuccess: false,
      variantSnackBar: "error",
      snackBarMessageSuccess: "SnackBar Messager",
    };
  }

  componentWillReceiveProps(newProps) {
    // Check if the action is to create coupon
    if (Validator.propertyExist(newProps, "coupon", "addCoupon")) {
      // Check if the coupon was created successfuly
      if (typeof newProps.coupon.addCoupon === "string") {
        this.setState({
          snackBarOpenSuccess: true,
          variantSnackBar: "error",
          snackBarMessageSuccess: newProps.coupon.addCoupon,
        });
        return false;
      }
      const { couponDetails } = this.props;
      // Clear the inputted value after creating coupon
      this.setState({
        couponDetails,
      });
      // Close modal after creating modal
      this.handleClose();
    }

    if (Validator.propertyExist(newProps, "coupon", "updateCoupon")) {
      // Check if the coupon was created successfuly
      if (typeof newProps.coupon.updateCoupon === "string") {
        this.setState({
          snackBarOpenSuccess: true,
          variantSnackBar: "error",
          snackBarMessageSuccess: newProps.coupon.updateCoupon,
        });
        return false;
      }
      // Close modal after creating modal
      this.handleClose();
    }
    return false;
  }

  onCloseHandlerSuccess = () => {
    this.setState({
      snackBarOpenSuccess: false,
    });
  }

  setParentCouponDetails = (couponDetails) => {
    this.setState({
      couponDetails,
    });
  }

  handleClickOpen = () => {
    this.setState({
      modal: true,
    });
  }

  handleClose = () => {
    this.setState({
      modal: false,
    });
  }


  handleCreateCoupon = () => {
    const { postCouponDetails } = this.props;
    const { couponDetails } = this.state;
    postCouponDetails(couponDetails);
  }

  handleUpdateCoupon = () => {
    const { putCouponDetails, eachData } = this.props;
    const { couponDetails } = this.state;
    putCouponDetails(couponDetails, eachData.id);
  }

  render() {
    const { classes, coupon, type } = this.props;
    const {
      couponDetails, snackBarOpenSuccess,
      variantSnackBar,
      snackBarMessageSuccess,
      modal,
    } = this.state;
    let header;
    let submitButton;
    switch (type) {
      case "add":
        header = (
          <Button
            color="primary"
            onClick={this.handleClickOpen}
          >
            Create New Coupon
          </Button>
        );

        submitButton = (
          <Button
            style={{ width: "100%" }}
            onClick={this.handleCreateCoupon}
            color="primary"
          >
            Create Discount Coupon
          </Button>);
        break;
      case "edit":
        header = (<Edit style={{ fontSize: "15px" }}onClick={this.handleClickOpen} />);

        submitButton = (
          <Button
            style={{ width: "100%" }}
            onClick={this.handleUpdateCoupon}
            color="primary"
          >
            Update Discount Coupon
          </Button>
        );
        break;
      default:
        return false;
    }

    return (
      <div>
        {header}
        <Dialog
          classes={{
            root: classes.center,
            paper: classes.modal,
          }}
          open={modal}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="modal-slide-title"
          aria-describedby="modal-slide-description"
        >
          <DialogTitle
            id="classic-modal-slide-title"
            disableTypography
            className={classes.modalHeader}
          >
            <IconButton
              className={classes.modalCloseButton}
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={this.handleClose}
            >
              <Close className={classes.modalClose} />
            </IconButton>
          </DialogTitle>
          <DialogContent
            id="modal-slide-description"
            className={classes.modalBody}
          >
            <AddCoupon
              setParentCouponDetails={this.setParentCouponDetails}
              couponDetails={couponDetails}
              coupon={coupon}

            />
          </DialogContent>
          <DialogActions>
            {submitButton}
          </DialogActions>
        </Dialog>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={snackBarOpenSuccess}
          onClose={this.onCloseHandlerSuccess}
        >
          <BezopSnackBar
            onClose={this.onCloseHandlerSuccess}
            variant={variantSnackBar}
            message={snackBarMessageSuccess}
          />
        </Snackbar>
      </div>
    );
  }
}

export default withStyles(modalStyle)(CreateCoupon);
