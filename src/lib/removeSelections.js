import selectionFromWord from './selectionFromWord';

const removeSelections = ({ words, selections, ref }) => {
  const newSelections = new Map(selections);
  const selectionsArray = newSelections.get(ref);
  const selectionStringified = selectionsArray.map((selection) =>
    selectionFromWord(selection)
  );
  const _selections = new Set(selectionStringified);

  words.forEach((word) => {
    const selection = selectionFromWord(word);
    _selections.delete(selection);
  });
  newSelections.set(ref, [..._selections]);
  return newSelections;
};

export default removeSelections
