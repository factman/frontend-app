import React from "react";
import { Cropper } from "react-image-cropper";
import Button from "@material-ui/core/Button";
import withStyles from "@material-ui/core/styles/withStyles";
import Snackbar from "@material-ui/core/Snackbar";
import BezopSnackBar from "../../../assets/jss/bezop-mkr/BezopSnackBar";


const styles = theme => ({
    root: {
      display: "flex",
      flexWrap: "wrap",
    },
    formControl: {
      margin: theme.spacing.unit,
      width: "100%",
    },
    selectEmpty: {
      marginTop: theme.spacing.unit * 2,
    },
    input:{
      display: "none"
    },
    fluidButton: {
      ...theme.button,
      width: "100%",
      marginTop: "10px",
      height: "auto"
    }
  });

class ImageCropper extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            imgSrc: this.props.imgSrc,
            cropper: "",
            cropperLoaded: false,
            minHeight: this.props.minHeight,
            minWidth: this.props.minWidth,
            aspectWidth: this.props.aspectWidth,
            aspectHeight: this.props.aspectHeight,
            snackBarOpen: true,
            snackBarMessage: "",
        }
    }

    onCloseHandler = () => {
        this.setState({ snackBarOpen: false });
    }

    handleClick (state){
        let node = this[state]
        if(node.values().original.width >= this.state.minWidth && node.values().original.height >= this.state.minHeight){
            this.setState({
                [state]: node.crop()
            })

            this.props.getImageLink(node.values())
        } else {
            this.setState({
                snackBarOpen: true,
                snackBarMessage: `Either the height of the image is less than ${this.state.minHeight} or width less than ${this.state.minWidth}`
              })
        }
    }

    handleImageLoaded(state){
        this.setState({
          [state + "Loaded"]: true
        })
      }
    
    componentDidUpdate(prevProp){
        if(prevProp.imgSrc !== this.props.imgSrc){
            this.setState({
                imgSrc: this.props.imgSrc
            })
        }
    }



    render(){
        const {imgSrc, snackBarMessage, snackBarOpen} = this.state;
        const {classes} = this.props;
        return (
            <div>
                <Cropper 
                    src={imgSrc} 
                    ref={ ref => { this.cropper = ref }}
                    ratio={this.state.aspectWidth/this.state.aspectHeight}
                    width={this.state.minWidth}
                    onImgLoad={() => this.handleImageLoaded("cropper")}
                    
                />
            {
                this.state.cropperLoaded ?
                <Button variant="contained" onClick={() => this.handleClick("cropper")} color="primary" component="span" className={classes.fluidButton }>
                   Crop Picture
                </Button>
                : null
            }

                <Snackbar
                    anchorOrigin={{vertical: "top", horizontal: "center"}}
                    open={snackBarOpen}
                    onClose={this.onCloseHandler}
                >
                    <BezopSnackBar
                    onClose={this.onCloseHandler}
                    variant="error"
                    message={snackBarMessage}
                    />
                    </Snackbar>

            </div>
        
        )
    }
}

export default withStyles(styles)(ImageCropper);



