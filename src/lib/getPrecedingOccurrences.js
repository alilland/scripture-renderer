import xre from 'xregexp';
import getRegexForWord from './getRegexForWord';

/**
 * This counts the number of subquotes in the string
 * @param {string} string - string we are searching in
 * @param {string} subquote - string we are searching for
 * @returns {number} number
 */
const getPrecedingOccurrences = (string, subquote) => {
  if (!string || !subquote) {
    return 0;
  }
  const regex = getRegexForWord(subquote);
  const matches = xre.match(string, regex, 'all');
  const count = matches && matches.length || 0;
  return count;
};

export default getPrecedingOccurrences;
