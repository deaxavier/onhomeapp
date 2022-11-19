import Moment from 'moment';

/**
 * formatar um número
 * @param {*} amount 
 * @param {*} decimalCount 
 * @param {*} decimal 
 * @param {*} thousands 
 * @returns 
 */
export const formatNumber = (amount, decimalCount = 2, decimal = ",", thousands = ".") => {
  try {
    decimalCount = Math.abs(decimalCount);
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

    const negativeSign = amount < 0 ? "-" : "";

    let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
    let j = (i.length > 3) ? i.length % 3 : 0;

    return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
  } catch (e) {
    console.log(e)
  }
};

/**
 * formatar a data
 * @param {*} date 
 * @param {*} format 
 * @returns 
 */
export const formatDate = (date, format) => {
  if (date == null)
    return "";
  return Moment(date).format(format)
}
