import tseslint from 'typescript-eslint';

/** @type {import("eslint").Linter.Config[]} */
export default [
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },

  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,

  {
    rules: {
      // Enforce explicit accessibility modifiers.
      '@typescript-eslint/explicit-member-accessibility': ['error'],

      // Allow empty interface with single extends.
      '@typescript-eslint/no-empty-object-type': [
        'error',
        {
          allowInterfaces: 'with-single-extends',
        },
      ],

      '@typescript-eslint/unified-signatures': [
        'error',
        {
          ignoreDifferentlyNamedParameters: true,
        },
      ],

      // Enforce member ordering.
      '@typescript-eslint/member-ordering': [
        'error',
        {
          default: {
            memberTypes: [
              // Index signature
              // ----------------
              'readonly-signature',
              'call-signature',
              'signature',

              // Static fields
              // ----------------
              'public-static-readonly-field',
              'public-static-field',
              'protected-static-field',
              'protected-static-readonly-field',
              'private-static-field',
              'private-static-readonly-field',
              'static-readonly-field',
              'static-field',

              // Static getters and setters
              // ----------------
              'public-static-get',
              'protected-static-get',
              'private-static-get',
              'static-get',

              [
                'public-static-set',
                'protected-static-set',
                'private-static-set',
              ],
              'static-set',

              // Abstract fields
              // ----------------
              'public-abstract-readonly-field',
              'public-abstract-field',
              'protected-abstract-readonly-field',
              'protected-abstract-field',
              'abstract-readonly-field',
              'abstract-field',

              // Instance fields
              // ----------------
              'public-instance-readonly-field',
              'public-instance-field',
              'protected-instance-readonly-field',
              'protected-instance-field',
              'private-instance-readonly-field',
              'private-instance-field',
              'instance-readonly-field',
              'instance-field',

              // Abstract getters and setters
              // ----------------
              'public-abstract-get',
              'protected-abstract-get',
              'abstract-get',

              ['public-abstract-set', 'protected-abstract-set'],
              'abstract-set',

              // Instance getters and setters
              // ----------------
              'public-instance-get',
              'protected-instance-get',
              'private-instance-get',
              'instance-get',

              // Abstract methods
              // ----------------
              'public-abstract-method',
              'protected-abstract-method',
              'abstract-method',

              // Instance methods
              // ----------------
              'public-instance-method',
              'protected-instance-method',
              'private-instance-method',
              'instance-method',

              // Constructors
              // ----------------
              'public-constructor',
              'protected-constructor',
              'private-constructor',
              'constructor',

              // Static methods
              // ----------------
              'public-static-method',
              'protected-static-method',
              'private-static-method',
              'static-method',
            ],
            order: 'natural-case-insensitive',
          },
          interfaces: {
            memberTypes: ['signature', 'field', 'method', 'constructor'],
            order: 'natural-case-insensitive',
          },
          typeLiterals: {
            memberTypes: ['signature', 'field', 'method', 'constructor'],
            order: 'natural-case-insensitive',
          },
        },
      ],
    },
  },
];
