class Validator {
  static isEmail(email) {
    const filter = /^(?:[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/; // eslint-disable-line no-control-regex
    return filter.test(email);
  }

  static isEmpty(value) {
    return value.length === 0;
  }

  static aspectRatio(width, height, ratioWidth = 1, ratioHeight = 1) {
    return (width * ratioHeight) === (height * ratioWidth);
  }

  static squareDimension(width, height) {
    return parseInt(width, 10) === parseInt(height, 10);
  }

  static exact(imgHeight, height) {
    return parseInt(imgHeight, 10) === parseInt(height, 10);
  }

  static exactHeight(imgHeight, height) {
    return parseInt(imgHeight, 10) !== parseInt(height, 10);
  }

  static minHeight(imgHeight, height) {
    return parseInt(imgHeight, 10) < parseInt(height, 10);
  }

  static maxHeight(imgHeight, height) {
    return parseInt(imgHeight, 10) >= parseInt(height, 10);
  }

  static exactWidth(imgWidth, Width) {
    return parseInt(imgWidth, 10) !== parseInt(Width, 10);
  }

  static minWidth(imgWidth, Width) {
    return parseInt(imgWidth, 10) < parseInt(Width, 10);
  }

  static maxWidth(imgWidth, Width) {
    return parseInt(imgWidth, 10) >= parseInt(Width, 10);
  }

  static minStrLen(str, number) {
    return str.length < parseInt(number, 10);
  }

  static maxStrLen(str, number) {
    return str.length > parseInt(number, 10);
  }

  static contained(value, array) {
    return array.indexOf(value) < 0;
  }

  static propertyExist(
    mainObject,
    dirChild = null,
    dirDirChild = null,
    dirDirDirChild = null,
    dirDirDirDirChild = null,
  ) {
    try {
      if ((typeof mainObject).toLowerCase() !== "object") {
        return false;
      }
      let checker;
      if (dirDirChild === null) {
        checker = Object.prototype.hasOwnProperty.call(mainObject, dirChild);
      } else if (dirDirDirChild === null) {
        checker = Object.prototype.hasOwnProperty.call(mainObject, dirChild)
        && mainObject[dirChild] !== null
        && Object.prototype.hasOwnProperty.call(mainObject[dirChild], dirDirChild);
      } else if (dirDirDirDirChild === null) {
        checker = Object.prototype.hasOwnProperty.call(mainObject, dirChild)
        && mainObject[dirChild] !== null
        && Object.prototype.hasOwnProperty.call(mainObject[dirChild], dirDirChild)
        && mainObject[dirChild][dirDirChild] !== null
        && Object.prototype.hasOwnProperty.call(mainObject[dirChild][dirDirChild], dirDirDirChild);
      } else {
        checker = Object.prototype.hasOwnProperty.call(mainObject, dirChild)
        && mainObject[dirChild] !== null
        && Object.prototype.hasOwnProperty.call(mainObject[dirChild], dirDirChild)
        && mainObject[dirChild][dirDirChild] !== null
        && Object.prototype.hasOwnProperty.call(mainObject[dirChild][dirDirChild], dirDirDirChild)
        && mainObject[dirChild][dirDirChild][dirDirDirChild] !== null
      && Object.prototype.hasOwnProperty
        .call(mainObject[dirChild][dirDirChild][dirDirDirChild], dirDirDirDirChild);
      }
      return checker;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}

export default Validator;
