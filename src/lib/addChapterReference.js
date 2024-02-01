import toIntIfValid from './toIntIfValid'
import getRangeSeparator from './getRangeSeparator'

/**
 * @private
 * If valid chapter reference, add chapter object to verse chunks list
 *
 * @param {verseChunk[]} verseChunks - Array of verse chunks
 * @param {string} chapterRef - Chapter reference to add to verse chunks
 * @returns {verseChunks[]} - Array copy with new chapter reference if valid, or input array if not
 */
function addChapterReference(verseChunks, chapterRef) {
  const isRange = getRangeSeparator(chapterRef) >= 0

  if (isRange) {
    const pos = getRangeSeparator(chapterRef);
    const foundRange = pos >= 0;

    if (foundRange) {
      const start = toIntIfValid(chapterRef.substring(0, pos));
      const end = toIntIfValid(chapterRef.substring(pos + 1));

      return [...verseChunks, { chapter: start, endChapter: end }]
    }
  } else {
    return [...verseChunks, { chapter: toIntIfValid(chapterRef) }]
  }

  return verseChunks
}

export default addChapterReference
