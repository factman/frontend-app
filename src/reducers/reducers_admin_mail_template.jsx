import {
  POST_MAIL_TEMPLATE,
  FETCH_MAIL_TEMPLATES,
  UPDATE_MAIL_TEMPLATE,
  DELETE_MAIL_TEMPLATE,
} from "../actions/actions_admin_template";


const adminMailTemplate = (state = {}, action) => {
  let output;
  let data;
  switch (action.type) {
    case POST_MAIL_TEMPLATE:
      data = action.payload.success ? action.payload.data : action.payload.message;
      output = { addMailTemplate: data };
      break;
    case FETCH_MAIL_TEMPLATES:
      data = action.payload.success ? action.payload.data : action.payload.message;
      output = { mailTemplates: data };
      break;
    case UPDATE_MAIL_TEMPLATE:
      data = action.payload.success ? action.payload.data : action.payload.message;
      output = { updateMailTemplate: data };
      break;
    case DELETE_MAIL_TEMPLATE:
      data = action.payload.success ? action.payload.data : action.payload.message;
      output = { deleteMailTemplate: data };
      break;
    default:
      output = state;
      break;
  }

  return output;
};

export default adminMailTemplate;
