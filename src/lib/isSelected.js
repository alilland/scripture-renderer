import selectionFromWord from './selectionFromWord';

const isSelected = ({ word, selections, ref }) => {
  const selection = selectionFromWord(word);
  const selected = selections.get(ref).includes(selection);
  return selected;
};

export default isSelected;
