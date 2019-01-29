/**
 * The Menu Object.
*/
const Menu = {
  toggle: () => {
    const x = document.getElementById("myTopnav");
    const o = document.getElementById("overlay");
    const t = document.getElementById("toggle");
    if (x.className === "topnav") {
      x.className += " responsive";
      o.style.display = "block";
      t.style.display = "block";
    } else {
      x.className = "topnav";
      o.style.display = "none";
      t.style.display = "none";
    }
  },
};

const videoContent = () => ('<iframe id="videoFrame" class="modal_iframe" src="https://www.youtube.com/embed/W36sC0EgN1w" width="640" height="360" frameBorder="0"allowFullScreen title="E-Commerce Revolutionized by Bezop Blockchain Ltd"></iframe>');

/**
 * The Modal Object.
*/
const Modal = {
  toggle: (modalId, renderContent = null) => {
    const m = document.getElementById(modalId);
    if (m.style.display === "block") {
      m.style.display = "none";
    } else {
      m.style.display = "block";
      if (renderContent !== null) {
        if (m.lastElementChild.innerHTML === "") {
          m.lastElementChild.innerHTML = renderContent;
        }
      }
    }
  },
};

const LS_KEY = "bezop-login:";
const jwtDecode = window.jwt_decode;

const UserAuth = {
  getUserProfile: user => JSON.parse(localStorage.getItem(`${LS_KEY}${user}`)).profile,

  getUsersToken: (user) => {
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
  },

  getIdFromToken: (token) => {
    try {
      const ids = jwtDecode(token).payload;
      return ids.id;
    } catch (ex) {
      return false;
    }
  },

  unsetUsersAccount: (user) => {
    try {
      const { accessToken } = UserAuth.getUsersToken(user);
      const id = UserAuth.getIdFromToken(accessToken);
      localStorage.removeItem(`${LS_KEY}${user}`);
      sessionStorage.removeItem(id);
      window.location.assign("/");
    } catch (ex) {
      console.log(ex.message);
    }
  },

  userIs: (user) => {
    try {
      const auth = UserAuth.getUsersToken("all");
      let output = false;
      if (auth[user]) {
        try {
          jwtDecode(auth[user].accessToken);
          output = true;
        } catch (ex) {
          UserAuth.unsetUsersAccount(user);
        }
      }
      return output;
    } catch (ex) {
      console.log(ex.message);
    }
    return null;
  },
};

if (!UserAuth.userIs("customer")) {
  const usersLogin = document.getElementById("usersLogin");
  usersLogin.style.display = "inline";
} else {
  const userAvatar = document.getElementById("userAvatar");
  userAvatar.style.display = "inline";

  const { notifications } = UserAuth.getUserProfile("customer");
  const empty = '<a class="nav-item" href="javascript:void(0);"><div class="hidden_menu_item"><i class="material-icons">notifications_none</i><span>Notifications</span></div></a>';
  const notEmpty = `<a class="nav-item" href="/profile/notifications"><div class="hidden_menu_item"><i class="material-icons">notifications_active</i><div class="badge">${notifications.length}</div><span>Notifications</span></div></a>`;
  const notification = document.getElementById("notification");
  notification.innerHTML = (notifications.length > 0) ? notEmpty : empty;
}

const getCart = () => {
  try {
    return JSON.parse(localStorage.getItem("cart")) || [];
  } catch (ex) {
    console.log(ex.message);
  }
  return [];
};

const Cart = {
  cart: getCart().length,
  display: () => {
    const empty = '<a class="nav-item" href="javascript:void(0);"><div class="hidden_menu_item"><i class="material-icons">shopping_cart</i><span>Shopping Cart</span></div></a>';
    const notEmpty = `<a class="nav-item" href="/cart"><div class="hidden_menu_item"><i class="material-icons">shopping_cart</i><div class="badge">${Cart.cart}</div><span>Shopping Cart</span></div></a>`;
    const cart = document.getElementById("cart");
    cart.innerHTML = (Cart.cart > 0) ? notEmpty : empty;
  },
};

const Compare = {
  compare: (localStorage.compare) ? JSON.parse(localStorage.compare).length : 0,
  display: () => {
    const empty = `<a class="nav-item" href="javascript:void(0);"><div class="hidden_menu_item"><i class="material-icons">compare</i>${(Compare.compare > 0) ? `<div class='badge'>${Compare.compare}</div>` : ""}<span>Compare</span></div></a>`;
    const notEmpty = `<a class="nav-item" href="/compare"><div class="hidden_menu_item"><i class="material-icons">compare</i><div class="badge">${Compare.compare}</div><span>Compare</span></div></a>`;
    const compare = document.getElementById("compare");
    compare.innerHTML = (Compare.compare > 1) ? notEmpty : empty;
  },
};

Cart.display();
Compare.display();
