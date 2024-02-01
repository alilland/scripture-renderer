import toInt from './toInt';
import getRangeSeparator from './getRangeSeparator';

/**
 * return integer of value (string or int) if valid, otherwise just return value
 * @param {string|int} value
 * @returns {int|int}
 */
export function toIntIfValid (value) {
  if (typeof value === 'string') {
    const pos = getRangeSeparator(value);

    if (pos >= 0) {
      return value;
    }

    if (value.includes('ff')) {
      return value;
    }

    const intValue = toInt(value);

    if (!isNaN(intValue)) {
      return intValue;
    }
  }

  return value;
}

export default toIntIfValid
