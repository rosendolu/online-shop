module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
  },
  extends: ['standard'],
  globals: {
    requirePlugin: 'readonly',
    getRegExp: 'readonly',
    __wxConfig: 'readonly',
    getCurrentPages: false,
    getApp: false,
    Component: false,
    Page: false,
    App: false,
    wx: false,
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    indent: [0],
    'comma-dangle': 0,
    'space-before-function-paren': 0,
    semi: 0,
    camelcase: 0,
    'prefer-promise-reject-errors': 0,
  },
};
