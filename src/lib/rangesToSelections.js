import occurrencesInString from './occurrencesInString';

/**
 * @description - This converts ranges to array of selection objects
 * @param {string} string - text used to get the ranges of
 * @param {array} ranges - array of ranges [[int,int],...]
 * @return {array} - array of selection objects
 */
export const rangesToSelections = (string, ranges) => {
  let selections = [];
  ranges.forEach((range) => {
    const start = range[0]; // set the start point
    const end = range[1]; // set the end point
    const length = end - start + 1; // get the length of the sub string
    const subString = string.substr(start, length); // get text of the sub string
    const beforeText = string.substr(0, start); // get the string prior to the range
    const beforeMatches = occurrencesInString(beforeText, subString); // get occurrences prior to range
    const occurrence = beforeMatches + 1; // get number of this occurrence
    const occurrences = occurrencesInString(string, subString); // get occurrences in string
    const selection = {
      text: subString,
      occurrence: occurrence,
      occurrences: occurrences,
    };
    if (occurrences > 0) {
      // there are some edge cases where empty strings get through but don't have occurrences
      selections.push(selection);
    }
  });
  return selections;
};

export default rangesToSelections;
