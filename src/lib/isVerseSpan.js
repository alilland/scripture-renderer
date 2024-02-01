/**
* test if verse is valid verse span string
* @param {string|number} verse
* @return {boolean}
*/
function isVerseSpan (verse) {
  const isSpan = (typeof verse === 'string') && verse.includes('-');
  return isSpan;
}

export default isVerseSpan
