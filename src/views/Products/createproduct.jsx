import React from "react";
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import "react-select/dist/react-select.css";


import GridItem from "../../components/Grid/GridItem";
import Card from "../../components/Card/Card";
import CardBody from "../../components/Card/CardBody";
import CardHeader from "../../components/Card/CardHeader";
import ImagePlaceholder from "../../bezopComponents/Images/ImagePlaceholder";
import validator from "../../helpers/validator";
import BezopSnackBar from "../../assets/jss/bezop-mkr/BezopSnackBar";

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
    width: "100%"
  }
});

class ContainedButtons extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimaton: "cardHidden",
      categoryDetails: {
        frontview: {},
        thumbnail: {},
      },
      
      selectedProductKind: null,
      categoryKindSelect: "react-select-label-hidden",
      srcImageThumb: "http://localhost:3000/assets/img/the-smiths.png",
      srcFront: "http://localhost:3000/assets/img/the-smiths.png",
      snackBarOpen: false,
      snackBarMessage: "",
      imageCropped: {},
      imageCroppedThumbnail: {}
      
    };
   
    this.frontview = React.createRef();
    this.thumbnail = React.createRef();
  }

  //Check the imput Error
  inputErrorValidation(type, value, value2 = null){
    let output = false;
    switch(type){
      case "srcImageThumb":
          output = validator.minHeight(value, 400) || validator.minWidth(value2, 400);
        break;
      case "srcFront":
          output = validator.minHeight(value, 400) || validator.minWidth(value2, 400);   
        break;
      default:
        output = false;
      break
    }

    return output;
  }

  onCloseHandler = () => {
    this.setState({ snackBarOpen: false });
  }

  //Setting the state of all input feilds
  setCategoryDetails = (type, value) => {
    let newcategoryDetails = JSON.parse(JSON.stringify(this.state.categoryDetails));
    newcategoryDetails[type] = value;
    this.setState({
        categoryDetails: newcategoryDetails,
    });
    this.setCategoryDetailsSpecialError(type, value);
  }


  //Setting the state every fields that have error
  setCategoryDetailsSpecialError(type, value, value1 = null){
    let newCategoryDetailsError = JSON.parse(JSON.stringify(this.state.categoryDetailsError));
    newCategoryDetailsError[type] = this.inputErrorValidation(type, value, value1);
    this.setState({
        categoryDetailsError: newCategoryDetailsError
    })
  }
  //Get the value of Input Element
  handleChange =  (event) => {
    this.setCategoryDetails(event.target.name, event.target.value);
  };
  //Backview file upload
  onchangeBack= (e) => {
    this.readURL(this.backview.current, "srcBack", 500,500);
  }
  //FrontView File Upload
  onChangeFront= (e) => {
    this.readURL(this.frontview.current, "srcFront", 500,500);
  }

  //Banner File Upload
  onChangeBanner = (e) => {
    this.readURL(this.fileInput.current, "srcImage", 1024, 576);
  }

  //Thumbnail File Upload
  onChangeThumbnail = () => {
    this.readURL(this.thumbnail.current, "srcImageThumb", 500, 500)
  }

  //This handles the country select element
  handleCategoryKindChange = (selectedCategoryKind) => {
    this.setState({ selectedCategoryKind });
    if(selectedCategoryKind !== null){
      this.setCategoryDetails("kind", selectedCategoryKind.value);
      this.setState({
        categoryKindSelect: "react-select-label-visible"
      })
    }else{
      this.setState({
        categoryKindSelect: "react-select-label-hidden"
      })
      this.setCategoryDetailsSpecialError("kind", "");
    }
  }

  

  //Rendreing the Image Preview
  readURL = (input, type, weight = null, height = null) => {
      if (input.files && input.files[0]) {
          if(input.files[0].type.match(/image.*/)){
              let reader = new FileReader();
              reader.onload = (e) => {
                //Create a new Image intance
              let image = new Image();
              //Assign the image uploaded to the new image instance
               image.src = e.target.result;
               let that = this;
               image.onload = function() {
                  if(that.inputErrorValidation(type, this.height, this.width)){
                    that.setState({
                      snackBarOpen: true,
                      snackBarMessage: `Either the height of the image is less than ${height} or width less than ${weight}`
                    })
                  }else{
                    that.newImageState(type, e.target.result);
                  }

               }
                
              }  
              
              reader.readAsDataURL(input.files[0]);
              
          }else{
            this.setState({
              snackBarOpen: true,
              snackBarMessage: `Sorry, only "jpeg, jpg, gif and png is allowed"`
            })
          }
          
        }
  }

  //Setting the state of the image
  newImageState = (imageProp, src) => {
    this.setState({
      [imageProp]: src
    });
  }

  assignCroppedImage = (newCroppedImage, type) =>{

    let newCroppedCategoryDetails = JSON.parse(JSON.stringify(this.state.categoryDetails));
    newCroppedCategoryDetails[type] = newCroppedImage;
    this.setState({
      categoryDetails: newCroppedCategoryDetails
    })
    console.log(newCroppedCategoryDetails);
  }

  componentDidMount() {
    // we add a hidden class to the card and after 700 ms we delete it and the transition appears
    this.cardAnimationSetTimeout = setTimeout(
        this.setState({ cardAnimaton: "" }),
      700
    );
  }
  //Clear the slider when moving to another page
  componentWillUnmount(){
    clearTimeout(this.cardAnimationSetTimeout);
  }
  render(){
    const {classes} = this.props;
    const {
           srcImageThumb,
           srcFront,
           snackBarOpen,
           snackBarMessage
          } = this.state;
    return (
      <div>
        
        <Card>
            <CardHeader color="primary">
              <div>
                <h4>Add New Product Category</h4>
              </div>
              <div>
                <p>Product Category Details</p>
              </div>
            </CardHeader>
            <CardBody>
              <Grid container>
              
                <GridItem xs={12} md={6}>
                <ImagePlaceholder srcImage={srcFront}/>
                <label htmlFor="contained-button-file">
                  <Button variant="contained" color="primary" component="span" className={classes.fluidButton} >
                    Upload Product Front-View
                  </Button>
                </label>
                <input
                  accept="image/*"
                  className={classes.input}
                  id="contained-button-file"
                  type="file"
                  onChange={this.onChangeFront}
                  ref={this.frontview}
                />
                </GridItem>

                
                <GridItem xs={12} md={6}>
                <div>
                <ImagePlaceholder srcImage={srcImageThumb}/>
                </div>
                <label htmlFor="contained-button-thumbnail">
                  <Button variant="contained" color="primary" component="span" className={classes.fluidButton}>
                    Upload Product Back-View
                  </Button>
                </label>
                <input
                  accept="image/*"
                  className={classes.input}
                  id="contained-button-thumbnail"
                  type="file"
                  onChange={this.onChangeThumbnail}
                  ref={this.thumbnail}
                />
                </GridItem>
                
              </Grid>
            </CardBody>
          </Card>
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
    );
  }
}

export default withStyles(styles)(ContainedButtons);
