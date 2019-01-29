import Validator from "../helpers/validator";

export const REVIEW_ITEM = "REVIEW_ITEM";

export function loadReviewItem(results) {
  return {
    type: REVIEW_ITEM,
    payload: results,
  };
}

export function reviewItem(customerReviewItem) {
  return dispatch => fetch(`${process.env.REACT_APP_PROD_API_URL}/reviews/customer/?key=${process.env.REACT_APP_API_KEY}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Bearer ${JSON.parse(localStorage["bezop-login:customer"]).accessToken}`,
    },
    body: JSON.stringify(customerReviewItem),
  })
    .then(response => response.json())
    .then((json) => {
      if (Validator.propertyExist(json, "error")) {
        throw json.error;
      }
      return dispatch(loadReviewItem(json));
    })
    .catch((error) => {
      dispatch(loadReviewItem({
        success: false,
        message: error.message,
      }));
    });
}
