import { useCallback } from 'react';
import PropTypes from 'prop-types';
import deepFreeze from 'deep-freeze-es6';
import { useDeepCompareEffectNoCheck } from 'use-deep-compare-effect';
import getQuoteMatchesInBookRef from '../lib/getQuoteMatchesInBookRef';
import quoteFromVerse from '../lib/quoteFromVerse';
import isSelected from '../lib/isSelected';
import areSelected from '../lib/areSelected';
import addSelection from '../lib/addSelection';
import addSelections from '../lib/addSelections';
import removeSelection from '../lib/removeSelection';
import removeSelections from '../lib/removeSelections';

function useSelections ({ selections, onSelections, occurrence: currentOccurrenceValue, quote, onQuote, refString, bookObject }) {
  useDeepCompareEffectNoCheck(() => {
    try {
      const _selections = quote && refString && bookObject ? getQuoteMatchesInBookRef({
        quote,
        ref: refString,
        bookObject,
        occurrence: currentOccurrenceValue,
        isOrigLang: true
      }) : [];
      update(_selections)
    } catch (error) {
      console.error(`Selections broken:\n`, error);
    }
  }, [quote, currentOccurrenceValue, bookObject, refString]);

  useDeepCompareEffectNoCheck(() => {
    if (bookObject && onQuote) {
      const _quote = quoteFromVerse({ selections, bookObject });
      onQuote(_quote);
    }
  }, [selections, onQuote, bookObject]);

  const update = useCallback((_selections) => {
    // the "parsify" function is expecting an array of stringified objects
    // it will return an array of the parsed objects
    // const parsify = (array) => array.map(string => JSON.parse(string));
    // However, at present, some of the array elements are objecs,
    // not strings. This causes the parse to fail. At present, it is
    // unknown where the mixed bag of an array is created.
    // So let's deal with it here.
    let _selectionsParsified = new Map();
    _selections.forEach((verseObjectsArray, ref) => {
      const _verseObjectsArray = []
      for (let i = 0; i < verseObjectsArray.length; i++) {
        try {
          let x = JSON.parse(verseObjectsArray[i]);
          _verseObjectsArray.push(x);
        } catch (error) {
          _verseObjectsArray.push(verseObjectsArray[i]);
        }
      }
      _selectionsParsified.set(ref, _verseObjectsArray)
    })
    //const __selections = _selections && deepFreeze(parsify(_selections));
    const __selections = _selections && deepFreeze(_selectionsParsified);
    onSelections(__selections);
  }, [onSelections]);

  const isSelectedBool = (word, ref) => isSelected({ word, selections, ref });

  const areSelectedBool = (words, ref) => areSelected({ words, selections, ref });

  const addSelectionFunc = (word, ref) => {
    let _selections = addSelection({ word, selections, ref });
    update(_selections);
  };

  const addSelectionsFunc = (words, ref) => {
    let _selections = addSelections({ words, selections, ref });
    update(_selections);
  };

  const removeSelectionFunc = (word, ref) => {
    const _selections = removeSelection({ word, selections, ref });
    update(_selections);
  };

  const removeSelectionsFunc = (words, ref) => {
    let _selections = removeSelections({ words, selections, ref });
    update(_selections);
  };

  return {
    state: selections,
    actions: {
      update,
      isSelected: isSelectedBool,
      areSelected: areSelectedBool,
      addSelection: addSelectionFunc,
      addSelections: addSelectionsFunc,
      removeSelection: removeSelectionFunc,
      removeSelections: removeSelectionsFunc,
    },
  };
};

useSelections.propTypes = {
  /** words in a selection */
  selections: PropTypes.instanceOf(Map),
  /** action taken after a selection is made */
  onSelections: PropTypes.func.isRequired,
  /** the quote to be selected */
  quote: PropTypes.string.isRequired,
  /** all chapter-verses where quote may be found - note this is either original language bible or aligned bible */
  bookObject: PropTypes.object,
  /** string chapter-verse reference. i.e. 1:5-6 */
  refString: PropTypes.string,
  /** if quote occurs mulitple times, this is the occurrence of the one selected */
  occurrence: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** action taken when quote is provided */
  onQuote: PropTypes.func,
};

export default useSelections;
