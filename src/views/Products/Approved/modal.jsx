import React from "react";
// material-ui components
import withStyles from "@material-ui/core/styles/withStyles";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
// @material-ui/icons
import Close from "@material-ui/icons/Close";
// core components
import ViewProduct from "./ViewProduct";
import modalStyle from "../../../assets/jss/material-kit-react/modalStyle";
import Button from "../../../components/CustomButtons/Button";


function Transition(props) {
  return <Slide direction="down" {...props} />;
}

class ModalProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };
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

  render() {
    const {
      classes,
      type,
      approveProduct,
      product,
      eachData,
      categories,
      brands,
      approveProductDetails,
    } = this.props;
    const { modal } = this.state;
    let modalContent = null;
    let modalTitle = null;
    switch (type) {
      case "view":
        modalContent = (
          <ViewProduct
            onHandleModalClose={this.handleClose}
            eachData={eachData}
            approveProduct={approveProduct}
            product={product}
            categories={categories}
            brands={brands}
            approveProductDetails={approveProductDetails}
          />
        );
        modalTitle = (
          <Button
            color="primary"
            variant="raised"
            onClick={this.handleClickOpen}
          >
            View
          </Button>
        );
        break;
      default:
        return false;
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
            {modalContent}
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(modalStyle)(ModalProduct);
