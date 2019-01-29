import Validator from "../helpers/validator";
export const FETCH_ADMINS = "FETCH_ADMINS";
export const DELETE_ADMINS = "DELETE_ADMINS";
export const PATCH_ADMIN = "PATCH_ADMIN";


export function loadAdmins(result) {
  return {
    type: FETCH_ADMINS,
    payload: result,
  };
}

export function fetchAdmins() {
  return dispatch => fetch(`${process.env.REACT_APP_PROD_API_URL}/admins/?key=${process.env.REACT_APP_API_KEY}`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${JSON.parse(localStorage["bezop-login:admin"]).accessToken}`,
    },
  })
    .then(response => response.json())
    .then((json) => {
      if (Validator.propertyExist(json, "error")) {
        throw json.error;
      }
      return dispatch(loadAdmins(json));
    })
    .catch((error) => {
      dispatch(loadAdmins({
        success: false,
        message: error.message,
      }));
    });
}

export function loadDeleteAdmins(results) {
  return {
    type: DELETE_ADMINS,
    payload: results,
  };
}

export function deleteAdmins(adminID) {
  return dispatch => fetch(`${process.env.REACT_APP_PROD_API_URL}/admin/${adminID}/?key=${process.env.REACT_APP_API_KEY}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Bearer ${JSON.parse(localStorage["bezop-login:admin"]).accessToken}`,
    },
  })
    .then(response => response.json())
    .then((json) => {
      if (Validator.propertyExist(json, "error")) {
        throw json.error;
      }
      return dispatch(loadDeleteAdmins(json));
    })
    .catch((error) => {
      dispatch(loadDeleteAdmins({
        success: false,
        message: error.message,
      }));
    });
}

export function loadPatchAdmin(results) {
  return {
    type: PATCH_ADMIN,
    payload: results,
  };
}

export function patchAdmin(adminPatchDetails, adminID) {
  return dispatch => fetch(`${process.env.REACT_APP_PROD_API_URL}/admins/${adminID}/?key=${process.env.REACT_APP_API_KEY}`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Bearer ${JSON.parse(localStorage["bezop-login:admin"]).accessToken}`,
    },
    body: JSON.stringify(adminPatchDetails),
  })
    .then(response => response.json())
    .then((json) => {
      if (Validator.propertyExist(json, "error")) {
        throw json.error;
      }
      return dispatch(loadPatchAdmin(json));
    })
    .catch((error) => {
      dispatch(loadPatchAdmin({
        success: false,
        message: error.message,
      }));
    });
}
