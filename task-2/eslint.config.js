const js = require('@eslint/js');
const typescriptESLint = require('@typescript-eslint/eslint-plugin');
const typescriptESLintParser = require('@typescript-eslint/parser');
const node = require('eslint-plugin-node');
const prettierConfig = require('eslint-config-prettier');
const prettierPlugin = require('eslint-plugin-prettier');
const globals = require('globals');

module.exports = [
  {
    ignores: ['dist', 'node_modules', './*.js'],
  },
  js.configs.recommended,
  {
    files: ['src/**/*.ts'],
    languageOptions: {
      parser: typescriptESLintParser,
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node,
      },
    },
    plugins: {
      '@typescript-eslint': typescriptESLint,
      node: node,
      prettier: prettierPlugin,
    },
    rules: {
      'prettier/prettier': 'error',
      'node/no-missing-import': 'off',
      'no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
  prettierConfig,
];
