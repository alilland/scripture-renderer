import React from 'react';
import { verseObjectProp } from '../propTypes';

export const WordObject = ({ verseObject }) => {
  return <>{verseObject.text || verseObject.content}</>;
};

WordObject.propTypes = {
  verseObject: verseObjectProp.isRequired,
};

export default WordObject;
