import selectionFromWord from './selectionFromWord';

const addSelection = ({ word, selections, ref }) => {
  const newSelections = new Map(selections);
  let _selections = new Set(newSelections.get(ref));
  const selection = selectionFromWord(word);
  _selections.add(selection);
  newSelections.set(ref, [..._selections]);
  return newSelections;
};

export default addSelection
