import selectionFromWord from './selectionFromWord';

const addSelections = ({ words, selections, ref }) => {
  const newSelections = new Map(selections);
  const _selections = new Set(newSelections.get(ref));
  words.forEach((word) => {
    const selection = selectionFromWord(word);
    _selections.add(selection);
  });
  newSelections.set(ref, [..._selections]);
  return newSelections;
};

export default addSelections
