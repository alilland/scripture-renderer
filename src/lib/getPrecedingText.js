import xre from 'xregexp';
import getRegexForWord from './getRegexForWord';

/**
 *
 * @param {string} string - The entire string to use to find the preceding text
 * @param {string} subquote - The subquote to find the preceding text of
 * @param {number} occurrence - The occurrence of the string in the entire string
 * @param {number} index - The index of the subquote
 */
const getPrecedingText = (string, subquote, occurrence, index = 0) => {
  const regex = getRegexForWord(subquote);
  let splitString = xre.split(string, regex);
  if (occurrence === -1) {
    //Need every occurrence of the subquote
    //Using the index instead of the occurrence
    return splitString.slice(0, index + 1).join(subquote);
  } else {
    //Return the subquote at the specified occurrence
    //of the entire string
    return splitString.slice(0, occurrence).join(subquote);
  }
};

export default getPrecedingText
