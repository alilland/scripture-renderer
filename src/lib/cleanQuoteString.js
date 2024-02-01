import QUOTE_ELLIPSIS from "../constants/QUOTE_ELLIPSIS";

function cleanQuoteString(quote) {
  return (
    quote
      // replace smart closing quotation mark with correct one
      .replace(/”/gi, '"')
      // remove space before smart opening quotation mark
      .replace(/“ /gi, '"')
      // replace smart opening quotation mark with correct one
      .replace(/“/gi, '"')
      // add space after
      .replace(/,"/gi, ', "')
      // remove space after opening quotation mark
      .replace(/, " /gi, ', "')
      // remove spaces before question marks
      .replace(/\s+([?])/gi, "$1")
      // remove double spaces
      .replace(/ {2}/gi, " ")
      // remove spaces before commas
      .replace(/ , /gi, ", ")
      // remove spaces before periods
      .replace(/ ."/gi, '."')
      // remove space before apostrophes
      .replace(/ ’./gi, "’.")
      .trim()
      .replace(/ *\... */g, ` ${QUOTE_ELLIPSIS} `)
      .replace(/ *… */gi, ` ${QUOTE_ELLIPSIS} `)
      .replaceAll(/\\n|\\r/g, "")
  );
}

export default cleanQuoteString;
