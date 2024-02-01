/**
 * @description - This converts ranges to array of selection objects
 * @param {string} string - text used to get the ranges of
 * @param {array} selections - array of selections [obj,...]
 * @returns {array} - array of range objects
 */
export const selectionsToRanges = (string, selections) => {
  let ranges = []; // response
  selections.forEach((selection) => {
    if (string && string.includes(selection.text)) {
      // conditions to prevent errors
      const splitArray = string.split(selection.text); // split the string to get the text between occurrences
      const beforeSelection = splitArray
        .slice(0, selection.occurrence)
        .join(selection.text); // get the text before the selection to handle multiple occurrences
      const start = beforeSelection.length; // the start position happens at the length of the string that comes before it
      const end = start + selection.text.length - 1; // the end position happens at the end of the selection text, but length doesn't account for 0 based position start
      const range = [start, end]; // new range
      ranges.push(range); // add the new range
    }
  });
  return ranges;
};

export default selectionsToRanges;
