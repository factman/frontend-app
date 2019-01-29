import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import tooltip from "../../assets/jss/material-kit-react/tooltipsStyle";
import { PageLoader } from "../../components/PageLoader/PageLoader";

const iframeStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  border: 0,
};
// const loaderStyle = {
//   position: "fixed",
//   width: "30%",
//   height: "30%",
//   zIndex: "50",
//   backgroundImage: `url("${loaderImage}")`,
//   backgroundRepeat: "no-repeat",
//   backgroundPosition: "center",
//   animation: "a 1s infinite linear",
//   backgroundSize: "contain",
//   top: "33%",
//   left: "33%",
// };

const styles = theme => ({
  paper: {
    // position: "absolute",
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
  iframeContainer: {
    position: "relative",
    overflow: "hidden",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    height: "50%",
    [theme.breakpoints.down("sm")]: {
      height: "28.13%",
    },
  },
  ...tooltip,
});

class SimpleModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      onLoadStatus: "block",
    };
  }

  handleOpen = () => {
    this.setState({
      open: true,
      onLoadStatus: "block",
    });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  onLoadHandler = () => {
    this.setState({
      onLoadStatus: "none",
    });
  }

  render() {
    const { classes, children } = this.props;
    const { open, onLoadStatus } = this.state;
    return (
      <div>
        <Button onClick={this.handleOpen} style={{ paddingTop: "17px", minWidth: "inherit" }}>
          <Tooltip title="What is bezop?" placement="bottom" classes={{ tooltip: classes.tooltip }}>
            {children}
          </Tooltip>
        </Button>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={open}
          onClose={this.handleClose}
        >
          <div className={classes.iframeContainer}>
            <PageLoader display={onLoadStatus} min />
            <iframe
              src="https://www.youtube.com/embed/W36sC0EgN1w"
              width="640"
              height="360"
              frameBorder="0"
              allowFullScreen
              title="E-Commerce Revolutionized by Bezop Blockchain Ltd"
              style={iframeStyle}
              onLoad={this.onLoadHandler}
            />
          </div>
        </Modal>
      </div>
    );
  }
}

SimpleModal.propTypes = {
  classes: PropTypes.shape({
    iframeContainer: PropTypes.string.isRequired,
  }).isRequired,
  children: PropTypes.node.isRequired,
};

// We need an intermediary variable for handling the recursive nesting.
const SimpleModalWrapped = withStyles(styles)(SimpleModal);

export default SimpleModalWrapped;
