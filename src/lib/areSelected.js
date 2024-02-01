import doesReferenceContain from './doesReferenceContain';
import normalizeString from './normalizeString';
import selectionFromWord from './selectionFromWord';

const areSelected = ({ words, selections, ref }) => {
  let highlights = [];

  for (let [currentRef, selection] of selections) {
    const containsReference = doesReferenceContain(ref, currentRef);
    if (containsReference) highlights = highlights.concat(selection);
  }

  if (!highlights.length) return false;
  let selected = false;
  const _selections = words.map((word) => selectionFromWord(word));

  _selections.forEach((selection) => {
    //if (selections.includes(_s)) selected = true;
    const _selection = JSON.parse(selection);
    let _text = normalizeString(_selection.text);
    let _occ = _selection.occurrence;

    for (let i = 0; i < highlights.length; i++) {
      const text = normalizeString(highlights[i].text); //already normalized.
      const occ = highlights[i].occurrence;

      if (text === _text && occ === _occ) {
        selected = true;
        break;
      }
    }
  });
  return selected;
};

export default areSelected;
