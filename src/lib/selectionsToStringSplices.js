import optimizeSelections from './optimizeSelections';
import selectionsToRanges from './selectionsToRanges';
import spliceStringOnRanges from './spliceStringOnRanges';

/**
 * @description - Splice string into array of substrings, flagging what is selected
 * @param {string} string - text used to get the ranges of
 * @param {array} selections - array of selections [obj,...]
 * @returns {array} - array of objects
 */
const selectionsToStringSplices = (string, selections) => {
  let splicedStringArray = []; // response
  selections = optimizeSelections(string, selections); // optimize them before converting
  const ranges = selectionsToRanges(string, selections); // convert the selections to ranges
  splicedStringArray = spliceStringOnRanges(string, ranges); // splice the string on the ranges
  return splicedStringArray; // return the spliced string
};

export default selectionsToStringSplices
