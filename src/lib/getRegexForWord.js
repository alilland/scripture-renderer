import xre from 'xregexp';

/**
 * This function takes a search string and create a regex search string to match a whole word
 * @param {string} string - string to search for
 * @returns {RegExp} regex expression
 */
const getRegexForWord = (string) => {
  const START_WORD_REGEX = '(?<=[\\s,.:;“"\'‘({]|^)';
  const END_WORD_REGEX = '(?=[\\s,.:;“"\'‘!?)}]|$)';
  const search = `${START_WORD_REGEX}${string}${END_WORD_REGEX}`;
  const regex = xre(search, "u");
  return regex;
};

export default getRegexForWord
