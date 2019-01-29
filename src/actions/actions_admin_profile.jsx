import Validator from "../helpers/validator";

// @desc the admin profile actions used by Redux
// @author Sylvia Onwukwe
export const POST_ADMIN_PROFILE = "POST_ADMIN_PROFILE";
export const FETCH_ADMIN_PROFILE_DETAILS = "FETCH_ADMIN_PROFILE_DETAILS";
export const UPDATE_ADMIN_PROFILE = "UPDATE_ADMIN_PROFILE";
export const DELETE_ADMIN_PROFILE_DETAILS = "DELETE_ADMIN_PROFILE_DETAILS";


export function loadAdminProfileDetails(result) {
  return {
    type: FETCH_ADMIN_PROFILE_DETAILS,
    payload: result,
  };
}

export function fetchAdminProfileDetails() {
  return dispatch => fetch(`${process.env.REACT_APP_PROD_API_URL}/admins/?key=${process.env.REACT_APP_API_KEY}`,
    { method: "GET" })
    .then(response => response.json())
    .then((json) => {
      if (Validator.propertyExist(json, "error")) {
        throw json.error;
      }
      return dispatch(loadAdminProfileDetails(json));
    })
    .catch((error) => {
      dispatch(loadAdminProfileDetails({
        success: false,
        message: error.message,
      }));
    });
}


export function loadAdminProfile(results) {
  return {
    type: POST_ADMIN_PROFILE,
    payload: results,
  };
}


export function postAdminProfile(AdminProfile) {
  return dispatch => fetch(`${process.env.REACT_APP_PROD_API_URL}/admins/?key=${process.env.REACT_APP_API_KEY}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Bearer ${JSON.parse(localStorage["bezop-login:admin"]).accessToken}`,
    },
    body: JSON.stringify(AdminProfile),
  })
    .then(response => response.json())
    .then((json) => {
      if (Validator.propertyExist(json, "error")) {
        throw json.error;
      }
      return dispatch(loadAdminProfile(json));
    })
    .catch((error) => {
      dispatch(loadAdminProfile({
        success: false,
        message: error.message,
      }));
    });
}

export function loadUpdatedAdminProfile(results) {
  return {
    type: UPDATE_ADMIN_PROFILE,
    payload: results,
  };
}

export function putAdminProfile(AdminProfile, adminID) {
  return dispatch => fetch(`${process.env.REACT_APP_PROD_API_URL}/admins/${adminID}/?key=${process.env.REACT_APP_API_KEY}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Bearer ${JSON.parse(localStorage["bezop-login:admin"]).accessToken}`,
    },
    body: JSON.stringify(AdminProfile),
  })
    .then(response => response.json())
    .then((json) => {
      if (Validator.propertyExist(json, "error")) {
        throw json.error;
      }
      return dispatch(loadUpdatedAdminProfile(json));
    })
    .catch((error) => {
      dispatch(loadUpdatedAdminProfile({
        success: false,
        message: error.message,
      }));
    });
}

export function loadDeleteAdminProfileDetails(results) {
  return {
    type: DELETE_ADMIN_PROFILE_DETAILS,
    payload: results,
  };
}

export function deleteAdminProfileDetails(adminID) {
  return dispatch => fetch(`${process.env.REACT_APP_PROD_API_URL}/admins/${adminID}/?key=${process.env.REACT_APP_API_KEY}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then(response => response.json())
    .then((json) => {
      if (Validator.propertyExist(json, "error")) {
        throw json.error;
      }
      return dispatch(loadDeleteAdminProfileDetails(json));
    })
    .catch((error) => {
      dispatch(loadDeleteAdminProfileDetails({
        success: false,
        message: error.message,
      }));
    });
}
