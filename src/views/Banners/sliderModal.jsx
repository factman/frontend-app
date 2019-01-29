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
import DialogActions from "@material-ui/core/DialogActions";
import CircularProgress from "@material-ui/core/CircularProgress";
import Edit from "@material-ui/icons/Edit";
import isEqual from "lodash/isEqual";
// core components
import Button from "../../components/CustomButtons/Button";
import SliderForm from "./sliderForm";
import modalStyle from "../../assets/jss/material-kit-react/modalStyle";
import { Grid, Snackbar } from "../../../node_modules/@material-ui/core";
import GridItem from "../../components/Grid/GridItem";
import Validator from "../../helpers/validator";
import BezopSnackBar from "../../assets/jss/bezop-mkr/BezopSnackBar";
import SliderUplooad from "../../bezopComponents/Images/sliderPlaceholder";


const wrapper = {
  position: "relative",
};
const buttonProgress = {
  position: "absolute",
  top: "50%",
  left: "50%",
  marginTop: -12,
  marginLeft: -12,
  color: "#ffffff",
};

function Transition(props) {
  return <Slide direction="down" {...props} />;
}

class SliderModal extends React.Component {
  constructor(props) {
    super(props);
    const { sliderDetails, elements } = this.props;
    this.state = {
      modal: false,
      sliderDetails,
      snackBarOpen: false,
      snackBarMessage: "",
      loading: false,
      elements: Validator.propertyExist(this.props, "elements") ? elements : {},
    };
  }

  componentWillReceiveProps(newProps) {
    const { slider, sliderDetails } = this.props;
    if (Validator.propertyExist(newProps, "slider", "addSlider")
    && !isEqual(slider.addSlider, newProps.slider.addSlider)) {
      if (typeof newProps.slider.addSlider === "string") {
        this.setState({
          snackBarOpen: true,
          snackBarMessage: newProps.slider.addSlider,
          loading: false,
        });
        return false;
      }
      this.setState({
        sliderDetails,
        loading: false,
      });
      this.handleClose();
    }

    if (Validator.propertyExist(newProps, "slider", "updateSlider")
    && !isEqual(slider.updateSlider, newProps.slider.updateSlider)) {
      if (typeof newProps.slider.updateSlider === "string") {
        this.setState({
          snackBarOpen: true,
          snackBarMessage: newProps.slider.updateSlider,
          loading: false,
        });
        return false;
      }
      this.setState({
        loading: false,
      });
      this.handleClose();
    }

    if (Validator.propertyExist(newProps, "slider", "updateImage")) {
      if (typeof newProps.slider.updateImage === "string") {
        return false;
      }
      this.setState({
        elements: newProps.slider.updateImage.elements,
      });
    }
    return false;
  }

  onCloseHandler = () => {
    this.setState({ snackBarOpen: false });
  }

  setParentSliderDetails = (sliderDetails) => {
    this.setState({
      sliderDetails,
    });
  }

  handleClose = () => {
    this.setState({
      modal: false,
    });
  }

  handleClickOpen = () => {
    this.setState({
      modal: true,
    });
  }

  addSliderPost = () => {
    const { postSliderDetails } = this.props;
    const { sliderDetails } = this.state;
    this.setState({
      loading: true,
    });
    postSliderDetails(sliderDetails);
  }

  updateSliderPost = () => {
    const { putSliderDetails, eachData } = this.props;
    const { sliderDetails } = this.state;
    this.setState({
      loading: true,
    });
    putSliderDetails(sliderDetails, eachData.id);
  }


  render() {
    const { classes, type, slider, sliderDetails, eachData, postImage, height, width } = this.props;
    const { snackBarOpen, snackBarMessage, loading, elements, modal } = this.state;
    let header;
    let content;
    let submitButton;
    switch (type) {
      case "add":
        header = (
          <div style={wrapper}>
            <Button
              color="primary"
              onClick={this.handleClickOpen}
            >
              Create New Post
            </Button>
          </div>
        );
        content = (
          <SliderForm
            sliderDetails={sliderDetails}
            setParentSliderDetails={this.setParentSliderDetails}
            slider={slider}
          />
        );
        submitButton = (
          <div style={wrapper}>
            <Button
              variant="contained"
              color="primary"
              component="span"
              disabled={loading}
              style={{ width: "100%" }}
              onClick={this.addSliderPost}
            >
              Create Slider
            </Button>
            {loading && <CircularProgress size={20} style={buttonProgress} />}
          </div>
        );
        break;
      case "edit":
        header = (
          <Edit
            color="primary"
            onClick={this.handleClickOpen}
          />
        );
        content = (
          <SliderForm
            sliderDetails={sliderDetails}
            setParentSliderDetails={this.setParentSliderDetails}
            slider={slider}
            eachData={eachData}
          />
        );
        submitButton = (
          <div>
            <Button
              variant="contained"
              color="primary"
              component="span"
              style={{ width: "100%" }}
              onClick={this.updateSliderPost}
              disabled={loading}
            >
              Update Slider
            </Button>
            {loading && <CircularProgress size={20} style={buttonProgress} />}
          </div>
        );
        break;
      case "image":
        header = (
          <div style={wrapper}>
            <Button
              color="primary"
              onClick={this.handleClickOpen}
            >
              Upload Images
            </Button>
          </div>
        );
        content = (
          <SliderUplooad
            postImage={postImage}
            slider={slider}
            eachData={eachData}
            elements={elements}
            collection="slider"
            height={height}
            width={width}
          />
        );
        submitButton = null;
        break;
      default:
        return false;
    }
    return (
      <div>
        {header}
        <Dialog
          fullScreen
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
            {content}
          </DialogContent>
          <DialogActions>
            {submitButton !== null
              ? (
                <Grid container>
                  <GridItem xs={12}>
                    {submitButton}
                  </GridItem>
                </Grid>) : null}
          </DialogActions>
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
        </Dialog>
      </div>
    );
  }
}

export default withStyles(modalStyle)(SliderModal);
