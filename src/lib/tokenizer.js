import { tokenize, tokenizeOrigLang } from 'string-punctuation-tokenizer';

function tokenizer(quote, isOrigLang = false) {
  if (isOrigLang) {
    return tokenizeOrigLang({
      text: quote,
      includePunctuation: false,
      normalize: true,
    });
  } else {
    return tokenize({
      text: quote,
      includePunctuation: false,
      normalize: true,
    });
  }
}

export default tokenizer;
