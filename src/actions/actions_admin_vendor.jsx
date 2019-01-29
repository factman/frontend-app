import Validator from "../helpers/validator";
export const FETCH_VENDORS = "FETCH_VENDORS";
export const PATCH_VENDOR = "PATCH_VENDOR";
export const PATCH_APPROVAL_VENDOR = "PATCH_APPROVAL_VENDOR";
export const DELETE_VENDORS = "DELETE_VENDORS";


export function loadVendors(result) {
  return {
    type: FETCH_VENDORS,
    payload: result,
  };
}

export function fetchVendors() {
  return dispatch => fetch(`${process.env.REACT_APP_PROD_API_URL}/vendors/admin/?key=${process.env.REACT_APP_API_KEY}`, {
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
      return dispatch(loadVendors(json));
    })
    .catch(error => console.log(error));
}

export function loadDeleteVendors(results) {
  return {
    type: DELETE_VENDORS,
    payload: results,
  };
}

export function deleteVendors(vendorID) {
  return dispatch => fetch(`${process.env.REACT_APP_PROD_API_URL}/vendors/${vendorID}/?key=${process.env.REACT_APP_API_KEY}`, {
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
      return dispatch(loadDeleteVendors(json));
    })
    .catch(error => console.log(error));
}

export function loadPatchVendor(results) {
  return {
    type: PATCH_VENDOR,
    payload: results,
  };
}

export function patchVendor(vendorPatchDetails, vendorID) {
  return dispatch => fetch(`${process.env.REACT_APP_PROD_API_URL}/vendors/admin/${vendorID}/?key=${process.env.REACT_APP_API_KEY}`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Bearer ${JSON.parse(localStorage["bezop-login:admin"]).accessToken}`,
    },
    body: JSON.stringify(vendorPatchDetails),
  })
    .then(response => response.json())
    .then((json) => {
      if (Validator.propertyExist(json, "error")) {
        throw json.error;
      }
      return dispatch(loadPatchVendor(json));
    })
    .catch((error) => {
      dispatch(loadPatchVendor({
        success: false,
        message: error.message,
      }));
    });
}

export function loadVendorApproval(results) {
  return {
    type: PATCH_APPROVAL_VENDOR,
    payload: results,
  };
}

export function vendorApproval(vendorPatchDetails, vendorID) {
  return dispatch => fetch(`${process.env.REACT_APP_PROD_API_URL}/vendors/approval/${vendorID}/?key=${process.env.REACT_APP_API_KEY}`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Bearer ${JSON.parse(localStorage["bezop-login:admin"]).accessToken}`,
    },
    body: JSON.stringify(vendorPatchDetails),
  })
    .then(response => response.json())
    .then((json) => {
      if (Validator.propertyExist(json, "error")) {
        throw json.error;
      }
      return dispatch(loadVendorApproval(json));
    })
    .catch((error) => {
      dispatch(loadVendorApproval({
        success: false,
        message: error.message,
      }));
    });
}
