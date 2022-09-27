module.exports = {
  env: {
    commonjs: true,
    node: true,
    browser: true,
    es6: true,
    jest: true,
  },
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  settings: {
    react: {
      version: 'detect', // "detect" automatically picks the version you have installed.
    },
  },
  extends: ['eslint:recommended', 'plugin:react/recommended', 'next'],
  globals: {},

  plugins: ['react', 'react-hooks', 'simple-import-sort', 'prettier'],

  // plugins: ['react', 'import', 'react-hooks'],
  ignorePatterns: ['node_modules/', 'sketches/'],
  rules: {
    'react/prop-types': 0,
    'react/react-in-jsx-scope': 0,
    'no-undef': 0,
    'no-unsafe-optional-chaining': 0,
  },
}
