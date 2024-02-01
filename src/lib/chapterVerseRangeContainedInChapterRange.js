/**
 * @private
 * Checks if chapter verse range (i.e 1:3-7 || 3:7-12) exists within chapter range (i.e 1:2-3:6 || 4:6-8:2)
 *
 * @param {{chapter, verse, endChapter, endVerse}} chapterRange - Verse chunk that represents a chapter range (i.e 1:2-3:6 || 4:6-8:2)
 * @param {{chapter, verse, endVerse}} chapterSearchChunk - Verse chunk that represents a chapter verse range (i.e 1:3-7 || 3:7-12)
 * @param {boolean} strict - Flag to determine if chapter verse range should be FULLY contained within chapter range.
 * @returns {boolean} - true if chapter verse range is within chapter range, false otherwise
 */
function chapterVerseRangeContainedInChapterRange(
  chapterRange,
  chapterSearchChunk,
  strict
) {
  if (strict) {
    if (chapterSearchChunk.chapter === chapterRange.chapter) {
      return chapterSearchChunk.verse >= chapterRange.verse
    }
    if (chapterSearchChunk.chapter === chapterRange.endChapter) {
      return chapterSearchChunk.endVerse <= chapterRange.endVerse
    }
    return true
  } else {
    if (
      chapterSearchChunk.chapter > chapterRange.endChapter ||
      chapterSearchChunk.chapter < chapterRange.chapter
    ) {
      return false
    }
    if (chapterSearchChunk.chapter === chapterRange.endChapter) {
      if (!chapterRange.verse) {
        return true
      }
      if (chapterSearchChunk.verse > chapterRange.endVerse) {
        return false
      }
    }
    if (chapterSearchChunk.chapter === chapterRange.chapter) {
      if (!chapterRange.verse) {
        return true
      }
      if (chapterSearchChunk.endVerse < chapterRange.verse) {
        return false
      }
    }
    return true
  }
}

export default chapterVerseRangeContainedInChapterRange
