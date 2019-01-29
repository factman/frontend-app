import jwtDecode from "jwt-decode";
import Validator from "../../helpers/validator";

const LS_KEY = "bezop-login:";
const API_URL = (process.env.NODE_ENV === "development")
  ? process.env.REACT_APP_DEV_API_URL
  : process.env.REACT_APP_PROD_API_URL;

export const getIdFromToken = (token) => {
  try {
    const ids = jwtDecode(token).payload;
    return ids.id;
  } catch (ex) {
    return false;
  }
};

export const getUserData = ({ user, accessToken }) => fetch(`${API_URL}/${user.toLowerCase()}s/${user.toLowerCase()}/?key=${process.env.REACT_APP_API_KEY}`, {
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
  method: "GET",
})
  .then(response => response.json())
  .then((responseJSON) => {
    if (responseJSON.success && Object.keys(responseJSON.data).length > 1) {
      return responseJSON.data;
    }
    return false;
  }).catch(ex => console.log(ex.message));

export const setUsersAccount = ({ user, id, accessToken }) => getUserData({ user, accessToken })
  .then((profile) => {
    const data = { accessToken, profile };
    localStorage.setItem(`${LS_KEY}${user}`, JSON.stringify(data));
    switch (user) {
      case "customer":
        sessionStorage.setItem(id, JSON.stringify({ standing: profile.standing }));
        break;
      case "vendor":
        sessionStorage.setItem(id, JSON.stringify({
          completeProfile: profile.completeProfile,
          emailVerified: profile.emailVerified,
          domainNameSet: profile.domainNameSet,
          businessVerified: profile.businessVerified,
        }));
        break;
      case "admin":
        sessionStorage.setItem(id, JSON.stringify({
          standing: profile.standing,
          action: profile.action,
          completeProfile: profile.completeProfile,
        }));
        break;
      default:
    }
    return { accessToken, profile };
  }).catch(ex => console.log(ex.message));

export const getUsersToken = (user) => {
  try {
    const auth = {
      customer: JSON.parse(localStorage.getItem(`${LS_KEY}customer`)),
      vendor: JSON.parse(localStorage.getItem(`${LS_KEY}vendor`)),
      admin: JSON.parse(localStorage.getItem(`${LS_KEY}admin`)),
    };
    switch (user) {
      case "customer":
        return auth.customer;
      case "vendor":
        return auth.vendor;
      case "admin":
        return auth.admin;
      case "all":
        return {
          customer: auth.customer,
          vendor: auth.vendor,
          admin: auth.admin,
        };
      default:
        return {};
    }
  } catch (ex) {
    console.log(ex.message);
  }
  return {};
};

export const unsetUsersAccount = (user) => {
  try {
    const { accessToken } = getUsersToken(user);
    const id = getIdFromToken(accessToken);
    localStorage.removeItem(`${LS_KEY}${user}`);
    sessionStorage.removeItem(id);
  } catch (ex) {
    console.log(ex.message);
  }
};

export const userIs = (users) => {
  try {
    const auth = getUsersToken("all");
    let output = false;
    users.map((user) => {
      if (auth[user]) {
        try {
          jwtDecode(auth[user].accessToken);
          output = true;
        } catch (ex) {
          unsetUsersAccount(user);
        }
      }
      return user;
    });
    return output;
  } catch (ex) {
    console.log(ex.message);
  }
  return null;
};


export const getUserIds = (user) => {
  try {
    const auth = getUsersToken(user);
    if (auth) {
      try {
        const ids = jwtDecode(auth.accessToken).payload;
        return ids;
      } catch (ex) {
        localStorage.removeItem(`${LS_KEY}${user}`);
        return false;
      }
    }
  } catch (ex) {
    console.log(ex.message);
  }
  return false;
};

export const getUserProfile = user => JSON.parse(localStorage.getItem(`${LS_KEY}${user}`)).profile || {};

export const isVerified = (user) => {
  try {
    const { accessToken } = getUsersToken(user);
    const id = getIdFromToken(accessToken);
    const profile = getUserProfile(user);
    if (sessionStorage.getItem(id) === null) {
      setUsersAccount({ user, id, accessToken });
    }

    if (profile !== null) {
      switch (user) {
        case "customer":
          if (profile.standing === "active") {
            return true;
          }
          return false;
        case "admin":
          if (profile.standing === "active" && profile.action === "allow" && profile.completeProfile === true) {
            return true;
          }
          return false;
        case "vendor":
          if (
            Validator.propertyExist(profile, "completeProfile")
        && Validator.propertyExist(profile, "emailVerified")
        && Validator.propertyExist(profile, "domainNameSet")
        && Validator.propertyExist(profile, "businessVerified")
        && profile.completeProfile
        && profile.emailVerified
        && profile.domainNameSet
        && profile.businessVerified
          ) {
            return true;
          }
          return false;
        default:
          return false;
      }
    }
  } catch (ex) {
    console.log(ex.message);
  }
  return false;
};

export const getAccountStatus = (user) => {
  const { accessToken } = getUsersToken(user);
  const id = getIdFromToken(accessToken);
  try {
    if (sessionStorage.getItem(id) !== null) {
      return Promise.resolve(JSON.parse(sessionStorage.getItem(id)));
    }
  } catch (ex) {
    console.log(ex.message);
  }
  return setUsersAccount({ user, id, accessToken })
    .then(({ profile }) => {
      switch (user) {
        case "customer":
          return { standing: profile.standing };
        case "vendor":
          return {
            completeProfile: profile.completeProfile,
            emailVerified: profile.emailVerified,
            domainNameSet: profile.domainNameSet,
            businessVerified: profile.businessVerified,
          };
        case "admin":
          return {
            standing: profile.standing,
            action: profile.action,
            completeProfile: profile.completeProfile,
          };
        default:
          return {};
      }
    }).catch(ex => console.log(ex.message));
};
