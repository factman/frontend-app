import Validator from "../helpers/validator";
export const PUT_IMAGE = "PUT_IMAGE";

export function loadImageUpload(results) {
  return {
    type: PUT_IMAGE,
    payload: results,
  };
}

export function postImage(imageDetail, collectionId, userType = "vendor") {
  return dispatch => fetch(`${process.env.REACT_APP_DEV_API_URL}/media${userType === "vendor" ? "" : "/admin"}/${collectionId}/?key=${process.env.REACT_APP_API_KEY}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Bearer ${JSON.parse(localStorage[`bezop-login:${userType}`]).accessToken}`,
    },
    body: JSON.stringify(imageDetail),
  })
    .then(response => response.json())
    .then((json) => {
      if (Validator.propertyExist(json, "error")) {
        throw json.error;
      }
      return dispatch(loadImageUpload(json));
    })
    .catch(error => (
      dispatch(loadImageUpload({
        success: false,
        message: error.message,
      }))
    ));
}

export function postFile(logoDetail, collectionId) {
  return dispatch => fetch(`${process.env.REACT_APP_API_URL_CALL}/media/${collectionId}/?key=${process.env.REACT_APP_API_KEY}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Bearer ${JSON.parse(localStorage["bezop-login:vendor"]).accessToken}`,
    },
    body: JSON.stringify(logoDetail),
  })
    .then(response => response.json())
    .then((json) => {
      if (Validator.propertyExist(json, "error")) {
        throw json.error;
      }
      return dispatch(loadImageUpload(json));
    })
    .catch(error => (
      dispatch(loadImageUpload({
        success: false,
        message: error.message,
      }))
    ));
}
