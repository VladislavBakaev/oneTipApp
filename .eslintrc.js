module.exports = {
    env: {
      es6: true,
      node: true,
      jest: true,
    },
    extends: [
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:react-hooks/recommended',
      'plugin:@typescript-eslint/eslint-recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:@typescript-eslint/recommended-requiring-type-checking',
      'plugin:react/jsx-runtime',
      'plugin:react-hooks/recommended',
    ],
    parserOptions: {
      project: './tsconfig.json',
    },
    plugins: ['react', 'react-hooks', '@typescript-eslint'],
    rules: {
          "array-element-newline": ["error", {
            "ArrayExpression": "consistent",
            "ArrayPattern": { "minItems": 3 },
        }],
        "object-curly-newline": ["error", {
            "ObjectExpression": { "multiline": true, "minProperties": 3 },
            "ObjectPattern": { "multiline": true },
            "ImportDeclaration": { "multiline": true, "minProperties": 3 },
            "ExportDeclaration": { "multiline": true, "minProperties": 3 }
          }],
        "object-curly-spacing": ["error", "always"],
        indent: ['error', 2, { SwitchCase: 1 }],
        quotes: ['error', 'single', { avoidEscape: true }],
        'no-empty-function': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        'react/display-name': 'off',
        'react/prop-types': 'off',
        "@typescript-eslint/no-floating-promises": "off",
        "arrow-body-style": ["error", "as-needed"],
        "react/self-closing-comp": ["error", { "component": true, "html": true }],
        "max-len": ["error", { "code": 100, "ignoreStrings": true }]
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  };