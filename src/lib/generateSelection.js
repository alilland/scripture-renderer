import normalizeString from './normalizeString';
import tokenizer from './tokenizer';

/**
 * Most everything below this is borrowed and adapted from
 * https://github.com/unfoldingWord/selections/blob/master/src/js/selections.js
 * and
 * https://github.com/unfoldingWord/tc-strings/blob/master/src/js/strings.js
 */

/**
 * @description - generates a selection object from the selected text, precedingText and whole text
 * @param {String} selectedText - the text that is selected
 * @param {String} precedingText - the text that prescedes the selection
 * @param {String} entireText - the text that the selection should be in
 * @return {Object} - the selection object to be used
 */
const generateSelection = ({
  selectedText,
  precedingText,
  entireText,
}) => {
  // replace more than one contiguous space with a single one since HTML/selection only renders 1
  const _entireText = normalizeString(entireText);
  // Getting the occurrences before the current token
  const precedingTokens = tokenizer(precedingText);
  let precedingOccurrencesInPreviousString = precedingTokens.reduce(function (
    n,
    val
  ) {
    return n + (val === selectedText);
  },
    0);
  // calculate this occurrence number by adding it to the preceding ones
  let occurrence = precedingOccurrencesInPreviousString + 1;
  // get the total occurrences from the verse
  const allTokens = tokenizer(_entireText);
  let allOccurrences = allTokens.reduce(function (n, val) {
    return n + (val === selectedText);
  }, 0);

  return {
    text: selectedText,
    occurrence: occurrence,
    occurrences: allOccurrences,
  };
};

export default generateSelection
