import { connect } from "react-redux";
import EmailTemplateComponent from "../../Admin/EmailTemplate/Email/emailviews";
import {
  fetchMailTemplates,
  postMailTemplate,
  putMailTemplate,
  deleteMailTemplate,
} from "../../actions/actions_admin_template";


const mapStateToProps = state => ({
  adminMailTemplate: state.adminMailTemplate,
});

const mapDistpatchToProps = dispatch => ({
  fetchMailTemplates: () => {
    dispatch(fetchMailTemplates());
  },
  postMailTemplate: (mailTemplateDetails) => {
    dispatch(postMailTemplate(mailTemplateDetails));
  },
  putMailTemplate: (mailTemplateDetails, templateID) => {
    dispatch(putMailTemplate(mailTemplateDetails, templateID));
  },
  deleteMailTemplate: (templateID) => {
    dispatch(deleteMailTemplate(templateID));
  },
});

const EmailTemplate = connect(
  mapStateToProps,
  mapDistpatchToProps,
)(EmailTemplateComponent);

export default EmailTemplate;
