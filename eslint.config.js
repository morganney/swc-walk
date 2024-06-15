import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import nodePlugin from 'eslint-plugin-n'

export default tseslint.config(
  eslint.configs.recommended,
  nodePlugin.configs['flat/recommended'],
  ...tseslint.configs.strictTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    rules: {
      'no-console': 'error',
      '@typescript-eslint/no-use-before-define': 'error',
      '@typescript-eslint/no-duplicate-type-constituents': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
        },
      ],
      'padding-line-between-statements': [
        'error',
        {
          blankLine: 'always',
          prev: '*',
          next: 'return',
        },
        {
          blankLine: 'always',
          prev: '*',
          next: ['do', 'for', 'if', 'try', 'switch', 'while'],
        },
        {
          blankLine: 'always',
          prev: ['do', 'for', 'if', 'try', 'switch', 'while'],
          next: '*',
        },
        {
          blankLine: 'always',
          prev: ['let', 'const'],
          next: '*',
        },
        {
          blankLine: 'never',
          prev: ['let', 'const'],
          next: ['let', 'const'],
        },
        {
          blankLine: 'any',
          prev: 'cjs-import',
          next: ['cjs-import', '*'],
        },
      ],
    },
  },
  {
    files: ['test/*'],
    rules: {
      '@typescript-eslint/no-floating-promises': 'off',
    },
  },
  {
    ignores: ['dist', 'coverage', 'eslint.config.js'],
  },
)
