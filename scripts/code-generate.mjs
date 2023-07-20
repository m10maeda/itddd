#!/usr/bin/env zx

/// <reference types="zx/build/globals" />

console.log('Starting code generation...');

const process = $`pnpm run dev --scope=backend`.nothrow().quiet();

try {
  await retry(20, '2s', () =>
    $`curl http://localhost:3333/api-json ${['--silent']}`.quiet(),
  );

  await $`pnpm --filter bff codegen`;
} catch (error) {
  console.error(error);
} finally {
  await process.kill();
}

console.log('🚀 Code generation is complete!');
