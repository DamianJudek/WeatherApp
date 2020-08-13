module.exports = {
  parser: 'babel-eslint',
  plugins: ['react', 'react-native'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      modules: true,
    },
  },
  globals: {
    fetch: false,
  },
  extends: ['eslint:recommended', 'plugin:react/recommended', 'airbnb-base'],
  rules: {
    'arrow-body-style': 'warn',
    'react-native/no-inline-styles': 0,
    'object-curly-newline': 0,
    'react/prop-types': 0,
  },
};
