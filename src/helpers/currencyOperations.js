import { API_URL } from "../components/Auth/UsersAuth";
import Arithmetics from "./arithmetics";

class Currency {
  static getCurrency = (code) => {
    try {
      if (sessionStorage.getItem("currencies")) {
        return Promise.resolve(JSON.parse(sessionStorage.getItem("currencies"))
          .filter(currency => currency.code === code));
      }
      return Currency.getCurrencies()
        .then((currencies) => {
          console.log(currencies);
          return currencies.filter(currency => currency.code === code);
        });
    } catch (ex) {
      console.log(ex.message);
    }
    return null;
  };

  static getCurrencies = () => {
    if (sessionStorage.getItem("currencies")) {
      return Promise.resolve(JSON.parse(sessionStorage.getItem("currencies")));
    }
    return fetch(`${API_URL}/currencies/active/?key=${process.env.REACT_APP_API_KEY}`, { method: "GET" })
      .then(res => res.json())
      .then((res) => {
        if (res.success && res.data.length > 0) {
          sessionStorage.setItem("currencies", JSON.stringify(res.data));
          return res.data;
        }
        throw new Error(res.message);
      })
      .catch((err) => {
        console.log(err.message);
        return [{ code: "USD", exchange: 1, symbol: "$", id: "1" }];
      });
  };

  static getCurrencySync = (code) => {
    try {
      Currency.getCurrencies();
      const currencies = (sessionStorage.currencies ? JSON.parse(sessionStorage.currencies) : [{ code: "USD", exchange: 1, symbol: "$" }])
        .filter(currency => code === currency.code);
      return currencies[0];
    } catch (ex) {
      console.log(ex.message);
    }
    return null;
  };

  static getCurrencyById = (id) => {
    try {
      Currency.getCurrencies();
      const currencies = (typeof sessionStorage.currencies === "string" ? JSON.parse(sessionStorage.currencies) : [{ code: "USD", exchange: 1, symbol: "$", id: "1" }])
        .filter(currency => id === currency.id);
      return currencies[0];
    } catch (ex) {
      console.log(ex.message);
    }
    return null;
  };

  static resolvePrices = (product) => {
    try {
      const { price, shippingDetails } = product;
      const { unitPrice } = price;
      const discount = (price.discountType === "fixed")
        ? price.discount
        : Arithmetics.getPercentagePrice(price.discount, price.unitPrice);
      const tax = (price.taxType === "fixed")
        ? price.tax
        : Arithmetics.getPercentagePrice(price.tax, price.unitPrice);
      const shipping = shippingDetails.cost;
      return { unitPrice, discount, tax, shipping };
    } catch (ex) {
      console.log(ex.message);
    }
    return {};
  };

  /**
   * @description dollarConverter converts any currency to USD and vice-versa
   * @param {String} code currency code usually 3 characters e.g. BEZ for Bezop
   * @param {String} amount currency amount for conversion is given in another currency
   * if conversion is TO_USD or the amount in USD if to be converted into the desire currency
   * @param {String} conversion the conversion system i.e.  'TO_USD' or 'FROM_USD'
   * @returns {Number} The equivalent amount.
   */

  static dollarConverter = (code, amount, conversion = "TO_USD") => {
    if (conversion !== "TO_USD" && conversion !== "FROM_USD") {
      throw new Error("Unknown conversion type. Please enter 'TO_USD' or 'FROM_USD'");
    }
    if (typeof code !== "string" && typeof amount !== "number") {
      throw new Error("Wrong datatype for currency code or amount");
    }
    try {
      // console.log(code, amount, conversion);
      const currency = Currency.getCurrencySync(code);
      // console.log(`\r\nRecord found: ${(currency.exchange)}`);
      if (!currency.exchange) {
        throw new Error(`May be ${code} currency is not yet supported`);
      }
      const currencyPerUsd = currency.exchange;
      if (conversion === "TO_USD") return amount / currencyPerUsd;
      if (conversion === "FROM_USD") return amount * currencyPerUsd;
    } catch (err) {
      throw new Error(err);
    }
    return 0;
  };
}

export default Currency;
