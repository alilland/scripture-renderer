/**
 * @private
 * Checks if chapter range (i.e 1:2-3:6 || 4:6-8:2) exists within another chapter range
 *
 * @param {{chapter, verse, endChapter, endVerse}} chapterRange - Verse chunk that represents a chapter range (i.e 1:2-3:6 || 4:6-8:2)
 * @param {{chapter, verse, endChapter, endVerse}} rangeSearchChunk - Verse chunk that represents a chapter range (i.e 1:2-3:6 || 4:6-8:2)
 * @param {boolean} strict - Flag to determine if chapter range should be FULLY contained within chapter range.
 * @returns {boolean} - true if chapter range is within chapter range, false otherwise
 */
function chapterRangeContainedInChapterRange(
  chapterRange,
  rangeSearchChunk,
  strict = false
) {
  if (strict) {
    if (
      chapterRange.chapter <= rangeSearchChunk.chapter &&
      rangeSearchChunk.endChapter <= chapterRange.endChapter
    ) {
      if (chapterRange.verse) {
        if (
          rangeSearchChunk.chapter === chapterRange.chapter &&
          rangeSearchChunk.endChapter === chapterRange.endChapter
        ) {
          return (
            rangeSearchChunk.verse >= chapterRange.verse &&
            rangeSearchChunk.endVerse <= chapterRange.endVerse
          )
        }
        if (rangeSearchChunk.chapter === chapterRange.chapter) {
          return rangeSearchChunk.verse >= chapterRange.verse
        }
        if (rangeSearchChunk.endChapter === chapterRange.endChapter) {
          return rangeSearchChunk.endVerse <= chapterRange.endVerse
        }
        return true
      } else return true
    }
    return false
  } else {
    if (
      rangeSearchChunk.endChapter < chapterRange.chapter ||
      rangeSearchChunk.chapter > chapterRange.endChapter
    ) {
      return false
    }
    if (rangeSearchChunk.endChapter === chapterRange.chapter) {
      if (!chapterRange.verse) {
        return true
      }
      if (rangeSearchChunk.endVerse < chapterRange.verse) {
        return false
      }
    }
    if (rangeSearchChunk.chapter === chapterRange.endChapter) {
      if (!chapterRange.verse) {
        return true
      }
      if (rangeSearchChunk.verse > chapterRange.endVerse) {
        return false
      }
    }
    return true
  }
}

export default chapterRangeContainedInChapterRange
