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
import Button from "../../components/CustomButtons/Button";
import modalStyle from "../../assets/jss/material-kit-react/modalFullPageStyle";
import CreateTicket from "./createticket";

function Transition(props) {
  return <Slide direction="down" {...props} />;
}

class TicketButton extends React.Component {
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
      eachData,
      ticket,
      fetchTicketMessages,
      postTicketMessage,
      updateTicketMessage,
      deleteTicketMessage,
    } = this.props;
    const { modal } = this.state;
    return (
      <div>
        <Button
          round
          color="primary"
          onClick={this.handleClickOpen}
        >
          View Ticket
        </Button>
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
            <CreateTicket
              eachData={eachData}
              ticket={ticket}
              fetchTicketMessages={fetchTicketMessages}
              postTicketMessage={postTicketMessage}
              updateTicketMessage={updateTicketMessage}
              deleteTicketMessage={deleteTicketMessage}
            />
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(modalStyle)(TicketButton);
