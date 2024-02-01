import { sortBy, uniq } from 'lodash';

/**
 * @description - This abstracts complex handling of ranges such as order, deduping, concatenating, overlaps
 * @param {array}  ranges - array of ranges [[int,int],...]
 * @returns {array} - array of optimized ranges [[int,int],...]
 */
const optimizeRanges = (ranges) => {
  let optimizedRanges = []; // response
  if (ranges.length === 1) return ranges; // if there's only one, return it
  ranges = sortBy(ranges, (range) => range[1]); // order ranges by end char index as secondary
  ranges = sortBy(ranges, (range) => range[0]); // order ranges by start char index as primary
  ranges = uniq(ranges); // remove duplicates
  // combine overlapping and contiguous ranges
  let runningRange = []; // the running range to merge overlapping and contiguous ranges
  ranges.forEach((currentRange, index) => {
    const currentStart = currentRange[0];
    const currentEnd = currentRange[1];
    let runningStart = runningRange[0];
    let runningEnd = runningRange[1];
    if (currentStart >= runningStart && currentStart <= runningEnd + 1) {
      // the start occurs in the running range and +1 handles contiguous
      if (currentEnd >= runningStart && currentEnd <= runningEnd) {
        // if the start occurs inside running range then let's check the end
        // if the end occurs inside the running range then it's inside it and doesn't matter
      } else {
        // the end doesn't occur inside the running range
        runningRange[1] = runningEnd = currentEnd; // extend running range
      }
    } else {
      // the start does not occur in the running range
      if (runningRange.length !== 0) optimizedRanges.push(runningRange); // the running range is closed push it to optimizedRanges
      runningRange = currentRange; // reset the running range to this one
    }
    if (ranges.length === index + 1 && runningEnd - runningStart >= 0) {
      // this is the last one and it isn't blank
      optimizedRanges.push(runningRange); // push the last one to optimizedRanges
    }
  });
  return optimizedRanges;
};

export default optimizeRanges
