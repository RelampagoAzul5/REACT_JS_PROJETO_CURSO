import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";


export default [
  { files: ["**/*.{js,mjs,cjs,jsx}"] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    rules: {
      'no-unused-vars': 'warn',
      'dot-notation': 'warn',
      'no-undef': 'off',
      'camelcase': 'off',
      'consistent-return': 'warn',
      'semi': 'warn',
      'no-irregular-whitespace': 'warn',
      'space-in-parens': 'warn',
      'indent': 'error',
      'no-mixed-spaces-and-tabs': 'error',
      'quotes': ['error', 'single'],
      'no-trailing-spaces': 'error'
    }
  }
];