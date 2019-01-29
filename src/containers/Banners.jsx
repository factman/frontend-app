import { connect } from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import BannersComponent from "../views/Banners/banners";
import { postSliderDetails, putSliderDetails, deleteSlider, fetchSliders } from "../actions/actions_vendor_slider";
import { postImage } from "../actions/actions_imageupload";


const BannersStyle = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "white",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};

const mapStateToProps = state => ({
  slider: state.vendorSlider
});

const mapStateToDispatch= (dispatch, newProps) => {
  return {
    fetchSliders: () => {
      dispatch(fetchSliders());
    },
    postSliderDetails: (sliderDetails) => {
      dispatch(postSliderDetails(sliderDetails));
    },
    putSliderDetails: (sliderDetails, sliderId) => {
      dispatch(putSliderDetails(sliderDetails, sliderId))
    },
    deleteSlider: (sliderId) => {
      dispatch(deleteSlider(sliderId));
    },
    postImage: (imageDetails, mediaId)=>{
      dispatch(postImage(imageDetails, mediaId))
    }
  }
}


const Banners = connect(
  mapStateToProps,
  mapStateToDispatch
)(BannersComponent);

export default withStyles(BannersStyle)(Banners);
