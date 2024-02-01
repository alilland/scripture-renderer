/**
 * make sure that chapter and verse are lower than or equal to end chapter and verse
 * @param {int} chapter
 * @param {int} verse
 * @param {int} endChapter
 * @param {int} endVerse
 * @returns {boolean}
 */
function isVerseInRange(chapter, verse, endChapter, endVerse) {
  if (chapter < endChapter) {
    return true;
  }

  if (chapter === endChapter) {
    if (verse <= endVerse) {
      return true;
    }
  }
  return false;
}

export default isVerseInRange;
