import { FlatCompat } from '@eslint/eslintrc';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import { createReactLibraryConfig } from './react-library.js';

const compat = new FlatCompat({
  baseDirectory: dirname(fileURLToPath(import.meta.url)),
});

export function createNextConfig({ tsconfigRootDir = process.cwd() } = {}) {
  return [
    ...createReactLibraryConfig({ tsconfigRootDir }),
    ...compat.extends('next/core-web-vitals', 'next/typescript'),
  ];
}
