module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true,
  },
  extends: ['airbnb-base', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  ignorePatterns: [
    "*.d.ts"
  ],
  plugins: ['@typescript-eslint', 'import'],
  rules: {
    semi: 'error',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],
    'import/extensions': 'off',
    'import/prefer-default-export': 'off',
    'object-curly-newline': 'off',
    'class-methods-use-this': 'off',
    'no-shadow': 'off',
    'no-console': 'off',
    'arrow-body-style': 'off',
    'no-useless-constructor': 'off',
    'import/no-extraneous-dependencies': 'off',
    'no-undef': 'off',
    'object-shorthand': 'off',
    'no-await-in-loop': 'off',
    'consistent-return': 'off',
    'no-restricted-syntax': 'off',
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    'no-underscore-dangle': 'off',
    'import/no-cycle': 'off',
    'import/no-unresolved': 'off',
    'global-require': 'off',
    'import/named': 'off',
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
};
