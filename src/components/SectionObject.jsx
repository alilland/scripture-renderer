import React from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";

function SectionObject({ verseObject }) {
  return (
    <Typography variant="h4" gutterBottom>
      {verseObject.content}
    </Typography>
  );
}

SectionObject.propTypes = {
  verseObject: PropTypes.shape({
    tag: PropTypes.string,
    type: PropTypes.string,
    content: PropTypes.string,
  }).isRequired,
};

export default SectionObject;
