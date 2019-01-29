import {
  POST_SLIDER_DETAILS,
  FETCH_SLIDERS,
  UPDATE_SLIDER_DETAILS,
  DELETE_SLIDER,
} from "../actions/actions_vendor_slider";
import { PUT_IMAGE } from "../actions/actions_imageupload";


const slider = (state = {}, action) => {
  let output;
  let data;
  switch (action.type) {
    case POST_SLIDER_DETAILS:
      data = action.payload.success ? action.payload.data : action.payload.message;
      output = { addSlider: data };
      break;
    case FETCH_SLIDERS:
      data = action.payload.success ? action.payload.data : action.payload.message;
      output = { getSlider: data };
      break;
    case UPDATE_SLIDER_DETAILS:
      data = action.payload.success ? action.payload.data : action.payload.message;
      output = { updateSlider: data };
      break;
    case DELETE_SLIDER:
      data = action.payload.success ? action.payload.data : action.payload.message;
      output = { deleteSlider: data };
      break;
    case PUT_IMAGE:
      data = action.payload.success ? action.payload.data : "There was an error uploading product images";
      output = { updateImage: data };
      break;
    default:
      output = state;
      break;
  }

  return output;
};

export default slider;
