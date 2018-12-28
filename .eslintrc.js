module.exports = {
  extends: 'standard',
  env: {
    browser: true,
    es6: true,
  },
  plugins: ['react'],
  globals: {
    graphql: false,
    tw: true,
  },
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true,
    },
  },
  rules: {
    'spaced-comment': 0,
    'padded-blocks': 0,
    'comma-dangle': 0,
    'space-before-function-paren': 0,
    'no-multiple-empty-lines': 0,
  }
}


// {
//   "extends": "standard",
//   "rules": {
//       "brace-style": ["error", "stroustrup"]
//   },
//   "env": {
//       "mocha": true
//   }
// }