import XRegExp from "xregexp";
import tokenizeQuote from "./tokenizeQuote";
import setBook from "./setBook";
import verseObjectsToString from "./verseObjectsToString";
import normalize from "./normalize";
import refToString from "./refToString";
import QUOTE_ELLIPSIS from "../constants/QUOTE_ELLIPSIS";

function getQuoteMatchesInBookRef({
  quote,
  ref,
  bookObject,
  isOrigLang,
  occurrence = -1,
}) {
  if (occurrence === 0) return new Map();
  const DATA_SEPARATOR = "|";
  const OPEN_CHAR = "{";
  const CLOSE_CHAR = "}";
  const REF_PATTERN = "\\d+:\\d+";
  const OCCURRENCE_PATTERN = "\\d+";
  const enclose = (word) => OPEN_CHAR + word + CLOSE_CHAR;

  const joinWordData = (word, refObject, occurrence) => {
    const { chapter, verse } = refObject;
    const ref = `${chapter}:${verse}`;
    const data = enclose(`${ref}${DATA_SEPARATOR}${occurrence}`);
    return `${word}${data}`;
  };

  const splitWordData = (word) => {
    const [_word, data] = word.split(OPEN_CHAR);
    const [ref, occurrence] = data.slice(0, -1).split(DATA_SEPARATOR);
    const [chapter, verse] = ref.split(":");
    return {
      text: _word,
      chapter: parseInt(chapter),
      verse: parseInt(verse),
      occurrence: parseInt(occurrence),
    };
  };

  const quoteTokens = tokenizeQuote(quote, isOrigLang);

  const book = setBook(bookObject, ref);
  let sourceArray = [];
  book.forEachVerse((verseObjects, verseRef) => {
    const tokensMap = quoteTokens.reduce((tokensMap, word) => {
      tokensMap.set(normalize(word, true), { count: 0 });
      return tokensMap;
    }, new Map());

    sourceArray.push(
      verseObjectsToString(verseObjects, (word) => {
        const _word = normalize(word, true);
        const quote = tokensMap.get(_word);
        if (!quote) return !_word ? " " : _word;
        quote.count++;
        return joinWordData(_word, verseRef, quote.count);
      })
    );
  });
  const sourceString = sourceArray.join("\n");

  const searchPatterns = quoteTokens.reduce((patterns, token, index) => {
    if (token === QUOTE_ELLIPSIS) return patterns;
    const push =
      (patterns.length === 0) | (quoteTokens[index - 1] === QUOTE_ELLIPSIS);
    const AFTER =
      quoteTokens[index + 1] && quoteTokens[index + 1] === QUOTE_ELLIPSIS
        ? ""
        : `\\s?`;
    const escaped = XRegExp.escape(normalize(token, true));
    const regexp = XRegExp(
      `(${escaped}${enclose(
        `${REF_PATTERN}${XRegExp.escape("|")}${OCCURRENCE_PATTERN}`
      )})${AFTER}`
    );

    if (push) {
      patterns.push(regexp);
      return patterns;
    }

    const current = patterns.length - 1;
    patterns[current] = XRegExp.union([patterns[current], regexp], "g", {
      conjunction: "none",
    });
    return patterns;
  }, []);

  const searchQuotes = (source, patterns) => {
    let keepSearching = true;
    let matches = [];
    let limit = 100;
    let iteration = 0;
    let index = 0;
    while (keepSearching) {
      const currentMatches = patterns.reduce(
        // eslint-disable-next-line no-loop-func
        (currentMatches, regexp, i, matches) => {
          const match = XRegExp.exec(source, regexp, index);
          if (match) {
            index = match.index + match[0].length;
            return currentMatches.concat(match.slice(1));
          }
          keepSearching = false;
          matches.length = 0;
          return [];
        },
        []
      );
      if (currentMatches.length) matches.push(currentMatches);
      if (iteration === limit) {
        keepSearching = false;
        console.log("limit reached");
      }
      iteration++;
    }
    return matches;
  };

  const matches = searchQuotes(sourceString, searchPatterns);

  const foundOccurrences = matches.reduce((occurrences, words, key) => {
    const currentOccurence = key + 1;
    if (occurrence !== -1 && currentOccurence !== occurrence)
      return occurrences;
    words.forEach((_word) => {
      const { chapter, verse, ...wordObject } = splitWordData(_word);
      const refString = refToString({ chapter, verse });
      const currentWordsInRef = occurrences.get(refString);
      if (currentWordsInRef) currentWordsInRef.push(wordObject);
      else occurrences.set(refString, [wordObject]);
    });
    return occurrences;
  }, new Map());
  return foundOccurrences;
}

export default getQuoteMatchesInBookRef
