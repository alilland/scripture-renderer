import tokenizer from "./tokenizer";
import cleanQuoteString from "./cleanQuoteString";

function tokenizeQuote(quote, isOrigLang = true) {
  const cleanQuote = cleanQuoteString(quote);
  const quotesArray = cleanQuote
    .split(/\s?&\s?/)
    .flatMap((partialQuote) => tokenizer(partialQuote, isOrigLang).concat("&"))
    .slice(0, -1);
  return quotesArray;
}

export default tokenizeQuote;
