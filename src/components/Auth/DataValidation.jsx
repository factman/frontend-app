import isValidDomain from "is-valid-domain";
import { nonDomain } from "../../routes/routingSystem";

export const validateEmail = (value) => {
  const re = /^(?:[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;  // eslint-disable-line no-control-regex
  return re.test(value);
};

export const validateFullName = (value) => {
  if (value.length > 5) {
    return true;
  }
  return false;
};

export const validatePhoneNumber = (value) => {
  if (value.length > 5) {
    return true;
  }
  return false;
};

export const validateLongText = (value) => {
  if (value.length > 19) {
    return true;
  }
  return false;
};

export const validateShortText = (value) => {
  if (value.length > 2) {
    return true;
  }
  return false;
};

export const validateZipCode = value => validatePhoneNumber(value);

export const getZipCode = value => value.replace(/[-_]/g, "");

export const validateDomain = (value) => {
  if (value.length < 13) return false;
  if (nonDomain.includes(value.split(".")[0])) return false;
  if (!isValidDomain(value)) return false;
  return true;
};
