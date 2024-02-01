/**
 * @private
 * Checks if chapter verse range (i.e 1:3-7 || 3:7-12) exists within another chapter verse range
 *
 * @param {{chapter, verse, endVerse}} chapterVerseRange - Verse chunk that represents a chapter verse range (i.e 1:3-7 || 3:7-12)
 * @param {{chapter, verse, endVerse}} searchRange - Verse chunk that represents a chapter verse range (i.e 1:3-7 || 3:7-12)
 * @param {boolean} strict - Flag to determine if chapter verse range should be FULLY contained within chapter verse range.
 * @returns {boolean} - true if chapter verse range is within chapter, false otherwise
 */
function chapterVerseRangeContainedInChapter(
  chapterVerseRange,
  searchRange,
  strict = false
) {
  if (searchRange.chapter === chapterVerseRange.chapter) {
    if (chapterVerseRange.verse) {
      if (!chapterVerseRange.endVerse) {
        if (strict) return false
        if (
          searchRange.endVerse < chapterVerseRange.verse ||
          searchRange.verse > chapterVerseRange.verse
        ) {
          return false
        }
        return true
      }
      if (chapterVerseRange.endVerse === 'ff') {
        if (strict) {
          return chapterVerseRange.verse <= searchRange.verse
        } else {
          return searchRange.endVerse >= chapterVerseRange.verse
        }
      } else {
        if (strict) {
          return (
            chapterVerseRange.verse <= searchRange.verse &&
            searchRange.endVerse <= chapterVerseRange.endVerse
          )
        } else {
          // Search range is completely before or completely after chapter range to search
          if (
            searchRange.endVerse < chapterVerseRange.verse ||
            searchRange.verse > chapterVerseRange.endVerse
          ) {
            return false
          } else return true
        }
      }
    } else return true
  } else return false
}

export default chapterVerseRangeContainedInChapter
