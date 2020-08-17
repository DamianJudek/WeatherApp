module.exports = {
  parser: 'babel-eslint',
  plugins: ['react', 'react-native', 'prettier'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      modules: true,
    },
  },
  globals: {
    fetch: false,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'airbnb-base',
    'plugin:prettier/recommended',
    'prettier/flowtype',
    'prettier/react',
    'prettier/standard',
  ],
  rules: {
    'arrow-body-style': 'warn',
    // 'react-native/no-inline-styles': 0,
    'object-curly-newline': 0,
    // 'react/prop-types': 0,
    'prettier/prettier': 'error',
  },
};
