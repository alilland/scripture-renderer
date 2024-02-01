import selectionsFromQuoteAndVerseObjects from './selectionsFromQuoteAndVerseObjects';

const selectionsFromQuote = ({ quote, verseObjectsMap, occurrence }) => {
  let selections = new Map();

  if (quote && verseObjectsMap && occurrence) {
    selectionsFromQuoteAndVerseObjects({
      quote,
      verseObjectsMap,
      occurrence,
    }).forEach((verseObjects, ref) => {
      const newVerseObjects = verseObjects.map((selection) => JSON.stringify(selection));
      selections.set(ref, newVerseObjects)
    })
  }
  return selections;
};

export default selectionsFromQuote;
