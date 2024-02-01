import tokenizer from './tokenizer';

const normalizeString = (string) => {
  const normalized = tokenizer(string).join(' ');
  return normalized;
};

export default normalizeString;
