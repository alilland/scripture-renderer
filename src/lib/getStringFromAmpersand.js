/**
 * This function will return the text in between
 * to ampersand (inclusive of the container words) given the occurrence
 *
 * @param {string} _string - The string to search
 * @param {*} quote - The substring which contains an ampersand to search for
 * @param {*} occurrence - The occurrence of the quote to search for
 */
const getStringFromAmpersand = (_string, quote, occurrence) => {
  const [lower, upper] = quote.split('&');
  const reg = new RegExp(
    '(?:.*?' +
    lower +
    '.*' +
    upper +
    `){${occurrence - 1}}.*?(` +
    lower +
    '.*' +
    upper +
    ').*'
  );
  const string = _string.slice(0);
  const matches = string.match(reg) || [];
  return matches[1];
};

export default getStringFromAmpersand
