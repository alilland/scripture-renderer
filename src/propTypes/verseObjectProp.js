import PropTypes from "prop-types";

const verseObjectProp = PropTypes.shape({
  type: PropTypes.string.isRequired,
  text: PropTypes.string,
  tag: PropTypes.string,
  nextChar: PropTypes.string,
  content: PropTypes.string
})

export default verseObjectProp
