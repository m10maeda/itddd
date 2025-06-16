import fs from 'node:fs';

import openapiTS, { astToString } from 'openapi-typescript';

const ast = await openapiTS(
  `${process.env.PROFILES_SERVICE_URL ?? 'http://localhost:3000'}/doc`,
);
const contents = astToString(ast);

if (fs.existsSync('src')) {
  fs.rmSync('src', { recursive: true });
}

fs.mkdirSync('src');
fs.writeFileSync('src/index.d.ts', contents);
