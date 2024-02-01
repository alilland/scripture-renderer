/**
 * This function gets the correct amount of occurrences to provide the function getPrecedingText
 *
 * @param {number} occurrence - The occurrence of the subquote in the string
 * @param {number} index - The current index of the subquotes
 * @param {number} precedingOccurrences - The number of occurrences before the current subquote in the string
 */
const getCurrentOccurrenceFromPrecedingText = (
  occurrence,
  index,
  precedingOccurrences
) => {
  if (occurrence === -1 || index === 0) {
    return occurrence;
  } else {
    return precedingOccurrences + 1;
  }
};

export default getCurrentOccurrenceFromPrecedingText;
