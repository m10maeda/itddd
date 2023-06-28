/** @type {import('eslint/lib/shared/types').ConfigData} */
module.exports = {
  rules: {
    // Enforce explicit accessibility modifiers.
    '@typescript-eslint/explicit-member-accessibility': ['error'],

    // Allow empty interface. For example, when the extended interface
    // without own methods.
    '@typescript-eslint/no-empty-interface': [
      'error',
      {
        allowSingleExtends: true,
      },
    ],

    '@typescript-eslint/consistent-type-definitions': 'off',

    // Enforce member ordering.
    '@typescript-eslint/member-ordering': [
      'error',
      {
        default: [
          // Index signature
          'signature',

          // Public members
          // --------

          // Fields, getters and setters
          'public-abstract-field',
          'public-abstract-get',
          'public-abstract-set',
          ['public-decorated-field', 'public-instance-field'],
          ['public-decorated-get', 'public-instance-get'],
          ['public-decorated-set', 'public-instance-set'],

          // Methods
          'public-abstract-method',
          ['public-decorated-method', 'public-instance-method'],

          // Constructors
          'public-constructor',

          // Protected and private members
          // --------

          // Fields, getters and setters
          'protected-abstract-field',
          'protected-abstract-get',
          'protected-abstract-set',

          [
            'protected-decorated-field',
            'private-decorated-field',
            'protected-instance-field',
            'private-instance-field',
          ],

          [
            'protected-decorated-get',
            'private-decorated-get',
            'protected-instance-get',
            'private-instance-get',
          ],

          [
            'protected-decorated-set',
            'private-decorated-set',
            'protected-instance-set',
            'private-instance-set',
          ],

          // Methods
          'protected-abstract-method',
          [
            'protected-decorated-method',
            'private-decorated-method',
            'protected-instance-method',
            'private-instance-method',
          ],

          // Constructors
          'protected-constructor',
          'private-constructor',

          // Static members
          // --------
          'public-static-field',
          'public-static-get',
          'public-static-set',
          'public-static-method',

          ['protected-static-field', 'private-static-field'],
          ['protected-static-get', 'private-static-get'],
          ['protected-static-set', 'private-static-set'],
          ['protected-static-method', 'private-static-method'],
        ],
        interfaces: ['signature', 'field', 'method', 'constructor'],
        typeLiterals: ['signature', 'field', 'method', 'constructor'],
      },
    ],
  },
};
