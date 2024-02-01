import chapterRangeContainedInChapter from './chapterRangeContainedInChapter'
import chapterVerseRangeContainedInChapter from './chapterVerseRangeContainedInChapter'
import chapterRangeContainedInChapterRange from './chapterRangeContainedInChapterRange'
import chapterVerseRangeContainedInChapterRange from './chapterVerseRangeContainedInChapterRange'

/**
 * @private
 * Tests if a specific verse chunk contains a specific verse range
 *
 * @param {{chapter, verse, endChapter, endVerse}} verseChunkToSearch - Verse chunk that we will search for searchChunk within
 * @param {{chapter, verse, endChapter, endVerse}} searchChunk - Verse range chunk we are checking is to be contained within verseChunkToSearch
 * @param {boolean} strict - Flag to determine if search chunk should be FULLY contained verseChunkToSearch.
 * @returns {boolean} - true if verse range is contained within a reference, false otherwise.
 */
function chunkContainsVerseRange (verseChunk, searchChunk, strict) {
  if (!verseChunk.endChapter) {
    if (searchChunk.endChapter) {
      return chapterRangeContainedInChapter(verseChunk, searchChunk, strict)
    }
    return chapterVerseRangeContainedInChapter(verseChunk, searchChunk, strict)
  } else {
    if (searchChunk.endChapter) {
      return chapterRangeContainedInChapterRange(
        verseChunk,
        searchChunk,
        strict
      )
    } else if (
      verseChunk.chapter <= searchChunk.chapter &&
      searchChunk.chapter <= verseChunk.endChapter
    ) {
      return chapterVerseRangeContainedInChapterRange(
        verseChunk,
        searchChunk,
        strict
      )
    }
    return false
  }
}

export default chunkContainsVerseRange
