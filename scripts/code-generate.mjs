#!/usr/bin/env zx

/// <reference types="zx/build/globals" />

console.log('Starting code generation...');

const backendProcess = $`pnpm run dev --scope=backend`.nothrow().quiet();

try {
  await retry(20, '2s', () =>
    $`curl http://localhost:3333/api-json ${['--silent']}`.quiet(),
  );

  await $`pnpm --filter bff codegen`;
} catch (error) {
  console.error(error);
} finally {
  await backendProcess.kill();
}

const bffProcess = $`pnpm run dev --scope=bff`.nothrow().quiet();

try {
  await retry(20, '2s', () =>
    $`curl http://localhost:3334/graphql ${['--silent']}`.quiet(),
  );

  await $`pnpm --filter web codegen`;
} catch (error) {
  console.error(error);
} finally {
  await bffProcess.kill();
}

console.log('🚀 Code generation is complete!');
