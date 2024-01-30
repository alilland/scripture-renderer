import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { verseObjectProp } from '../propTypes';

function TextObject ({ verseObject, paragraphs }) {
  const lines = (verseObject.text || verseObject.nextChar || "").split("\n");
  const text = lines.map((line, index) => {
    let _line;
    if (paragraphs && index === lines.length - 1)
      _line = <Fragment key={index}>{line} </Fragment>;
    else if (index === 0) _line = <Fragment key={index}>{line}</Fragment>;
    else
      _line = (
        <Fragment key={index}>{[<br key={Math.random()} />, line]}</Fragment>
      );
    return _line;
  });

  return <>{text}</>;
}

TextObject.propTypes = {
  verseObject: verseObjectProp.isRequired,
  paragraphs: PropTypes.bool
};

export default TextObject;
