import type { CodegenConfig } from '@graphql-codegen/cli';

export default {
  overwrite: true,
  schema: 'http://localhost:3334/graphql',
  documents: './src/**/*.{ts,tsx}',
  ignoreNoDocuments: true,
  generates: {
    './src/lib/api-client/__generated__/': {
      preset: 'client',
      config: {
        strictScalars: true,
        useTypeImports: true,
        skipTypename: true,
        arrayInputCoercion: true,
        avoidOptionals: {
          field: true,
          inputValue: false,
          object: true,
          defaultValue: false,
        },
        enumsAsTypes: true,
      },
    },
  },
  hooks: {
    afterAllFileWrite: ['prettier --write'],
  },
} satisfies CodegenConfig;
