import type { CodegenConfig } from '@graphql-codegen/cli';
import type { TypeScriptDocumentsPluginConfig } from '@graphql-codegen/typescript-operations';

const operationConfig: TypeScriptDocumentsPluginConfig = {};

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
    './src/': {
      preset: 'near-operation-file',
      presetConfig: {
        folder: '__generated__',
        extension: '.msw.ts',
        baseTypesPath: './lib/api-client/__generated__/graphql.ts',
        importTypesNamespace: 'Types',
      },
      plugins: [
        {
          'typescript-operations': {
            ...operationConfig,
            nonOptionalTypename: true,
            skipTypeNameForRoot: true,
          } satisfies TypeScriptDocumentsPluginConfig,
        },
        'typescript-msw',
      ],
    },
  },
  hooks: {
    afterAllFileWrite: ['prettier --write'],
  },
} satisfies CodegenConfig;
