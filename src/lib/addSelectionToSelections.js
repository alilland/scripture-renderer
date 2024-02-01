import optimizeSelections from './optimizeSelections';

/**
 * @description - Removes a selection if found in the array of selections
 * @param {Object} selection - the selection to remove
 * @param {Array}  selections - array of selection objects [Obj,...]
 * @param {string} string - the text selections are found in
 * @returns {Array} - array of selection objects
 */
const addSelectionToSelections = (selection, selections, string) => {
  selections = Array.from(selections);
  selections.push(selection);
  selections = optimizeSelections(string, selections);
  return selections;
};

export default addSelectionToSelections
