import React from "react";
import PropTypes from "prop-types";
import TextObject from "./TextObject";
import SectionObject from "./SectionObject";
import FootnoteObject from "./FootnoteObject";
import UnsupportedObject from "./UnsupportedObject";

function VerseObject(props) {
  const { verseObject, paragraphs, showUnsupported } = props;
  const { type } = verseObject;
  let component;

  switch (type) {
    case "text":
      component = <TextObject verseObject={verseObject} paragraphs={paragraphs} />;
      break;
    case "section":
      component = <SectionObject verseObject={verseObject} />;
      break;
    case "paragraph":
      component = <div />;
      break;
    case "quote":
      component = <TextObject verseObject={verseObject} />;
      break;
    case 'section':
      component = <SectionObject verseObject={verseObject} />;
      break;
    case "footnote":
      component = <FootnoteObject verseObject={verseObject} />;
      break;
    default:
      if (showUnsupported) {
        component = <UnsupportedObject verseObject={verseObject} />;
      }
      break;
  }

  return (
    <>
      {component}
      {verseObject.nextChar}
    </>
  );
}

VerseObject.propTypes = {
  verseObject: PropTypes.shape({
    tag: PropTypes.string,
    type: PropTypes.string,
    content: PropTypes.string,
    children: PropTypes.arrayOf(PropTypes.object),
    strong: PropTypes.string,
    lemma: PropTypes.string,
    morph: PropTypes.string,
    occurrence: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    occurrences: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  }).isRequired,
  originalWords: PropTypes.array,
  /** render verses paragraphs, use explicit paragraphs */
  paragraphs: PropTypes.bool,
  /** render unsupported usfm markers */
  showUnsupported: PropTypes.bool,
  /** disable popovers for aligned and original language words */
  disableWordPopover: PropTypes.bool,
  /** optional function to lookup lexicon data */
  getLexiconData: PropTypes.func,
  /** optional function for localization */
  translate: PropTypes.func,
};

export default VerseObject;
