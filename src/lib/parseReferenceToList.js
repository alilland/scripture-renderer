import addChapterReference from './addChapterReference'
import getChapterVerse from './getChapterVerse'
import getRange from './getRange'

/**
 * takes a reference and splits into individual verses or verse spans.
 * @param {string} ref - reference in format such as:
 *   “2:4-5”, “2:3a”, “2-3b-4a”, “2:7,12”, “7:11-8:2”, "6:15-16;7:2"
 * @return {verseChunk[]}  The Verse Chunk returned
 */
function parseReferenceToList (ref) {
  try {
    let verseChunks = [];
    const refChunks = ref.split(';');
    let lastChapter = 1;

    for (const refChunk of refChunks) {
      // 1:1-23,32 ; 1-3
      if (!refChunk) {
        continue;
      }

      // If no semicolon (no verses), reference is either a chapter, chapter range, or invalid
      if (!refChunk.includes(':')) {
        verseChunks = addChapterReference(verseChunks, refChunk)
        continue;
      }

      const verseParts = refChunk.split(',');
      // get the object from the first chunk before the comma
      let {
        chapter,
        verse,
        foundChapterVerse,
      } = getChapterVerse(verseParts[0]);

      if (!foundChapterVerse) {
        chapter = verse;
        verse = null;
      }

      lastChapter = chapter;

      const range = getRange(verse);

      verseChunks.push({
        ...range,
        chapter,
      });

      if (range.endChapter) {
        lastChapter = range.endChapter;
      }

      // get the object from the rest of the chunks after the comma
      for (let i = 1; i < verseParts.length; i++) {
        const versePart = verseParts[i];

        if (!versePart) {
          continue;
        }

        let {
          chapter: chapter_,
          verse: verse_,
          foundChapterVerse,
        } = getChapterVerse(versePart);

        if (foundChapterVerse) {
          chapter = chapter_;
          verse = verse_;
          lastChapter = chapter;
        } else {
          chapter = lastChapter;
          verse = verse_;
        }

        const range = getRange(verse);

        if (range.endVerse) {
          verseChunks.push({
            ...range,
            chapter,
          });

          if (range.endChapter) {
            lastChapter = range.endChapter;
          }
        } else { // not range
          verseChunks.push({
            verse: range.verse,
            chapter,
          });
        }
      }
    }
    return verseChunks;
  } catch (e) {
    console.warn(`parseReferenceToList() - invalid ref: "${ref}"`, e);
  }
  return null;
}

export default parseReferenceToList
