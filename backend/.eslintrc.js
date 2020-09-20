module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: [
    'react-app',
  ],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    "semi": ["error", "always"],
    "comma-dangle": ["error", "always-multiline"],

  },
};
