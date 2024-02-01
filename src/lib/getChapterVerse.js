import toIntIfValid from './toIntIfValid'
/**
 * @private
 * parse ref to see if chapter:verse
 * @param ref
 * @returns {{chapter: string, foundChapterVerse: boolean, verse: string}}
 */
function getChapterVerse (ref) {
  if (typeof ref !== 'string') {
    return { verse: ref };
  }

  const pos = (ref || '').indexOf(':');
  const foundChapterVerse = pos >= 0;
  let chapter, verse;

  if (foundChapterVerse) {
    chapter = toIntIfValid(ref.substring(0, pos));
    verse = toIntIfValid(ref.substring(pos + 1));
  } else {
    verse = toIntIfValid(ref);
  }
  return {
    chapter,
    verse,
    foundChapterVerse,
  };
}

export default getChapterVerse
