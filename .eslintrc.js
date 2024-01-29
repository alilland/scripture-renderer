module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    "react-app",
    "react-app/jest"
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: "module"
  },
  rules: {
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
    // e.g. "no-unused-vars": "warn"
  }
};
