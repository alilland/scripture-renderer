import isVerseSpan from './isVerseSpan';
import getVerseSpanRange from './getVerseSpanRange';

/**
 * @private
   * check if verse is within a verse range (e.g. 2-4)
 * @param {object} chapterData - indexed by verse ref
 * @param {number} verse - verse to match
 * @param {number} chapter - current chapter
 * @returns {{verseData, verse: number, foundVerseKey, nextVerse}}
 */
function findVerseInVerseRange (chapterData, verse, chapter) {
  const verseKeys = Object.keys(chapterData);
  let foundVerseKey, verseData, verseKey, nextVerse;

  for (verseKey of verseKeys) {
    if (isVerseSpan(verseKey)) {
      const { low, high } = getVerseSpanRange(verseKey);

      if ((verse >= low) && (verse <= high)) {
        verseData = chapterData[verseKey];
        foundVerseKey = verse;
        nextVerse = high + 1; // move to verse after range
        break;
      }
    }
  }
  return {
    foundVerseKey,
    verse: verseKey,
    verseData,
    nextVerse,
  };
}

export default findVerseInVerseRange
