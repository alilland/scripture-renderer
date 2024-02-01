const selectionFromWord = (word) => {
  const { content, text, occurrence, occurrences } = word;
  const selectionObject = {
    text: content || text,
    occurrence: parseInt(occurrence),
    occurrences: parseInt(occurrences),
  };
  const selection = JSON.stringify(selectionObject);
  return selection;
};

export default selectionFromWord
