import getPrecedingOccurrences from './getPrecedingOccurrences';

/**
 * @description Function that count occurrences of a substring in a string
 * @param {String} string - The string to search in
 * @param {String} subString - The sub string to search for
 * @return {Integer} - the count of the occurrences
 * @see http://stackoverflow.com/questions/4009756/how-to-count-string-occurrence-in-string/7924240#7924240
 * modified to fit our use cases, return zero for '' substring, and no use case for overlapping.
 */
const occurrencesInString = (stringMap, subString) => {
  return getPrecedingOccurrences(stringMap, subString);
};

export default occurrencesInString
