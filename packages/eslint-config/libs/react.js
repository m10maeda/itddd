import reactPlugin from 'eslint-plugin-react';
import globals from 'globals';

/** @type {import("eslint").Linter.Config} */
export default {
  ...reactPlugin.configs.flat.recommended,
  languageOptions: {
    ...reactPlugin.configs.flat.recommended.languageOptions,
    globals: {
      ...globals.serviceworker,
      ...globals.browser,
    },
  },
  rules: {
    ...reactPlugin.configs.flat.recommended.rules,

    // React scope no longer necessary with new JSX transform.
    'react/react-in-jsx-scope': 'off',
  },
};
