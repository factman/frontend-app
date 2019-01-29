import {
  UPDATE_VENDOR_PROFILE,
  FETCH_VENDOR_PROFILE,
  DEPLOY_CONTRACT_ADDRESS,
  SAVE_DEPLOYED_CONTRACT_ADDRESS,
  ACTIVATE_CONTRACT_ADDRESS,
  SAVE_ACTIVATE_CONTRACT_ADDRESS,
} from "../actions/actions_vendor";

import { PUT_IMAGE } from "../actions/actions_imageupload";
import Validator from "../helpers/validator";


const vendorProfile = (state = {}, actions) => {
  let output;
  let data;
  switch (actions.type) {
    case UPDATE_VENDOR_PROFILE:
      data = actions.payload.success ? actions.payload.data : "There was error updating the vendor's profile";
      output = { updateProfile: data };
      break;
    case FETCH_VENDOR_PROFILE:
      data = actions.payload.success ? actions.payload.data : "There was error fetching the vendor's profile";
      output = { getProfile: data };
      break;
    case DEPLOY_CONTRACT_ADDRESS:
      if (actions.payload.success) {
        data = { data: actions.payload.data };
      } else {
        data = Validator.propertyExist(actions.payload, "message") ? actions.payload.message : actions.payload.data;
      }
      output = { deployContractAddress: data };
      break;
    case SAVE_DEPLOYED_CONTRACT_ADDRESS:
      data = actions.payload.success ? actions.payload.data : actions.payload.message;
      output = { saveDeployContractAddress: data };
      break;
    case ACTIVATE_CONTRACT_ADDRESS:
      if (actions.payload.success) {
        data = { data: actions.payload.data };
      } else {
        data = Validator.propertyExist(actions.payload, "message") ? actions.payload.message : actions.payload.data;
      }
      output = { contractStatus: data };
      break;
    case SAVE_ACTIVATE_CONTRACT_ADDRESS:
      data = actions.payload.success ? actions.payload.data : actions.payload.message;
      output = { saveContractStatus: data };
      break;
    case PUT_IMAGE:
      data = actions.payload.success ? actions.payload.data : "There was error fetching the vendor's profile";
      output = { getImageUpdate: data };
      break;
    default:
      output = state;
      break;
  }
  return output;
};

export default vendorProfile;
