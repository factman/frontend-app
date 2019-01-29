import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import validator from "../../helpers/validator";
import BezopSnackBar from "../../assets/jss/bezop-mkr/BezopSnackBar";

import Button from "../../components/CustomButtons/Button";


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

class ProductImagePlaceholder extends React.Component {
  constructor(props) {
    super(props);
    const { srcImage, collection, label, eachData, fileInput } = this.props;
    this.state = {
      stateSrcImg: srcImage,
      snackBarOpen: false,
      snackBarMessage: "",
      imageDetail: {
        collection,
        src: "",
        label,
      },
      collectionId: eachData.id,
      closeButtonStatus: false,
      snackBarStatus: "error",
      loading: false,
    };
    this[fileInput] = React.createRef();
  }

  componentWillReceiveProps(newProps) {
    if (validator.propertyExist(newProps, "product", "updateImage")) {
      this.setState({
        loading: false,
      });
      const { srcImage } = this.props;
      if (srcImage !== newProps.srcImage) {
        this.setState({
          stateSrcImg: newProps.srcImage,
          closeButtonStatus: true,
          snackBarStatus: "success",
          snackBarOpen: true,
          snackBarMessage: "You have successfully uploaded the product image",
          loading: false,
        });
      }
    }
  }

  onCloseHandler = () => {
    this.setState({ snackBarOpen: false });
  }

  // File Upload
  onChangeFile = (e) => {
    const { fileInput, width, height, aspect } = this.props;
    this.readURL(this[fileInput].current, "stateSrcImg", width, height, aspect);
  }

   // Render the Image Preview
   readURL = (input, type, width = 0, height = 0, aspect = false) => {
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
               if (
                 (validator.maxHeight(evt.target.height, height)
              && validator.maxHeight(evt.target.width, width))
               ) {
                 if (aspect && !validator.squareDimension(evt.target.height, evt.target.width)) {
                   this.setState({
                     snackBarOpen: true,
                     snackBarStatus: "error",
                     snackBarMessage: "The height and width of the image must be the same",
                   });
                   return false;
                 }
                 return this.newImageState(type, e.target.result);
               }
               return this.setState({
                 snackBarOpen: true,
                 snackBarStatus: "error",
                 snackBarMessage: `Either the height of the image is ${height} or width ${width}`,
               });
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

    handleImageRemoval = (imgSrc) => {
      const { srcImage } = this.props;
      this.setState({
        [imgSrc]: srcImage,
        loading: false,
      });
    }

    uploadImage = () => {
      const { postImage } = this.props;
      const { imageDetail, collectionId } = this.state;
      this.setState({
        loading: true,
      });
      postImage(imageDetail, collectionId);
    }

    handleKeyUpImageRemoval = (imgSrc, evt) => {
      if (evt.keyCode === 81) {
        this.handleImageRemoval(imgSrc);
      }
    }


    render() {
      const {
        snackBarMessage, snackBarOpen, snackBarStatus,
        loading, stateSrcImg, closeButtonStatus,
      } = this.state;
      const { fullwidth, classes, height, width, fileInput } = this.props;
      let style = { width: "150px", marginBottom: "10px", marginTop: "10px" };
      if (fullwidth === true) {
        style = { width: "100%" };
      } else if (typeof fullwidth === "string") {
        style = { width: fullwidth };
      }
      return (
        <div>
          <div className={classes.imgWrapper} style={style}>
            <div>
              <img src={stateSrcImg} alt="" style={style} />
            </div>
            {
            stateSrcImg !== undefined
            && stateSrcImg.startsWith("data")
            && closeButtonStatus === false
              ? (
                <div>
                  <span
                    className={`${classes.imgClose} not-selectable`}
                    onClick={() => this.handleImageRemoval("stateSrcImg")}
                    role="button"
                    tabIndex="0"
                    onKeyUp={e => this.handleKeyUpImageRemoval("stateSrcImg", e)}
                  >
                    X
                  </span>
                  <div className={classes.wrapper}>
                    <Button variant="contained" color="primary" component="span" className={classes.sizeButton} onClick={this.uploadImage} disabled={loading}>
                      Upload File
                    </Button>
                    {loading && <CircularProgress size={20} className={classes.buttonProgress} />}
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
                </div>
              )
            }
          </div>
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

export default withStyles(styles)(ProductImagePlaceholder);
