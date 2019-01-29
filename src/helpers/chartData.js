import Validator from "./validator";

export function getWeeklySales() {
  return {
    labels: ["M", "T", "W", "T", "F", "S", "S"],
    series: [[0, 0, 0, 0, 0, 0, 0]],
  };
}

export function getMonthlySales() {
  return {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "Mai",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    series: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
  };
}

export function getDailySales() {
  return {
    labels: ["12am", "3am", "6am", "9am", "12pm", "3pm", "6pm", "9pm"],
    series: [[0, 0, 0, 0, 0, 0, 0, 0]],
  };
}

export function getTotalOrder(orders) {
  return orders.length;
}
export function getOrderStatus(orders, status) {
  return orders
    .filter(order => order.orderStatus.toLowerCase() === status)
    .length;
}

export function getUsedCoupon(orders) {
  return orders
    .filter(order => Validator.propertyExist(order, "coupon"))
    .length;
}

export function getTotalProduct(products) {
  return products.length;
}

export function getTotalStock(stocks) {
  return stocks.length;
}

export function getTotalCategory(categories) {
  return categories.length;
}

export function getTotalBrand(brands) {
  return brands.length;
}
