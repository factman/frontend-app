import { REVIEW_ITEM } from "../actions/actions_customer_review";

const customerReview = (state = {}, action) => {
  let output;
  let data;
  switch (action.type) {
    case REVIEW_ITEM:
      data = action.payload.success ? action.payload.data : action.payload.message;
      output = { reviewItem: data };
      break;
    default:
      output = state;
      break;
  }

  return output;
};

export default customerReview;
