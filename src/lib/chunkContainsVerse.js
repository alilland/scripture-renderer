
/**
 * @private
 * Tests if a specific verse chunk contains a specific verse
 *
 * @param {{chapter, verse, endChapter, endVerse}} verseChunk
 *
 * @param {string} searchChapter
 * @param {string} searchVerse
 * @returns {boolean} - true if verse chunk contains verse, false if otherwise
 */
function chunkContainsVerse(verseChunk, searchChapter, searchVerse) {
  if (!verseChunk.endChapter) {
    if (searchChapter === verseChunk.chapter) {
      if (verseChunk.verse) {
        if (!verseChunk.endVerse) {
          return searchVerse === verseChunk.verse
        } else {
          if (verseChunk.endVerse === 'ff') {
            return verseChunk.verse <= searchVerse
          } else {
            return (
              verseChunk.verse <= searchVerse &&
              searchVerse <= verseChunk.endVerse
            )
          }
        }
      } else return true
    } else return false
  } else {
    if (
      verseChunk.chapter <= searchChapter &&
      searchChapter <= verseChunk.endChapter
    ) {
      if (verseChunk.verse) {
        if (searchChapter === verseChunk.chapter) {
          return searchVerse >= verseChunk.verse
        } else if (searchChapter === verseChunk.endChapter) {
          return searchVerse <= verseChunk.endVerse
        } else return true
      } else return true
    } else return false
  }
}

export default chunkContainsVerse
