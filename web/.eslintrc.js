module.exports = {
  env: {
    commonjs: true,
    node: true,
    browser: true,
    es6: true,
    jest: true,
  },
  extends: ['eslint:recommended', 'plugin:react/recommended', 'next'],
  globals: {},
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react', 'import', 'react-hooks'],
  ignorePatterns: ['node_modules/'],
  rules: {
    'react/prop-types': 0,
    'react/react-in-jsx-scope': 0,
    'no-undef': 0,
    'no-unsafe-optional-chaining': 0,
  },
  settings: {
    react: {
      version: 'latest', // "detect" automatically picks the version you have installed.
    },
  },
}
