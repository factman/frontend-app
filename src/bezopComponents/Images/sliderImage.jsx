import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import validator from "../../helpers/validator";
import BezopSnackBar from "../../assets/jss/bezop-mkr/BezopSnackBar";

import Button from "../../components/CustomButtons/Button";
import CustomInput from "../../components/CustomInput/CustomInput";


const styles = theme => ({
  root: {
    display: "flex",
    alignItems: "center",
  },
  wrapper: {
    position: "relative",
  },
  input: {
    display: "none",
  },
  fluidButton: {
    ...theme.button,
    width: "100%",
    fontSize: "12px",
    background: "#464646",
    backgroundColor: "#464646",
  },
  sizeButton: {
    ...theme.button,
    width: "100%",
    fontSize: "11px",
  },
  imgWrapper: {
    position: "relative",
    height: "fit-content",
  },
  imgClose: {
    position: "absolute",
    color: "#ffffff",
    zIndex: "10",
    right: "-10px",
    top: "-5px",
    fontSize: "12px",
    fontWeight: "bolder",
    cursor: "pointer",
    background: "#f43b3b",
    padding: "1px 10px",
    borderRadius: "50%",
    "&:hover": {
      boxShadow: "0px 2px 4px #444444",
    },
    "&:focus": {
      boxShadow: "0px 2px 4px #444444",
    },
  },
  imgCloseHidden: {
    position: "absolute",
    color: "#ffffff",
    display: "none",
  },
  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
    color: "#ffffff",
  },
});

class SliderPlaceholder extends React.Component {
  constructor(props) {
    super(props);
    const {
      fileInput,
      srcImage,
      collection,
      label,
      title,
      subtitle,
      eachData,
    } = this.props;
    this.state = {
      stateSrcImage: srcImage,
      snackBarOpen: false,
      snackBarMessage: "",
      imageDetail: {
        collection,
        src: "",
        label,
        title,
        subtitle,
      },
      collectionId: eachData.id,
      closeButtonStatus: false,
      snackBarStatus: "error",
      loading: false,
    };
    this[fileInput] = React.createRef();
  }

  componentWillReceiveProps(newProps) {
    if (validator.propertyExist(newProps, "slider", "updateImage")) {
      this.setState({
        loading: false,
      });
      const { srcImage } = this.props;
      if (srcImage !== newProps.srcImage) {
        if (newProps.srcImage !== undefined) {
          this.setState({
            stateSrcImage: newProps.srcImage,
            closeButtonStatus: true,
            snackBarStatus: "success",
            snackBarOpen: true,
            snackBarMessage: "You have successfully uploaded the product image",
          });
        } else {
          this.setState({
            snackBarStatus: "success",
            snackBarOpen: true,
            snackBarMessage: "You have successfully updated title or subtitle",
          });
        }
      }
    }
  }

  // File Upload
  onChangeFile = () => {
    const { fileInput, width, height } = this.props;
    this.readURL(this[fileInput].current, "stateSrcImage", width, height);
  }

  onCloseHandler = () => {
    this.setState({ snackBarOpen: false });
  }

  // Setting the state of all input feilds
  setImageDetails = (type, value, parent = null) => {
    const { imageDetail } = this.state;
    const newimageDetail = JSON.parse(JSON.stringify(imageDetail));
    if (parent !== null) {
      newimageDetail[parent][type] = value;
    } else {
      newimageDetail[type] = value;
    }
    this.setState({
      imageDetail: newimageDetail,
    });
  }

  // Setting the state of the image preview
  newImageState = (imageProp, src) => {
    const { imageDetail } = this.state;
    const newImageDetails = JSON.parse(JSON.stringify(imageDetail));
    newImageDetails.src = src;
    this.setState({
      [imageProp]: src,
      imageDetail: newImageDetails,
      closeButtonStatus: false,
    });
  }

  // Render the Image Preview
  readURL = (input, type, width = 0, height = 0) => {
    if (input.files && input.files[0]) {
      if (input.files[0].type.match(/image.*/)) {
        if (input.files[0].size < (1 * 1024 * 1024)) {
          const reader = new FileReader();
          reader.onload = (e) => {
          // Create a new Image intance
            const image = new Image();
            // Assign the image uploaded to the new image instance
            image.src = e.target.result;
            image.onload = (evt) => {
              if (validator.minHeight(evt.target.height, height)
              || validator.minWidth(evt.target.width, width)) {
                this.setState({
                  snackBarOpen: true,
                  snackBarStatus: "error",
                  snackBarMessage: `Either the height of the image is less than ${height} or width less than ${width}`,
                });
              } else {
                this.newImageState(type, e.target.result);
              }
            };
          };
          reader.readAsDataURL(input.files[0]);
        } else {
          this.setState({
            snackBarOpen: true,
            snackBarStatus: "error",
            snackBarMessage: "Sorry, only image size should not be more than 1MB",
          });
        }
      } else {
        this.setState({
          snackBarOpen: true,
          snackBarStatus: "error",
          snackBarMessage: "Sorry, only 'jpeg, jpg, gif and png is allowed'",
        });
      }
    }
  }

  // Get the value of Input Element
  handleChange = (event) => {
    this.setImageDetails(event.target.name, event.target.value);
  };


  handleImageRemoval = (imgSrc) => {
    const { srcImage } = this.props;
    this.setState({
      [imgSrc]: srcImage,
      loading: false,
    });
  }

  handleKeyUpImageRemoval = (imgSrc, evt) => {
    if (evt.keyCode === 81) {
      this.handleImageRemoval(imgSrc);
    }
  }

    uploadImage = () => {
      const { postImage } = this.props;
      const { imageDetail, collectionId } = this.state;
      this.setState({
        loading: true,
      });
      postImage(imageDetail, collectionId);
    }

    uploadImageData = () => {
      const { postImage } = this.props;
      const { imageDetail, collectionId } = this.state;
      if (imageDetail.title !== "" && imageDetail.subtitle !== "") {
        this.setState({
          loading: true,
        });
        postImage(imageDetail, collectionId);
      } else {
        this.setState({
          snackBarOpen: true,
          snackBarStatus: "error",
          snackBarMessage: "title and subtitle field can not be empty",
        });
      }
    }


    render() {
      const { classes, fileInput, eachData, width, height } = this.props;
      const {
        snackBarMessage, snackBarOpen, snackBarStatus,
        loading, imageDetail, closeButtonStatus, stateSrcImage,
      } = this.state;
      const style = { width: "100%" };
      let contentBody;
      let submitBtn;
      const contents = (
        <div>
          <CustomInput
            labelText="Image Title"
            id="name"
            inputProps={{
              value: imageDetail.title,
              name: "title",
              onChange: this.handleChange,
            }}
            formControlProps={{
              fullWidth: true,
              required: true,
            }}
          />
          <CustomInput
            labelText="Image Subtitle"
            id="name"
            inputProps={{
              value: imageDetail.subtitle,
              name: "subtitle",
              onChange: this.handleChange,
            }}
            formControlProps={{
              fullWidth: true,
              required: true,
            }}
          />
        </div>
      );
      const genericSubBtn = (
        <div className={classes.wrapper}>
          <Button variant="contained" color="primary" component="span" className={classes.sizeButton} onClick={this.uploadImageData} disabled={loading}>
            {"Update Title & SubTitle"}
          </Button>
          {loading && <CircularProgress size={20} className={classes.buttonProgress} />}
        </div>
      );
      switch (eachData.kind) {
        case "text":
          contentBody = contents;
          submitBtn = genericSubBtn;
          break;
        case "image":
          contentBody = (
            <div>
              {contents}
              <div
                className={classes.imgWrapper}
                style={style}
              >
                <div>
                  <img src={stateSrcImage} alt="" style={style} />
                </div>
                {
                  stateSrcImage !== undefined
                  && stateSrcImage.startsWith("data")
                  && closeButtonStatus === false
                    ? (
                      <div>
                        <span
                          className={`${classes.imgClose} not-selectable`}
                          onClick={() => this.handleImageRemoval("stateSrcImage")}
                          onKeyUp={e => this.handleKeyUpImageRemoval("stateSrcImage", e)}
                          role="button"
                          tabIndex="0"
                        >
                          X
                        </span>
                        <div className={classes.wrapper}>
                          <Button variant="contained" color="primary" component="span" className={classes.sizeButton} onClick={this.uploadImage} disabled={loading}>
                           Upload File
                          </Button>
                          {loading
                            && <CircularProgress size={20} className={classes.buttonProgress} />}
                        </div>
                      </div>
                    )
                    : (
                      <div>
                        {
                          /**
                             * The htmlFor attribute of the label element
                             * need to be the same with id attribute of input
                             * but must be unique for every time this component
                             * is initiated on the same page
                             */
                        }
                        <div style={{ padding: "5px", background: "#cccccc", color: "#444444", fontSize: "15px", textAlign: "center", fontWeight: "bolder" }}>
                          {`${width} X ${height}`}
                        </div>
                        <label htmlFor={fileInput}>
                          <Button variant="contained" component="span" className={classes.fluidButton}>
                            Choose File
                          </Button>
                          <input
                            accept="image/*"
                            className={classes.input}
                            id={fileInput}
                            type="file"
                            onChange={this.onChangeFile}
                            ref={this[fileInput]}
                            name={fileInput}
                          />
                        </label>
                        {genericSubBtn}
                      </div>
                    )
                }
              </div>
            </div>
          );

          submitBtn = null;
          break;
        default:
          return false;
      }
      return (
        <div>
          {contentBody}
          {submitBtn}
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={snackBarOpen}
            onClose={this.onCloseHandler}
          >
            <BezopSnackBar
              onClose={this.onCloseHandler}
              variant={snackBarStatus}
              message={snackBarMessage}
            />
          </Snackbar>
        </div>
      );
    }
}

export default withStyles(styles)(SliderPlaceholder);
