import occurrences from './occurrences';

/**
 * @description This checks to see if the string still has the same number of occurrences.
 * It should remove the selections that the occurrences do not match
 * @param {string} string - the text selections are found in
 * @param {array}  selections - array of selection objects [Obj,...]
 * @returns {array} - array of selection objects
 */
const checkSelectionOccurrences = (string, selections) => {
  selections = selections.filter((selection) => {
    let count = occurrences(string, selection.text);
    return count === selection.occurrences;
  });
  return selections;
};

export default checkSelectionOccurrences
