class Arithmetics {
  static getPercentagePrice = (percentage, total) => ((Number(total) / 100) * Number(percentage));

  static getPricePercentage = (amount, total) => Math.floor((100 / Number(total)) * Number(amount));
}

export default Arithmetics;
