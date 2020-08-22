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
    'object-curly-newline': 0,
    'prettier/prettier': 'error',
  },
};
