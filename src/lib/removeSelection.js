import selectionFromWord from './selectionFromWord';

const removeSelection = ({ word, selections, ref }) => {
  const newSelections = new Map(selections);
  const selectionsArray = newSelections.get(ref);
  const selection = selectionFromWord(word);
  const selectionStringified = selectionsArray.map((_selection) =>
    selectionFromWord(_selection)
  );
  const _selections = new Set(selectionStringified);
  _selections.delete(selection);
  newSelections.set(ref, [..._selections]);
  return newSelections;
};

export default removeSelection
