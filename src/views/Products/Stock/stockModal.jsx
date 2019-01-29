import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";

import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import withStyles from "@material-ui/core/styles/withStyles";
import IconButton from "@material-ui/core/IconButton";
// @material-ui/icons
import Close from "@material-ui/icons/Close";

import AddStock from "./addStock";


import modalStyle from "../../../assets/jss/material-kit-react/modalStyle";
import Button from "../../../components/CustomButtons/Button";
import Validator from "../../../helpers/validator";

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class CategoryModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  componentWillReceiveProps(newProps) {
    if (Validator.propertyExist(newProps, "productStock", "addProductStock")) {
      if (typeof newProps.productStock.addProductStock === "string") {
        return false;
      }
      this.handleClose();
    }
    return false;
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };


  render() {
    const { classes, type, addProductStock, productStock, products } = this.props;
    const { open } = this.state;
    let modalContent;
    let modalTitle;
    switch (type) {
      case "add":
        modalContent = (
          <AddStock
            onHandleModalClose={this.handleClose}
            addProductStock={addProductStock}
            productStock={productStock}
            products={products}
          />);
        modalTitle = (
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleClickOpen}
            style={{ marginBottom: "10px" }}
          >
            Add New Product Stock
          </Button>
        );
        break;
      default:
        modalContent = "Sorry pnale not available";
        modalTitle = "..Thinking";
        break;
    }
    return (
      <div>

        {modalTitle}
        <Dialog
          fullScreen={false}
          fullWidth
          classes={{
            root: classes.center,
            paper: classes.modal,
          }}
          open={open}
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
            {modalContent}
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}
export default withStyles(modalStyle)(CategoryModal);
