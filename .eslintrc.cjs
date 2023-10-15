// TODO: Add linting rules for JSDocs
module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', '@typescript-eslint', 'prettier'],
  rules: {
    semi: [2, 'never'],
    'no-console': [1, { allow: ['warn', 'error'] }],
    'no-continue': 0,
    'no-plusplus': 0,
    'prefer-destructuring': 0,
    'func-names': 0,

    '@typescript-eslint/consistent-type-definitions': 2,
    '@typescript-eslint/consistent-generic-constructors': [
      2,
      'type-annotation',
    ],
    '@typescript-eslint/explicit-member-accessibility': 2,
    '@typescript-eslint/no-require-imports': 2,

    // Refer to https://typescript-eslint.io/rules/member-ordering/#default-configuration
    '@typescript-eslint/member-ordering': 2,

    // Uses ESLint's camelcase conventions
    // Taken from https://typescript-eslint.io/rules/naming-convention/#enforce-the-codebase-follows-eslints-camelcase-conventions
    camelcase: 0,
    '@typescript-eslint/naming-convention': [
      2,
      {
        selector: 'variable',
        format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
      },
      {
        selector: 'parameter',
        format: ['camelCase'],
        leadingUnderscore: 'allow',
      },

      {
        selector: 'memberLike',
        modifiers: ['private'],
        format: ['camelCase'],
        leadingUnderscore: 'require',
      },

      {
        selector: 'typeLike',
        format: ['PascalCase'],
      },
    ],

    'max-len': [
      2,
      {
        code: 80,
        tabWidth: 2,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreRegExpLiterals: true,
      },
    ],
    'prettier/prettier': 2,

    'react-refresh/only-export-components': [1, { allowConstantExport: true }],
    'jsx-a11y/control-has-associated-label': 0,
    'react/jsx-props-no-spreading': 0,
    'react/jsx-closing-bracket-location': 0,
    'react/destructuring-assignment': 0,
    'react/jsx-one-expression-per-line': 0,
    'react-refresh/only-export-components': [1, { allowConstantExport: true }],
    'react/react-in-jsx-scope': 0,
    'react/jsx-one-expression-per-line': 0,

    '@typescript-eslint/ban-ts-comment': [
      2,
      { 'ts-ignore': 'allow-with-description' },
    ],
  },
}
