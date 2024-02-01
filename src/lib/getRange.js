import getChapterVerse from './getChapterVerse';
import toIntIfValid from './toIntIfValid';
import getRangeSeparator from './getRangeSeparator';

/**
 * check if verse range
 * @param ref
 * @returns {{verse}}
 */
function getRange (ref) {
  const refType = typeof (ref);
  const isNumber = refType === 'number';

  if (!isNumber) {
    const pos = getRangeSeparator(ref);
    const foundRange = pos >= 0;

    if (foundRange) {
      const start = toIntIfValid(ref.substring(0, pos));
      const endStr = ref.substring(pos + 1);

      let {
        chapter,
        verse,
        foundChapterVerse,
      } = getChapterVerse(endStr);

      if (foundChapterVerse) {
        return {
          verse: start,
          endChapter: chapter,
          endVerse: verse,
        };
      } else {
        return {
          verse: start,
          endVerse: toIntIfValid(endStr),
        };
      }
    } else if (ref.toLowerCase().includes('ff')) {
      const followingPos = ref.indexOf('ff')
      const start = toIntIfValid(ref.substring(0, followingPos));

      return {
        verse: start,
        endVerse: 'ff'
      }
    }
  }

  return { verse: ref };
}

export default getRange
