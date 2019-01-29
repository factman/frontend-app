import Validator from "./validator";

export function getSum(total, num) {
  return total + num;
}

/**
 *
 *
 * @export getRanking
 * @param {Object} rankData
 * @param {Number} rank the number between 1 and 5
 * @returns object type with label, numberOfRank and total number of rank
 */
export function getRanking(rankData, rank) {
  const reviewData = Validator.propertyExist(rankData, "review") ? rankData.review : rankData;
  const totalRating = reviewData.filter(data => data.rating === rank).length;
  const grandTotal = reviewData.length;
  return {
    label: rank === 1 ? "1 star " : `${rank} stars`,
    numberOfRate: totalRating,
    totalRate: grandTotal,
  };
}

/**
 *
 *
 * @export getAverageReview
 * @param {Object} rankData
 * @returns the total number of all rating divided by the number of people that review
 */
export function getAverageReview(rankData) {
  try {
    const reviewData = Validator.propertyExist(rankData, "review") ? rankData.review : rankData;
    const totalRating = reviewData.map(data => data.rating)
      .reduce(getSum);
    const grandTotal = reviewData.length;
    return (totalRating / grandTotal);
  } catch (e) {
    return 0;
  }
}

/**
 *
 *
 * @export checkUserItemRating
 * @param {Object} rankData
 * @param {String} customerId
 * @param {String} itemId
 * @returns true if customer has rated item before and false if customer has not
 */
export function checkUserItemRating(rankData, customerId, itemId) {
  try {
    if (customerId && itemId) {
      const reviewData = Validator.propertyExist(rankData, "review") ? rankData.review : rankData;
      return reviewData.filter(data => data.customer === customerId && data.subjectId === itemId)
        .length > 0;
    }
    return false;
  } catch (e) {
    return false;
  }
}

/**
 *
 *
 * @export
 * @param {String} user eg customer, vendor, admin
 * @returns return user Id
 */
export function getUserId(user) {
  try {
    const userLoginDetails = Validator.propertyExist(localStorage, `bezop-login:${user}`)
      ? JSON.parse(localStorage[`bezop-login:${user}`]) : null;
    if (userLoginDetails !== null) {
      return Validator.propertyExist(userLoginDetails, "profile", "id")
        ? userLoginDetails.profile.id : null;
    }
    return false;
  } catch (e) {
    return false;
  }
}

/**
 *
 *
 * @export IsJsonString
 * @param {String} str
 * @returns {String} object or string
 */
export function IsJsonString(str) {
  try {
    return typeof JSON.parse(str);
  } catch (e) {
    return typeof str;
  }
}

export function getJsonString(jsonString, firstElement) {
  try {
    return JSON.parse(jsonString)[firstElement];
  } catch (e) {
    return false;
  }
}

export function inputErrorValidation(type, value, value2 = null) {
  let output = false;
  switch (type) {
    case "name":
      output = Validator.minStrLen(value, 3);
      break;
    case "kind":
      output = Validator.isEmpty(value);
      break;
    case "description":
      output = Validator.minStrLen(value, 15);
      break;
    default:
      output = false;
      break;
  }
  return output;
}

/**
 * Error Validation Structure
 *
 * @export
 * @param {string} [value=""]
 * @param {boolean} [valid=true]
 * @param {boolean} [success=false]
 * @param {boolean} [error=false]
 * @returns
 */
export function validatioObj(
  value = "",
  valid = true,
  success = false,
  error = false,
) {
  return {
    value,
    valid,
    success,
    error,
  };
}
