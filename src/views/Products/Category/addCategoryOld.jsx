import React from "react";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select2 from "react-select";
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import "react-select/dist/react-select.css";


import GridItem from "../../../components/Grid/GridItem";
import Card from "../../../components/Card/Card";
import CardBody from "../../../components/Card/CardBody";
import CardHeader from "../../../components/Card/CardHeader";
import CardFooter from "../../../components/Card/CardFooter";
import CustomInput from "../../../components/CustomInput/CustomInput";
import ImagePlaceholder from "./ImagePlaceholder";
import validator from "../../../helpers/validator";
import ImageCropModal from "./imageCropperModal";
import BezopSnackBar from "../../../assets/jss/bezop-mkr/BezopSnackBar";

//The component Style
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

class AddCategory extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimaton: "cardHidden",
      categoryDetails: {
        name:"",
        description: "",
        kind: "",
        srcImageThumb: {
          cropDimension: {},
          src: ""
        },
        srcImage: {
          cropDimension: {},
          src: ""
        },
      },
      categoryDetailsError: {
        name:false,
        description: false,
        kind: false,
        thumbnail: false,
        banner:false,
      },
      selectedCategoryKind: null,
      categoryKindSelect: "react-select-label-hidden",
      srcImage: `${process.env.REACT_APP_DEV_API_URL}/assets/img/1024x576.png`,
      srcImageThumb: `${process.env.REACT_APP_DEV_API_URL}/assets/img/500x500.png`,
      snackBarOpen: true,
      snackBarMessage: "",
      imageCropped: {},
      imageCroppedThumbnail: {}
      
    };
    this.fileInput = React.createRef();
    this.thumbnail = React.createRef();
  }

  //Check the imput Error
  inputErrorValidation(type, value, value2 = null){
    let output = false;
    switch(type){
      case "name":
          output = validator.minStrLen(value, 3);
      break;
      case "kind":
          output = validator.isEmpty(value);
      break;
      case "description":
          output = validator.minStrLen(value, 15);
      break;
      case "srcImageThumb":
          output = validator.minHeight(value, 500) || validator.minWidth(value2, 500);
        break;
      case "srcImage":
          output = validator.minHeight(value, 576) || validator.minWidth(value2, 1024);
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
                    that.compactImageCropping(type, e.target.result);
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
    this.setState({
      [type]: newCroppedImage
    })
    this.compactImageCropping(type, "" , newCroppedImage);
    //console.log(newCroppedCategoryDetails);
  }

  //Prepare the image Cropped
  compactImageCropping = (type, imgSrc = "", cropD = {}) => {
    let src; //image source
    let cropDem; //Crop Dimension
    let newCroppedCategoryDetails = JSON.parse(JSON.stringify(this.state.categoryDetails));

    if(["srcImage", "srcImageThumb"].indexOf(type) > -1){
        if(validator.isEmpty(imgSrc)){
          src = type === "srcImage" ? this.state.imgSrc : this.state.imgSrcThumb;
        }else{
          src = imgSrc;
        }

        if(type.search(/Thumb/) > -1){
          newCroppedCategoryDetails.srcImageThumb.src = src
        }else{
          newCroppedCategoryDetails.srcImage.src = src
        }
        

    }
    
    if(["imageCropped", "imageCroppedThumbnail"].indexOf(type) > -1){
      if(Object.keys(cropD).length === 0){
        cropDem = type === "imageCropped" ? this.state.categoryDetails.imageCropped : this.state.categoryDetails.imageCroppedThumbnail;
      }else{
        cropDem = cropD
      }

      if(type.search(/Thumb/) > -1){
        newCroppedCategoryDetails.srcImageThumb.cropDimension = cropDem
      }else{
        newCroppedCategoryDetails.srcImage.cropDimension = cropDem
      }
    }

    this.setState({
      categoryDetails: newCroppedCategoryDetails
    })
  }

  //Create new Category
  createNewCategory = () => {
    this.props.addProductCategory(this.state.categoryDetails);
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
    const {categoryDetails,
           categoryKindSelect,
           selectedCategoryKind,
           srcImage,
           srcImageThumb,
           categoryDetailsError,
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
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText={categoryDetailsError.name === false? "Category Name" : "The length of Category must not be less than 3 characters"}
                    id="name"
                    error={categoryDetailsError.name}
                    inputProps={{
                      value: categoryDetails.name,
                      name:"name",
                      onChange: this.handleChange
                    }}
                    formControlProps={{
                      fullWidth: true,
                      required: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="selectedCategoryKind" className={categoryKindSelect}>Type or Select Category Kind</InputLabel>
                    <Select2 
                      id="selectedCategoryKind"
                      name="selectedCategoryKind"
                      value={selectedCategoryKind}
                      placeholder="Type or Select Category Kind"
                      onChange={this.handleCategoryKindChange}
                      options={[
                        {value: "digital", label: "Digital"},
                        {value: "physical", label: "Physical"}
                      ]}
                      className={categoryDetailsError.kind === true ? "select-menu-error": ""}
                      />
                  </FormControl>
                </GridItem>
              </Grid>
              <Grid container>
                <GridItem xs={12}>

                <CustomInput
                    error={categoryDetailsError.description}
                    labelText={categoryDetailsError.description === false ? "Description" : "The length of Category must not be less than 15 characters"}
                    id="description"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      multiline: true,
                      rows: 5,
                      name: "description",
                      onChange: this.handleChange
                    }}
                  />
                </GridItem>

                <GridItem xs={12} md={8}>
                <div style={{margin: "5px"}}>
                    <ImageCropModal 
                    imgSrc={srcImage} 
                    topMostParentImageLink={this.assignCroppedImage}
                    minWidth={1024} 
                    minHeight={576}
                    aspectWidth={16}
                    aspectHeight={9}
                    cropInfoStorage="imageCropped"
                    />
                </div>
                <div>
                <ImagePlaceholder srcImage={srcImage}/>
                </div>
                <label htmlFor="contained-button-file">
                  <Button variant="contained" color="primary" component="span" className={classes.fluidButton} >
                    Upload Category Banner
                  </Button>
                </label>
                <input
                  accept="image/*"
                  className={classes.input}
                  id="contained-button-file"
                  type="file"
                  onChange={this.onChangeBanner}
                  ref={this.fileInput}
                />
                </GridItem>
                
                <GridItem xs={12} md={4}>
                  <div style={{margin: "5px"}}>
                    <ImageCropModal 
                    imgSrc={srcImageThumb} 
                    topMostParentImageLink={this.assignCroppedImage}
                    minWidth={500} 
                    minHeight={500}
                    aspectWidth={1}
                    aspectHeight={1}
                    cropInfoStorage="imageCroppedThumbnail"
                    />
                </div>
                <div>
                <ImagePlaceholder srcImage={srcImageThumb}/>
                </div>
                <label htmlFor="contained-button-thumbnail">
                  <Button variant="contained" color="primary" component="span" className={classes.fluidButton}>
                    Upload Category Thumbnail
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
            <CardFooter>
                    <Grid container>
                      <GridItem xs={12}>
                        <Button variant="contained" color="primary" component="span" className={classes.fluidButton} onClick={this.createNewCategory}>
                          Create Product Category
                        </Button>
                      </GridItem>
                    </Grid>
            </CardFooter>
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

export default withStyles(styles)(AddCategory);
