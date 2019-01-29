import Validator from "../helpers/validator";
export const UPDATE_VENDOR_PROFILE = "UPDATE_VENDOR_PROFILE";
export const FETCH_VENDOR_PROFILE = "FETCH_VENDOR_PROFILE";
export const PAYMENT_ACTIVATION = "PAYMENT_ACTIVATION";
export const DEPLOY_CONTRACT_ADDRESS = "DEPLOY_CONTRACT_ADDRESS";
export const SAVE_DEPLOYED_CONTRACT_ADDRESS = "SAVE_DEPLOYED_CONTRACT_ADDRESS";
export const ACTIVATE_CONTRACT_ADDRESS = "ACTIVATE_CONTRACT_ADDRESS";
export const SAVE_ACTIVATE_CONTRACT_ADDRESS = "SAVE_ACTIVATE_CONTRACT_ADDRESS";

export function loadSaveContractStatus(result) {
  return {
    type: SAVE_ACTIVATE_CONTRACT_ADDRESS,
    payload: result,
  };
}

export function saveContractStatus() {
  return dispatch => fetch(`${process.env.REACT_APP_DEV_API_URL}/vendors/vendor/activation/?key=${process.env.REACT_APP_API_KEY}`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Bearer ${JSON.parse(localStorage["bezop-login:vendor"]).accessToken}`,
    },
    body: JSON.stringify({ paymentActivation: true }),
  })
    .then(response => response.json())
    .then((json) => {
      if (Validator.propertyExist(json, "error")) {
        throw json.error;
      }
      return dispatch(loadSaveContractStatus(json));
    })
    .catch(error => (
      dispatch(loadSaveContractStatus({
        success: false,
        data: error.message,
      }))
    ));
}

export function loadContractStatus(result) {
  return {
    type: ACTIVATE_CONTRACT_ADDRESS,
    payload: result,
  };
}

export function contractStatus(contractAddress) {
  return dispatch => fetch(`${process.env.REACT_APP_CONTRACT_API}/contract/vendor/set/?key=${process.env.REACT_APP_API_KEY}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Bearer ${JSON.parse(localStorage["bezop-login:vendor"]).accessToken}`,
    },
    body: JSON.stringify(contractAddress),
  })
    .then(response => response.json())
    .then((json) => {
      if (Validator.propertyExist(json, "error")) {
        throw json.error;
      }
      return dispatch(loadContractStatus(json));
    })
    .catch(error => (
      dispatch(loadContractStatus({
        success: false,
        data: error.message,
      }))
    ));
}

export function loadDeployContract(result) {
  return {
    type: DEPLOY_CONTRACT_ADDRESS,
    payload: result,
  };
}

export function deployContract(vendorProfile) {
  return dispatch => fetch(`${process.env.REACT_APP_CONTRACT_API}/contract/vendor/deploy/?key=${process.env.REACT_APP_API_KEY}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Bearer ${JSON.parse(localStorage["bezop-login:vendor"]).accessToken}`,
    },
    body: JSON.stringify(vendorProfile),
  })
    .then(response => response.json())
    .then((json) => {
      if (Validator.propertyExist(json, "error")) {
        throw json.error;
      }
      return dispatch(loadDeployContract(json));
    })
    .catch(error => (
      dispatch(loadDeployContract({
        success: false,
        data: error.message,
      }))
    ));
}

export function loadSavedDeployContract(result) {
  return {
    type: SAVE_DEPLOYED_CONTRACT_ADDRESS,
    payload: result,
  };
}

export function saveDeployContract(contractAddressData) {
  return dispatch => fetch(`${process.env.REACT_APP_DEV_API_URL}/vendors/vendor/deploy/?key=${process.env.REACT_APP_API_KEY}`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Bearer ${JSON.parse(localStorage["bezop-login:vendor"]).accessToken}`,
    },
    body: JSON.stringify(contractAddressData),
  })
    .then(response => response.json())
    .then((json) => {
      if (Validator.propertyExist(json, "error")) {
        throw json.error;
      }
      return dispatch(loadSavedDeployContract(json));
    })
    .catch(error => (
      dispatch(loadSavedDeployContract({
        success: false,
        data: error.message,
      }))
    ));
}

export function loadUpdatedVendorProfile(result) {
  return {
    type: UPDATE_VENDOR_PROFILE,
    payload: result,
  };
}

export function updatedVendorProfile(vendorProfile) {
  return dispatch => fetch(`${process.env.REACT_APP_DEV_API_URL}/vendors/vendor/?key=${process.env.REACT_APP_API_KEY}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Bearer ${JSON.parse(localStorage["bezop-login:vendor"]).accessToken}`,
    },
    body: JSON.stringify(vendorProfile),
  })
    .then(response => response.json())
    .then((json) => {
      if (Validator.propertyExist(json, "error")) {
        throw json.error;
      }
      return dispatch(loadUpdatedVendorProfile(json));
    })
    .catch(error => (
      dispatch(loadUpdatedVendorProfile({
        success: false,
        message: error.message,
      }))
    ));
}

export function loadUserUpdate(result) {
  return {
    type: FETCH_VENDOR_PROFILE,
    payload: result,
  };
}

export function fetchUserProfile() {
  return dispatch => fetch(`${process.env.REACT_APP_DEV_API_URL}/vendors/domain/${JSON.parse(localStorage["bezop-login:vendor"]).profile.domainName}/?key=${process.env.REACT_APP_API_KEY}`, {
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
      return dispatch(loadUserUpdate(json));
    })
    .catch(error => (
      dispatch(loadUserUpdate({
        success: false,
        message: error.message,
      }))
    ));
}

export function loadPaymentActivation(result) {
  return {
    type: PAYMENT_ACTIVATION,
    payload: result,
  };
}

export function paymentActivation() {
  return dispatch => fetch(`${process.env.REACT_APP_DEV_API_URL}/vendors/vendor/activation/?key=${process.env.REACT_APP_API_KEY}`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Bearer ${JSON.parse(localStorage["bezop-login:vendor"]).accessToken}`,
    },
    body: JSON.stringify({
      paymentActivation: true,
    }),
  })
    .then(response => response.json())
    .then((json) => {
      if (Validator.propertyExist(json, "error")) {
        throw json.error;
      }
      return dispatch(loadPaymentActivation(json));
    })
    .catch(error => (
      dispatch(loadUserUpdate({
        success: false,
        message: error.message,
      }))
    ));
}
