import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
//import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
//import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import withStyles from "@material-ui/core/styles/withStyles";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
// @material-ui/icons
import Close from "@material-ui/icons/Close";
import Crop from "@material-ui/icons/Crop";

import Cropper from "./imageCropper"

const modalStyle = theme => ({
  modal: {
    borderRadius: "6px",
    maxWidth: "1200px"
  },
  modalHeader: {
    borderBottom: "none",
    paddingTop: "24px",
    paddingRight: "24px",
    paddingBottom: "0",
    paddingLeft: "24px",
    minHeight: "16.43px"
  },
  modalTitle: {
    margin: "0",
    lineHeight: "1.42857143"
  },
  modalCloseButton: {
    color: "#999999",
    marginTop: "-12px",
    WebkitAppearance: "none",
    padding: "0",
    cursor: "pointer",
    background: "0 0",
    border: "0",
    fontSize: "inherit",
    opacity: ".9",
    textShadow: "none",
    fontWeight: "700",
    lineHeight: "1",
    float: "right"
  },
  modalClose: {
    width: "16px",
    height: "16px"
  },
  modalBody: {
    paddingTop: "10px",
    paddingRight: "10px",
    paddingBottom: "10px",
    paddingLeft: "10px",
    position: "relative"
  },
  modalFooter: {
    padding: "15px",
    textAlign: "right",
    paddingTop: "0",
    margin: "0"
  },
  modalFooterCenter: {
    marginLeft: "auto",
    marginRight: "auto"
  },
  fluidButton: {
    ...theme.button,
    width: "100%"
  }
});



function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class CategoryModal extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      open: false,
      imgSrc: this.props.imgSrc,
      minHeight: this.props.minHeight,
      minWidth: this.props.minWidth,
      aspectWidth: this.props.aspectWidth,
      aspectHeight: this.props.aspectHeight,
      cropInfoStorage: this.props.cropInfoStorage
    };
  }

  handleClickOpen = () => {
    this.setState({ 
      open: true 
    });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  getParentImageLink = (imageLink) => {
    this.props.topMostParentImageLink(imageLink, this.state.cropInfoStorage);
    this.handleClose();
  }

  componentWillReceiveProps(nextProp){
    if(nextProp.imgSrc !== this.props.imgSrc){
      this.setState({
        imgSrc: nextProp.imgSrc 
      })
    }
  }
  



  render(){
    const { classes } = this.props;
    const {imgSrc} = this.state;
    return (
      <div>
        <Tooltip id="tooltip-fab" title="Crop Picture" placement="top-start">
          <Button
          variant="fab"
            color="primary"
            className={classes.button}
            onClick={this.handleClickOpen}
            style={{marginBottom: "10px", float: "right", clear: "both"}}>
              <Crop/>
          </Button>
        </Tooltip>
        <Dialog
        fullScreen={false}
        fullWidth={true}
          classes={{
            root: classes.center,
            paper: classes.modal
          }}
          open={this.state.open}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="modal-slide-title"
          aria-describedby="modal-slide-description">
          <DialogTitle
            id="classic-modal-slide-title"
            disableTypography
            className={classes.modalHeader}>
            <IconButton
              className={classes.modalCloseButton}
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={this.handleClose}>
              <Close className={classes.modalClose} />
            </IconButton>

          </DialogTitle>
          <DialogContent
            id="modal-slide-description"
            className={classes.modalBody}>
            <Cropper 
             imgSrc={imgSrc}
             getImageLink={this.getParentImageLink} 
             minHeight={this.state.minHeight} 
             minWidth={this.state.minWidth}
             aspectWidth={this.state.aspectWidth}
             aspectHeight={this.state.aspectHeight}
             />
          </DialogContent>
        </Dialog>
      </div>
    );
  }
  }
  
  export default withStyles(modalStyle)(CategoryModal);