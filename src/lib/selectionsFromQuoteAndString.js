import normalizeString from './normalizeString';
import occurrencesInString from './occurrencesInString';
import getPrecedingOccurrences from './getPrecedingOccurrences';
import getCurrentOccurrenceFromPrecedingText from './getCurrentOccurrenceFromPrecedingText';
import getPrecedingText from './getPrecedingText';
import subSelectionsFromSubquote from './subSelectionsFromSubquote';

/**
 * The function will find the quote inside the string
 * @param {string} quote - The orignal quote to find
 * @param {string} string - orignal text to search
 * @param {number} occurrence - The occurence to match
 * @returns {[]} - The quotes we found
 */
const selectionsFromQuoteAndString = ({
  quote,
  stringMap: rawStringMap,
  occurrence,
}) => {
  let stringMap = new Map();
  rawStringMap.forEach((rawString, ref) => {
    const string = normalizeString(rawString);
    stringMap.set(ref, string);
  })
  // Calculate has Ampersand before normalizing quote.
  let _subquotes = quote.replace(/( ?… ?)+/g, " & "); //replace elipsis with '&'
  let subquotes = _subquotes.split('&').map(normalizeString);
  let selections = new Map();
  const hasAmpersand = subquotes.length > 1;
  quote = normalizeString(quote);

  let occurrenceCount = 0;
  stringMap.forEach((string, ref) => {
    let occurrences;
    let _subquotes = subquotes;
    if (_subquotes.length === 1) {
      occurrences = occurrencesInString(string, quote);
      _subquotes = new Array(occurrences || 1).fill(quote);
    }
    let precedingOccurrences = 0;
    let precedingText = '';

    _subquotes.forEach((subquote) => {
      precedingOccurrences = getPrecedingOccurrences(precedingText, subquote);

      const index = precedingOccurrences + 1;
      const currentOccurrence = getCurrentOccurrenceFromPrecedingText(
        occurrence,
        index,
        precedingOccurrences
      );

      precedingText = getPrecedingText(
        string,
        subquote,
        currentOccurrence,
        precedingOccurrences
      );

      if (occurrences) {
        occurrenceCount++;
      }

      if (hasAmpersand || occurrenceCount === occurrence || occurrence === -1) {
        const subSelections = subSelectionsFromSubquote({
          subquote,
          index,
          precedingText,
          string,
        });
        const _selections = selections.get(ref) || []
        subSelections.forEach((subSelection) => _selections.push(subSelection));
        selections.set(ref, _selections);
      }

      /** Adding the previous subquote to account for repeated ampersand words i.e. Θεοῦ&Θεοῦ */
      precedingText += subquote;
    });
  })

  return selections;
}

export default selectionsFromQuoteAndString
