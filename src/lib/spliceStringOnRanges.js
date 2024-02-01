import occurrencesInString from './occurrencesInString';

/**
 * @description - Splice string into array of ranges, flagging what is selected
 * @param {array} ranges - array of ranges [[int,int],...]
 * @returns {array} - array of objects [obj,...]
 */
export const spliceStringOnRanges = (string, ranges) => {
  let selectionArray = []; // response
  let remainingString = string;
  // shift the range since the loop is destructive by working on the remainingString and not original string
  let rangeShift = 0; // start the range shift at the first character
  ranges.forEach(function (range) {
    const firstCharacterPosition = range[0] - rangeShift; // original range start - the rangeShift
    const beforeSelection = remainingString.slice(0, firstCharacterPosition); // save all the text before the selection
    if (beforeSelection) {
      // only add to the array if string isn't empty
      selectionArray.push({ text: beforeSelection, selected: false });
    }
    const shiftedRangeStart = range[0] - rangeShift; // range start - the rangeShift
    const shiftedRangeEnd = range[1] + 1 - rangeShift; // range end - rangeShift + 1 to include last character
    const selection = remainingString.slice(shiftedRangeStart, shiftedRangeEnd); // save the text in the selection
    const stringBeforeRange = string.slice(0, range[0]);
    const occurrence = occurrencesInString(stringBeforeRange, selection) + 1;
    const occurrences = occurrencesInString(string, selection);
    const selectionObject = {
      text: selection,
      selected: true,
      occurrence: occurrence,
      occurrences: occurrences,
    };
    selectionArray.push(selectionObject); // add the selection to the response array
    // next iteration is using remaining string
    const lastCharacterPosition = range[1] - rangeShift + 1; // original range end position - the rangeShift + 1 to not include the last range character in the remaining string
    remainingString = remainingString.slice(lastCharacterPosition); // update the remainingString to after the range
    // shift the range up to last char of substring (before+sub)
    rangeShift += beforeSelection.length; // adjust the rangeShift by the length prior to the selection
    rangeShift += selection.length; // adjust the rangeShift by the length of the selection itself
  });
  if (remainingString) {
    // only add to the array if string isn't empty
    selectionArray.push({ text: remainingString, selected: false });
  }
  return selectionArray;
};

export default spliceStringOnRanges;
