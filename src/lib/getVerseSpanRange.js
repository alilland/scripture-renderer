/**
 * get verse range from span
 * @param {string} verseSpan
 * @return {{high: number, low: number}}
 */
function getVerseSpanRange(verseSpan) {
  let [low, high] = verseSpan.split('-');

  if (low && high) {
    low = parseInt(low, 10);
    high = parseInt(high, 10);

    if ((low > 0) && (high >= low)) {
      return { low, high };
    }
  }
  return {};
}

export default getVerseSpanRange
