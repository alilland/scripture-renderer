/**
 * convert value to int if string, otherwise just return value
 * @param {string|int} value
 * @returns {int}
 */
function toInt (value) {
  return (typeof value === 'string') ? parseInt(value, 10) : value;
}

export default toInt;
