import reactHooksPlugin from 'eslint-plugin-react-hooks';

/** @type {import("eslint").Linter.Config} */
export default {
  ...reactHooksPlugin.configs.recommended,
  plugins: {
    'react-hooks': reactHooksPlugin,
  },
  settings: {
    react: { version: 'detect' },
  },
};
