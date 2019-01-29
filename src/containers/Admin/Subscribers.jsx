/*
*@desc the Subscriber container used by REDUX 
*@author Sylvia Onwukwe
*/
import { connect } from "react-redux";
import SubscribersComponent from "../../Admin/AllSubscribers/allSubscribers";
import {
  fetchSubscribers,
  deleteSubscriber
} from "../../actions/actions_admin_subscribers"

const mapStateToProps = state => ({
  subscriber: state.subscriber
});

const mapDispatchToProps = (dispatch, newProps) =>{
  return {
    fetchSubscribers: () => {
      dispatch(fetchSubscribers());
    },
    deleteSubscriber: (subscriberID) => {
      dispatch(deleteSubscriber(subscriberID));
    }
  }
}

const Subscribers = connect(
  mapStateToProps,
  mapDispatchToProps
)(SubscribersComponent);

export default Subscribers;
