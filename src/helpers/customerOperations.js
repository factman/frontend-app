import { API_URL } from "../components/Auth/UsersAuth";
import { getUsersToken, getIdFromToken, setUsersAccount, getUserProfile, userIs } from "../components/Auth/AccessControl";

export class ProfileObject {
  /**
   * @name  update
   * @param  {Object} profileData User Profile Object
   * @returns {Promise<Boolean>}  Promise<Boolean>
   * @example ProfileObject.update(profileData);
   * @description This is responsible for updating the user profile.
   */
  static update = (profileData) => {
    const { accessToken } = getUsersToken("customer");
    const { id } = getIdFromToken(accessToken);
    delete profileData.id;

    return fetch(`${API_URL}/customers/customer/?key=${process.env.REACT_APP_API_KEY}`, {
      body: JSON.stringify(profileData),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      method: "PUT",
    })
      .then(response => response.json())
      .then((responseJSON) => {
        if (responseJSON.success && Object.keys(responseJSON.data).length > 1) {
          return Promise.resolve(
            setUsersAccount({ user: "customer", id, accessToken })
              .then(() => true),
          );
        }
        return false;
      });
  };

  static passwordReset = ({ password, confirm_password }) => {
    const { accessToken } = getUsersToken("customer");

    return fetch(`${API_URL}/customers/password/update/?key=${process.env.REACT_APP_API_KEY}`, {
      body: JSON.stringify({ password, confirm_password }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      method: "PUT",
    })
      .then(response => response.json())
      .then((responseJSON) => {
        if (responseJSON.success && Object.keys(responseJSON.data).length > 1) {
          return true;
        }
        return false;
      });
  };
}

export default class CartObject {
  /**
   * @name  checkProduct
   * @param  {String} id Product Id
   * @returns {Boolean} Boolean
   * @example ProfileObject.checkProduct(id);
   * @description This will check if a product has been added to cart or not.
   */
  static checkProduct = (id) => {
    try {
      const cart = CartObject.getCart();
      const product = cart.filter(prod => prod.product === id);
      return product.length > 0;
    } catch (ex) {
      console.log(ex.message);
      return false;
    }
  };

  /**
   * @name  getCart
   * @returns {Array} Array
   * @example ProfileObject.getCart();
   * @description This returns array of cart objects.
   */
  static getCart = () => {
    try {
      return JSON.parse(localStorage.getItem("cart")) || [];
    } catch (ex) {
      console.log(ex.message);
      return [];
    }
  };

  /**
   * @name  addProduct
   * @param  {String} id  Product Id
   * @param {Object}  Obj the caller object 'this'
   * @param {Event}  events EventEmitter Object 'event'
   * @returns {void}  void
   * @example ProfileObject.addProduct(id, this, events);
   * @description This append a product to the Shopping Cart.
   */
  static addProduct = (id, Obj, events) => {
    if (CartObject.checkProduct(id)) return null;
    try {
      const cart = CartObject.getCart();
      const cartData = {
        quantity: 1,
        product: id,
      };

      cart.push(cartData);
      localStorage.setItem("cart", JSON.stringify(cart));
      Obj.setState({ Cart: cart });
      events.emit("add-to-cart");

      if (userIs(["customer"])) {
        const profile = getUserProfile("customer");
        cart.push(cartData);
        profile.cart = cart;
        ProfileObject.update(profile);
      }
    } catch (ex) {
      console.log(ex.message);
      return null;
    }
    return null;
  };

  /**
   * @name  getQuantity
   * @param  {Object} product Product Object
   * @returns {Number} Number
   * @example ProfileObject.getQuantity(product);
   * @description This will return the quantity of a product in the Shopping Cart.
   */
  static getQuantity = (product) => {
    try {
      const cartItems = CartObject.getCart();
      const cart = cartItems.filter(item => item.product === product.id);
      const quantity = (cart.length > 0) ? cart[0].quantity : 1;
      if (quantity > 0 && quantity <= product.available) {
        return quantity;
      }
      return 1;
    } catch (ex) {
      console.log(ex.message);
      return 1;
    }
  };

  /**
   * @name  setQuantity
   * @param  {Object} product Product object
   * @param {Number} num Quantity to be added to the supplied product
   * @param {Object}  Obj the caller object 'this'
   * @returns {void}  void
   * @example ProfileObject.setQuantity(product, num, this);
   * @description This will set the quantity of a product in the Shopping Cart.
   */
  static setQuantity = (product, num, Obj) => {
    try {
      const cart = CartObject.getCart();
      num = Number(num);

      if (num > 0 && num <= product.available) {
        cart.map((item) => {
          if (item.product === product.id) {
            item.quantity = num;
          }
          return item;
        });
      }
      localStorage.setItem("cart", JSON.stringify(cart));
      Obj.setState({ Cart: cart });

      if (userIs(["customer"])) {
        const profile = getUserProfile("customer");
        if (num > 0 && num <= product.available) {
          cart.map((item) => {
            if (item.product === product.id) {
              item.quantity = num;
            }
            return item;
          });
          profile.cart = cart;
          ProfileObject.update(profile);
        }
      }
    } catch (ex) {
      console.log(ex.message);
    }
  };

  /**
   * @name  removeProduct
   * @param  {String} id Product Id
   * @param {Object}  Obj the caller object 'this'
   * @param {Event}  events EventEmitter Object 'event'
   * @returns {void}  void
   * @example ProfileObject.removeProduct(id, this, events);
   * @description This will remove a product from the Shopping Cart.
   */
  static removeProduct = (id, Obj, events) => {
    try {
      let cart = CartObject.getCart();

      cart = cart.filter(item => item.product !== id);
      localStorage.setItem("cart", JSON.stringify(cart));
      Obj.setState({ Cart: cart });
      events.emit("add-to-cart");

      if (userIs(["customer"])) {
        const profile = getUserProfile("customer");
        cart = cart.filter(item => item.product !== id);
        profile.cart = cart;
        ProfileObject.update(profile);
      }
    } catch (ex) {
      console.log(ex.message);
    }
  };

  /**
   * @name  emptyCart
   * @param {Object}  Obj the caller object 'this'
   * @param {Event}  events EventEmitter Object 'event'
   * @returns {void}  void
   * @example ProfileObject.emptyCart(this, events);
   * @description This will remove all the products in the Shopping Cart.
   */
  static emptyCart = (Obj, events) => {
    try {
      localStorage.setItem("cart", JSON.stringify([]));
      events.emit("add-to-cart");
      Obj.setState({ Cart: [] });

      if (userIs(["customer"])) {
        const profile = getUserProfile("customer");
        profile.cart = [];
        ProfileObject.update(profile);
      }
    } catch (ex) {
      console.log(ex.message);
    }
  };
}

export class WishlistObject {
  /**
   * @name  toggle
   * @param {String}  id Product Id
   * @returns {Array} Array
   * @example Wishlist.toggle(id);
   * @description This will add or remove products in the wishlist.
   */
  static toggle = (id) => {
    const wishlist = WishlistObject.getWishlist();
    const profile = getUserProfile("customer");
    const wishlistCart = { carts: [] };
    if (wishlist.includes(id)) {
      wishlist.splice(wishlist.indexOf(id), 1);
      localStorage.wishlist = JSON.stringify(wishlist);

      wishlist.map((item) => {
        wishlistCart.carts.push({
          quantity: 1,
          product: item,
        });
        return item;
      });
      profile.wishlist[0] = wishlistCart;
      ProfileObject.update(profile);

      return wishlist;
    }
    wishlist.push(id);
    localStorage.wishlist = JSON.stringify(wishlist);

    wishlist.map((item) => {
      wishlistCart.carts.push({
        quantity: 1,
        product: item,
      });
      return item;
    });
    profile.wishlist[0] = wishlistCart;
    ProfileObject.update(profile);

    return wishlist;
  };

  /**
   * @name  getWishlist
   * @returns {Array} Array
   * @example Wishlist.getWishlist();
   * @description This will return the wishlist.
   */
  static getWishlist = () => {
    try {
      return JSON.parse(localStorage.getItem("wishlist")) || [];
    } catch (ex) {
      console.log(ex.message);
      return [];
    }
  };

  /**
   * @name  checkWishlist
   * @param {String}  id Product Id
   * @returns {Boolean} Boolean
   * @example Wishlist.checkWishlist(id);
   * @description This will check if a product already exist in the wishlist.
   */
  static checkWishlist = (id) => {
    try {
      const wishlist = WishlistObject.getWishlist();
      return wishlist.includes(id);
    } catch (ex) {
      console.log(ex.message);
      return false;
    }
  };
}

export class PaymentObject {
  static pay = ({
    contractAddress,
    vendorAddress,
    customerAddress,
    productHash,
    currencyAddress,
    valueTotal,
    initialDeposit,
  }) => {
    try {
      return fetch("http://35.201.30.99:7234/contract/customer/purchase", {
        body: JSON.stringify({
          contractAddress,
          vendorAddress,
          customerAddress,
          productHash,
          currencyAddress,
          valueTotal,
          initialDeposit,
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
      })
        .then(response => response.json())
        .then((responseJSON) => {
          if (responseJSON.success) {
            return true;
          }
          console.log(responseJSON);
          return false;
        });
    } catch (ex) {
      console.log(ex.message);
      return false;
    }
  };
}
