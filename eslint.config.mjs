import globals from "globals";
import tseslint from "typescript-eslint";
import eslintPluginImport from "eslint-plugin-import";


export default [
  {files: ["**/*.{js,mjs,cjs,ts}"]},
  {languageOptions: { globals: globals.node }},
  ...tseslint.configs.recommended,
  {
    plugins: {
      'import': eslintPluginImport,
    },
    settings: {
      'import/resolver': {
        typescript: {
          project: './tsconfig.json', // Adjust the path if your tsconfig.json is elsewhere
        },
      },
    },
    rules: {
      'indent': ['error', 2],
      'keyword-spacing': ["error", { "after": true }],
      'object-curly-spacing': ['error', 'always'],
      'import/order': [
        'error',
        {
          groups: [
            'builtin',  // Node "builtin" modules
            'external', // "external" modules
            'internal', // "internal" modules
            'parent',   // "parent" modules
            'sibling',  // "sibling" modules
            'index',    // "index" modules
            'object',   // "object" modules
            'type',     // "type" imports
          ],
          'newlines-between': 'always', // enforces a newline between each group
          alphabetize: {
            order: 'asc', // sort in ascending order
            caseInsensitive: true, // ignore case
          },
        },
      ],
    }
  }
];