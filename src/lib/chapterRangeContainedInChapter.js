/**
 * @private
 * Checks to see if chapter range (i.e 1:2-3:6 || 4:6-8:2) is contained within chapter verse range (i.e 1:3-7 || 3:7-12)
 *
 * @param {{chapter, verse, endVerse}} chapter - Verse chunk that represents a chapter verse range (i.e 1:3-7 || 3:7-12)
 * @param {{chapter, verse, endChapter, endVerse}} searchChapterRange - Verse chunk that represents a chapter range (i.e 1:2-3:6 || 4:6-8:2)
 * @param {boolean} strict - Flag to determine if chapter range should be FULLY contained within chapter verse range.
 * @returns {boolean} - true if chapter range is within chapter, false otherwise
 */
function chapterRangeContainedInChapter(
  chapter,
  searchChapterRange,
  strict = false
) {
  if (strict) {
    return false
  } else {
    if (
      searchChapterRange.endChapter < chapter.chapter ||
      searchChapterRange.chapter > chapter.chapter
    ) {
      return false
    }
    if (searchChapterRange.endChapter === chapter.chapter) {
      if (!chapter.verse) {
        return true
      }
      if (!chapter.endVerse && searchChapterRange.endVerse < chapter.verse) {
        return false
      }
      if (chapter.endVerse === 'ff') {
        return searchChapterRange.endVerse >= chapter.verse
      }
      if (searchChapterRange.endVerse < chapter.verse) {
        return false
      }
      return true
    }
    if (searchChapterRange.chapter === chapter.chapter) {
      if (!chapter.verse) {
        return true
      }
      if (!chapter.endVerse) {
        if (searchChapterRange.verse > chapter.verse) {
          return false
        }
        return true
      }
      if (chapter.endVerse === 'ff') {
        return true
      }
      if (searchChapterRange.verse > chapter.endVerse) {
        return false
      }
      return true
    } else return true
  }
}

export default chapterRangeContainedInChapter
