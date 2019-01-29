import randomstring from "randomstring";

class LinkManager {
  /**
   * This will return a unique and dynamic string using the provided parameters.
   * @param  {string} Name Name of the target object.
   * @param  {string} Id Id of the target object.
   * @returns {string} string
   */
  static parse = (Name, Id) => {
    const formatedName = Name.toLowerCase().replace(" ", "-");
    const padding = `${Id}.${randomstring.generate(10)}`;
    const output = `${formatedName}?_ref=${padding}`;
    return output;
  };

  /**
   * This will return an object of name & id from the Link parameter.
   * @param  {string} Link The custom link to decode.
   * @returns {string} string
   */
  static decode = (Link) => {
    const arr = Link.split("?_ref=");
    // const name = arr[0].split("-").map((word) => {
    //   const characters = word.split("");
    //   characters[0] = characters[0].toLowerCase();
    //   return characters.join("");
    // }).join(" ");
    const id = arr[1].split(".")[0];
    return id;
  };
}

export default LinkManager;
