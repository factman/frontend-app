import React from "react";
// material-ui components
import withStyles from "@material-ui/core/styles/withStyles";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import AddCircle from "@material-ui/icons/AddCircle";
// @material-ui/icons
import Close from "@material-ui/icons/Close";
import Edit from "@material-ui/icons/Edit";
// core components
import Button from "../../components/CustomButtons/Button";
import modalStyle from "../../assets/jss/material-kit-react/modalStyle";
import AddCurrency from "./addCurrency";


function Transition(props) {
  return <Slide direction="down" {...props} />;
}

class NewCurrency extends React.Component {
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
      classes, type, addStoreCurrency, adminCurrency,
      eachData, putStoreCurrency, currencyDetails,
    } = this.props;
    const { modal } = this.state;
    let modalContent;
    let modalTitle;
    switch (type) {
      case "add":
        modalContent = (
          <AddCurrency
            onHandleModalClose={this.handleClose}
            addStoreCurrency={addStoreCurrency}
            adminCurrency={adminCurrency}
            currencyDetails={currencyDetails}
            type="add"
          />
        );
        modalTitle = (
          <Button
            round
            variant="contained"
            color="primary"
            onClick={this.handleClickOpen}
            style={{ marginBottom: "10px" }}
          >
            <AddCircle />
            Add New Currency
          </Button>
        );
        break;
      case "edit":
        modalContent = (
          <AddCurrency
            onHandleModalClose={this.handleClose}
            eachData={eachData}
            putStoreCurrency={putStoreCurrency}
            adminCurrency={adminCurrency}
            currencyDetails={currencyDetails}
            type="edit"
          />
        );
        modalTitle = <Edit style={{ fontSize: "15px" }}onClick={this.handleClickOpen} />;
        break;
      default:
        modalContent = null;
        modalTitle = null;
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

export default withStyles(modalStyle)(NewCurrency);
