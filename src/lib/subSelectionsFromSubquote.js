import generateSelection from './generateSelection';

const subSelectionsFromSubquote = ({
  subquote,
  precedingText: _precedingText,
  string,
}) => {
  //Splitting by tokenization here causes issues because we are still
  //comparing those characters at this level
  const selectedTokens = subquote.split(' ');
  const subSelections = [];
  selectedTokens.forEach((_selectedText) => {
    //Adding the preceding text from the subSelections to ensure that
    //Repeated words are accounted for
    const precedingTextInSubselections = subSelections
      .map(({ text }) => text)
      .join(' ');
    let subSelection = generateSelection({
      selectedText: _selectedText,
      precedingText: _precedingText + precedingTextInSubselections,
      entireText: string,
      subSelections,
    });

    subSelections.push(subSelection);
  });
  return subSelections;
};

export default subSelectionsFromSubquote
