const quoteFromVerse = ({ selections, bookObject }) => {
  let quotedWords = [];
  const _selections = Array.from(selections, ([ref, refSelections]) => {
    return refSelections.map((selection) => {
      return selection?.text
    })
  }).flat(1)

  Object.values(bookObject).forEach((chapter) => {
    Object.values(chapter).forEach((verse) => {
      const _verseObjects = verse.verseObjects.flat(1);
      _verseObjects.forEach((verseObject, index) => {
        const { type, text } = verseObject;
        if (type === 'word') {
          const match = _selections.includes(text);
          const quotedWord = match ? text : '&';
          quotedWords.push(quotedWord);
        }
      });
    })
  })
  const quote = quotedWords
    .join(' ')
    .replace(/( ?… ?)+/g, ' & ')
    .replace(/(^[… ]+|[… ]+…)/g, '')
    .replace(/( ?& ?)+/g, " & ")
    .replace(/(^[& ]+|[& ]+$)/g, '');
  return quote;
};

export default quoteFromVerse;
