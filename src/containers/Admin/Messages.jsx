/*
* @desc the message container used by REDUX
* @author Sylvia Onwukwe
*/
import { connect } from "react-redux";
import AdminMessageComponent from "../../Admin/Messages/messages";

const mapStateToProps = state => ({
  front: state.front,
});

const AdminMessage = connect(
  mapStateToProps,
)(AdminMessageComponent);

export default AdminMessage;
