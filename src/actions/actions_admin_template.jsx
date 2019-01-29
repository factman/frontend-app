import Validator from "../helpers/validator";
export const POST_MAIL_TEMPLATE = "POST_MAIL_TEMPLATE";
export const FETCH_MAIL_TEMPLATES = "FETCH_MAIL_TEMPLATES";
export const UPDATE_MAIL_TEMPLATE = "UPDATE_MAIL_TEMPLATE";
export const DELETE_MAIL_TEMPLATE = "DELETE_MAIL_TEMPLATE";


export function loadMailTemplates(result) {
  return {
    type: FETCH_MAIL_TEMPLATES,
    payload: result,
  };
}

export function fetchMailTemplates() {
  return dispatch => fetch(`${process.env.REACT_APP_PROD_API_URL}/templates/?key=${process.env.REACT_APP_API_KEY}`,
    {
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
      return dispatch(loadMailTemplates(json));
    })
    .catch((error) => {
      dispatch(loadMailTemplates({
        success: false,
        message: error.message,
      }));
    });
}


export function loadMailTemplate(results) {
  return {
    type: POST_MAIL_TEMPLATE,
    payload: results,
  };
}


export function postMailTemplate(postMailTemplateDetails) {
  return dispatch => fetch(`${process.env.REACT_APP_PROD_API_URL}/templates/?key=${process.env.REACT_APP_API_KEY}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Bearer ${JSON.parse(localStorage["bezop-login:admin"]).accessToken}`,
    },
    body: JSON.stringify(postMailTemplateDetails),
  })
    .then(response => response.json())
    .then((json) => {
      if (Validator.propertyExist(json, "error")) {
        throw json.error;
      }
      return dispatch(loadMailTemplate(json));
    })
    .catch((error) => {
      dispatch(loadMailTemplate({
        success: false,
        message: error.message,
      }));
    });
}

export function loadUpdatedMailTemplate(results) {
  return {
    type: UPDATE_MAIL_TEMPLATE,
    payload: results,
  };
}

export function putMailTemplate(MailTemplate, mailTemplateID) {
  return dispatch => fetch(`${process.env.REACT_APP_PROD_API_URL}/templates/${mailTemplateID}/?key=${process.env.REACT_APP_API_KEY}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Bearer ${JSON.parse(localStorage["bezop-login:admin"]).accessToken}`,
    },
    body: JSON.stringify(MailTemplate),
  })
    .then(response => response.json())
    .then((json) => {
      if (Validator.propertyExist(json, "error")) {
        throw json.error;
      }
      return dispatch(loadUpdatedMailTemplate(json));
    })
    .catch((error) => {
      dispatch(loadUpdatedMailTemplate({
        success: false,
        message: error.message,
      }));
    });
}

export function loadDeleteMailTemplate(results) {
  return {
    type: DELETE_MAIL_TEMPLATE,
    payload: results,
  };
}

export function deleteMailTemplate(mailTemplateID) {
  return dispatch => fetch(`${process.env.REACT_APP_PROD_API_URL}/templates/${mailTemplateID}/?key=${process.env.REACT_APP_API_KEY}`, {
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
      return dispatch(loadDeleteMailTemplate(json));
    })
    .catch((error) => {
      dispatch(loadDeleteMailTemplate({
        success: false,
        message: error.message,
      }));
    });
}
