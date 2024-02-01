import RANGE_SEPARATORS from '../constants/RANGE_SEPARATORS'

/**
 * @private
 * look for possible dash and hyphen character to see if versePart is a verse range
 * @param {string} versePart
 * @return {number} position of dash or hyphen found, or -1 if not found
 */
function getRangeSeparator (versePart) {
  for (const separator of RANGE_SEPARATORS) {
    const pos = versePart.indexOf(separator);

    if (pos >= 0) {
      return pos;
    }
  }
  return -1;
}

export default getRangeSeparator
