import React, {
  useCallback,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";
import PropTypes from "prop-types";
import Skeleton from "@mui/material/Skeleton";
import VerseObjects from "./VerseObjects";
import useHandleCopy from "../lib/useHandleCopy";
import ReferenceSelectedContext from "./ReferenceSelectedContext";
import isHebrew from "../lib/isHebrew";

export const Verse = (props) => {
  const {
    verseKey,
    verseObjects,
    paragraphs,
    showUnsupported,
    disableWordPopover,
    direction,
    renderOffscreen,
    reference,
    getLexiconData,
    translate,
  } = props;
  const referenceSelectedContext = useContext(ReferenceSelectedContext);
  const update = referenceSelectedContext?.actions?.update;

  const verseRef = useRef(null);
  useHandleCopy(verseRef.current);

  const width = `${(((Math.random() + 1) / 2) * 100).toFixed(0)}%`;
  const skeleton = (
    <>
      <Skeleton height={6} width={width} />
    </>
  );
  const [verse, setVerse] = useState(skeleton);
  const [viewed, setViewed] = useState(!renderOffscreen);

  useEffect(() => {
    if (viewed) {
      let verseNumber;
      if (!["front", "back"].includes(verseKey)) {
        verseNumber = <sup>{verseKey} </sup>;
      }

      const _verse = (
        <>
          {verseNumber}
          <VerseObjects
            verseObjects={verseObjects}
            verseKey={verseKey}
            paragraphs={paragraphs}
            showUnsupported={showUnsupported}
            disableWordPopover={disableWordPopover}
            getLexiconData={getLexiconData}
            translate={translate}
          />
        </>
      );
      setVerse(_verse);
    }
  }, [verseKey, verseObjects, paragraphs, showUnsupported, disableWordPopover, viewed]);

  const handleClick = useCallback(
    (reference) => {
      const _reference = { ...reference, verse: parseInt(verseKey) };
      if (update) update(_reference);
      /** WARN: ReferenceSelectedContext is not part of useCallback dependencies! */
    },
    [update]
  );

  const verseText = verseObjects
    .map((verseObject) => verseObject.text)
    .join("");
  const hebrew = isHebrew(verseText);
  let _dir = direction || "auto";
  if (hebrew) {
    _dir = "rtl";
  }

  const style =
    _dir === "rtl"
      ? { fontSize: `1.7em`, fontFamily: `EzraSILSRRegular` }
      : { fontSize: `1.2em` };

  //const style = {};
  if (paragraphs) style.display = "inline";

  return (
    <div
      ref={verseRef}
      style={style}
      dir={_dir}
      onClick={() => handleClick(reference)}
      sx={{

      }}
    >
      {verse}
    </div>
  );
};

Verse.propTypes = {
  verseKey: PropTypes.string.isRequired,
  verseObjects: PropTypes.array.isRequired,
  /** render verses paragraphs, use explicit paragraphs */
  paragraphs: PropTypes.bool,
  /** bypass rendering only when visible */
  renderOffscreen: PropTypes.bool,
  /** render unsupported usfm markers */
  showUnsupported: PropTypes.bool,
  /** disable popovers for aligned and original language words */
  disableWordPopover: PropTypes.bool,
  /** override text direction detection */
  direction: PropTypes.string,
  /** reference for verse (bookId, chapter, verse) */
  reference: PropTypes.object,
  /** optional function to lookup lexicon data */
  getLexiconData: PropTypes.func,
  /** optional function for localization */
  translate: PropTypes.func,
};

export default Verse;
