import React from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import VerseObjects from "./VerseObjects";

export const BookHeaders = ({ headers, showUnsupported, direction }) => {
  const bookHeaders = (
    <VerseObjects verseObjects={headers} showUnsupported={showUnsupported} />
  );
  const bookName = headers.filter((header) => header.tag === "h")[0].content;

  return (
    <div
      dir={direction || "auto"}
      sx={{}}
    >
      <Typography
        variant="h2"
        sx={{}}
      >
        {bookName}
      </Typography>
      {bookHeaders}
    </div>
  );
};

BookHeaders.propTypes = {
  headers: PropTypes.array.isRequired,
  /** render unsupported usfm markers */
  showUnsupported: PropTypes.bool,
  /** override text direction detection */
  direction: PropTypes.string,
};

export default BookHeaders;
