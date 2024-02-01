/**
 *
 * @param {string} string - Entire string to search within 'Blessed be the name of the Lord'
 * @param {string} subString - substring to search for inside of entire string i.e. 'bless, blessed, blessing'
 * @return {number}
 */
const getQuoteOccurrencesInVerse = (string, subString) => {
  let n = 0;
  if (subString.length <= 0) return 0;
  if (subString.split(',').length > 1) {
    let stringArray = subString.split(',');
    stringArray.forEach((element) => {
      n += getQuoteOccurrencesInVerse(string, element.trim());
    });
    return n;
  }
  if (subString.includes('...')) subString = subString.replace('...', '.*');
  const regex = new RegExp(`\\W+${subString}\\W+`, 'g');
  let matchedSubstring;
  while ((matchedSubstring = regex.exec(string)) !== null) {
    // This is necessary to avoid infinite loops with zero-width matchedSubstring
    if (matchedSubstring.index === regex.lastIndex) {
      regex.lastIndex++;
    }
    n++;
  }
  return n;
};

export default getQuoteOccurrencesInVerse
