/**
 * Splice string into array of substrings, flagging what is selected
 * @param {string} string - text used to get the ranges of
 * @param {array} selections - array of selections [obj,...]
 * @return {array} - array of objects
 */
const selectionArray = (string, selections) => {
  let selectionArray = [];
  let ranges = module.exports.selectionsToRanges(string, selections);
  selectionArray = module.exports.spliceStringOnRanges(string, ranges);
  return selectionArray;
};

export default selectionArray
