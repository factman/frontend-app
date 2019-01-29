import Validator from "../helpers/validator";
export const POST_SLIDER_DETAILS = "POST_SLIDER_DETAILS";
export const FETCH_SLIDERS = "FETCH_SLIDERS";
export const UPDATE_SLIDER_DETAILS = "UPDATE_SLIDER_DETAILS";
export const DELETE_SLIDER = "DELETE_SLIDER";

export function loadSliders(result) {
  return {
    type: FETCH_SLIDERS,
    payload: result,
  };
}

export function fetchSliders() {
  return dispatch => fetch(`${process.env.REACT_APP_DEV_API_URL}/sliders/vendor/${JSON.parse(localStorage["bezop-login:vendor"]).profile.domainName}/?key=${process.env.REACT_APP_API_KEY}`,
    {
      method: "GET",
      headers: {
        authorization: `Bearer ${JSON.parse(localStorage["bezop-login:vendor"]).accessToken}`,
      },
    })
    .then(response => response.json())
    .then((json) => {
      if (Validator.propertyExist(json, "error")) {
        throw json.error;
      }
      return dispatch(loadSliders(json));
    })
    .catch(error => (
      dispatch(loadSliders({
        success: false,
        message: error.message,
      }))
    ));
}


export function loadSliderDetail(results) {
  return {
    type: POST_SLIDER_DETAILS,
    payload: results,
  };
}


export function postSliderDetails(sliderDetails) {
  return dispatch => fetch(`${process.env.REACT_APP_DEV_API_URL}/sliders/?key=${process.env.REACT_APP_API_KEY}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Bearer ${JSON.parse(localStorage["bezop-login:vendor"]).accessToken}`,
    },
    body: JSON.stringify(sliderDetails),
  })
    .then(response => response.json())
    .then((json) => {
      if (Validator.propertyExist(json, "error")) {
        throw json.error;
      }
      return dispatch(loadSliderDetail(json));
    })
    .catch(error => (
      dispatch(loadSliderDetail({
        success: false,
        message: error.message,
      }))
    ));
}

export function loadUpdatedSliderDetails(results) {
  return {
    type: UPDATE_SLIDER_DETAILS,
    payload: results,
  };
}

export function putSliderDetails(sliderDetails, sliderID) {
  return dispatch => fetch(`${process.env.REACT_APP_DEV_API_URL}/sliders/${sliderID}/?key=${process.env.REACT_APP_API_KEY}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Bearer ${JSON.parse(localStorage["bezop-login:vendor"]).accessToken}`,
    },
    body: JSON.stringify(sliderDetails),
  })
    .then(response => response.json())
    .then((json) => {
      if (Validator.propertyExist(json, "error")) {
        throw json.error;
      }
      return dispatch(loadUpdatedSliderDetails(json));
    })
    .catch(error => (
      dispatch(loadUpdatedSliderDetails({
        success: false,
        message: error.message,
      }))
    ));
}

export function loadDeleteSlider(results) {
  return {
    type: DELETE_SLIDER,
    payload: results,
  };
}

export function deleteSlider(sliderID) {
  return dispatch => fetch(`${process.env.REACT_APP_DEV_API_URL}/sliders/${sliderID}/?key=${process.env.REACT_APP_API_KEY}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Bearer ${JSON.parse(localStorage["bezop-login:vendor"]).accessToken}`,
    },
  })
    .then(response => response.json())
    .then((json) => {
      if (Validator.propertyExist(json, "error")) {
        throw json.error;
      }
      return dispatch(loadDeleteSlider(json));
    })
    .catch(error => (
      dispatch(loadDeleteSlider({
        success: false,
        message: error.message,
      }))
    ));
}
