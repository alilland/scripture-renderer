import React from "react";
import PropTypes from "prop-types";
import {
  verseObjectProp,
  referenceProp,
  verseKeyProp
} from "../propTypes";
import styles from './Verse.module.css'

const Verse = ({ verseKey, reference, verseObjects }) => {
  // const [verse, setVerse] = useState("");

  return (
    <div
      // ref={verseRef}
      className={styles.verse}
      // dir={_dir}
      onClick={() => {
        //
      }}
    >
      {'Example Verse'}
    </div>
  );
};

Verse.propTypes = {
  verseKey: verseKeyProp.isRequired,
  reference: referenceProp.isRequired,
  verseObjects: PropTypes.arrayOf(verseObjectProp).isRequired,
};

export default Verse;
