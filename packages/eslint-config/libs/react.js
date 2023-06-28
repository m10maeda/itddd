/** @type {import('eslint/lib/shared/types').ConfigData} */
module.exports = {
  rules: {
    // Unnecessary import react.
    'react/react-in-jsx-scope': 'off',

    // Extend to indicate `Image` component from Next.js.
    'jsx-a11y/alt-text': [
      'error',
      {
        elements: ['img', 'object', 'area', 'input[type="image"]'],
        img: ['Image'],
        object: [],
        area: [],
        'input[type="image"]': [],
      },
    ],

    // Allow using either the label has htmlFor or a nested label.
    'jsx-a11y/label-has-associated-control': [
      'error',
      {
        assert: 'either',
      },
    ],
  },
};
