import PropTypes from "prop-types";

const verseObjectProp = PropTypes.objectOf({
  type: PropTypes.string.isRequired,
  text: PropTypes.string,
  tag: PropTypes.string,
  nextChar: PropTypes.string
})

export default verseObjectProp
