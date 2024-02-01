import isEqual from 'deep-equal';
import selectionsToRanges from './selectionsToRanges';
import optimizeRanges from './optimizeRanges';
import rangesToSelections from './rangesToSelections';

/**
 * @description - This abstracts complex handling of selections such as order, deduping, concatenating, overlapping ranges
 * @param {string} string - the text selections are found in
 * @param {array}  selections - array of selection objects [Obj,...]
 * @returns {array} - array of selection objects
 */
export const optimizeSelections = (string, selections) => {
  let optimizedSelections; // return
  // filter out the random clicks from the UI
  selections = selections.filter((selection) => {
    const blankSelection = { text: '', occurrence: 1, occurrences: 0 };
    return !isEqual(selection, blankSelection);
  });
  let ranges = selectionsToRanges(string, selections); // get char ranges of each selection
  ranges = optimizeRanges(ranges); // optimize the ranges
  optimizedSelections = rangesToSelections(string, ranges); // convert optimized ranges into selections
  return optimizedSelections;
};

export default optimizeSelections
