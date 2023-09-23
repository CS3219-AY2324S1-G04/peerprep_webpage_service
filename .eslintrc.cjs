module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    "prettier"
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', '@typescript-eslint', 'prettier'],
  rules: {
    semi: ['error', 'never'],
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'no-continue': 'off',
    'no-plusplus': 'off',
    'prefer-destructuring': 'off',
    'func-names': 'off',

    "@typescript-eslint/consistent-type-definitions": 2,
    "@typescript-eslint/consistent-generic-constructors": [
      2,
      "type-annotation"
    ],
    "@typescript-eslint/explicit-member-accessibility": 2,
    "@typescript-eslint/no-require-imports": 2,

    // Refer to https://typescript-eslint.io/rules/member-ordering/#default-configuration
    "@typescript-eslint/member-ordering": 2,

    // Uses ESLint's camelcase conventions
    // Taken from https://typescript-eslint.io/rules/naming-convention/#enforce-the-codebase-follows-eslints-camelcase-conventions
    "camelcase": 0,
    "@typescript-eslint/naming-convention": [
      2,
      {
        "selector": "default",
        "format": ["PascalCase", "camelCase"]
      },

      {
        "selector": "variable",
        "format": ["camelCase", "UPPER_CASE", "PascalCase"]
      },
      {
        "selector": "parameter",
        "format": ["camelCase"],
        "leadingUnderscore": "allow"
      },

      {
        "selector": "memberLike",
        "modifiers": ["private"],
        "format": ["camelCase"],
        "leadingUnderscore": "require"
      },

      {
        "selector": "typeLike",
        "format": ["PascalCase"]
      }
    ],

    "max-len": [
      2,
      {
        "code": 80,
        "tabWidth": 2,
        "ignoreUrls": true,
        "ignoreStrings": true,
        "ignoreRegExpLiterals": true
      }
    ],
    "prettier/prettier": ["error", { "semi": false }],

    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    "jsx-a11y/control-has-associated-label": 0,
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-closing-bracket-location': 'off',
    'react/destructuring-assignment': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'react/react-in-jsx-scope': 0,
    'react/jsx-one-expression-per-line': 'off',

    '@typescript-eslint/ban-ts-comment': [
      'error',
      {'ts-ignore': 'allow-with-description'},
    ],
  },
}
