import verseObjectsToString from './verseObjectsToString'
import selectionsFromQuoteAndString from './selectionsFromQuoteAndString'

/**
 * The function will find the quote in the verse object
 * @param {string} quote - The orignal quote to find
 * @param {object} verseObjects - verse ojects to search
 * @param {number} occurrence - The occurence to match
 * @returns {[]} - The quotes we found
 */
const selectionsFromQuoteAndVerseObjects = ({
  quote,
  verseObjectsMap,
  occurrence,
}) => {
  let selections = new Map();
  let stringMap = new Map();
  stringMap = verseObjectsToString(verseObjectsMap);
  selections = selectionsFromQuoteAndString({ quote, stringMap, occurrence });
  return selections;
};

export default selectionsFromQuoteAndVerseObjects;
