import PropTypes from "prop-types";

const referenceProp = PropTypes.objectOf({
  bookId: PropTypes.string.isRequired,
  chapter: PropTypes.number.isRequired
})

export default referenceProp
