import parseReferenceToList from './parseReferenceToList';
import findVerseInVerseRange from './findVerseInVerseRange';
import isVerseInRange from './isVerseInRange';

/**
 * finds all verses from bookData contained in ref, then returns array of references and verse data
 * @param {object} bookData - indexed by chapter and then verse ref
 * @param {string} ref - formats such as “2:4-5”, “2:3a”, “2-3b-4a”, “2:7,12”, “7:11-8:2”, "6:15-16;7:2"
 * @returns {Object[]} - Array of objects with chapter, verse, verseData values
 */
function getVerses (bookData, ref) {
  const verses = [];
  const chunks = parseReferenceToList(ref);
  let chapterData, verseData;

  for (const chunk of chunks) {
    if (!chunk.endVerse) {
      const chapter = chunk.chapter;
      chapterData = bookData[chapter];
      let verseKey = chunk.verse;
      verseData = chapterData && chapterData[verseKey];

      if (!verseData && chapterData) { // if verse doesn't exist, check for verse spans in chapter data
        const __ret = findVerseInVerseRange(chapterData, verseKey, chapter);

        if (__ret.foundVerseKey) {
          verseKey = __ret.verse;
          verseData = __ret.verseData;
        }
      }

      verses.push({
        chapter,
        verse: verseKey,
        verseData,
      });
    } else { // handle range
      let chapter = chunk.chapter;
      let verse = chunk.verse;
      const endVerse = chunk.endVerse;
      const endChapter = chunk.endChapter || chapter;

      while (isVerseInRange(chapter, verse, endChapter, endVerse)) {
        chapterData = bookData[chapter];
        verseData = chapterData && chapterData[verse];
        let verseKey = verse;

        if (!verseData && chapterData) { // if verse doesn't exist, check for verse spans in chapter data
          const __ret = findVerseInVerseRange(chapterData, verseKey, chapter);

          if (__ret.foundVerseKey) {
            verseKey = __ret.verse;
            verseData = __ret.verseData;
            verse = __ret.nextVerse - 1; // correct for autoincrement
          }
        }

        if (!verseData) { // if past end of chapter, skip to next
          chapter += 1;
          verse = 1;
          continue;
        }

        verses.push({
          chapter,
          verse: verseKey,
          verseData,
        });
        verse += 1;
      }
    }
  }

  return verses;
}

export default getVerses
