import tokenizeQuote from "./tokenizeQuote";

function normalize(str = "", isOrigLang = false) {
  const tokens = tokenizeQuote(str, isOrigLang).join(" ").trim();
  return tokens;
}

export default normalize;
