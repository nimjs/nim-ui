import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import importPlugin from 'eslint-plugin-import';
import globals from 'globals';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const compat = new FlatCompat({
  baseDirectory: dirname(fileURLToPath(import.meta.url)),
});

export function createBaseConfig({ tsconfigRootDir = process.cwd() } = {}) {
  return [
    {
      ignores: [
        '**/dist/**',
        '**/.turbo/**',
        '**/coverage/**',
        '**/.next/**',
        '**/out/**',
        '**/node_modules/**',
        '**/*.d.ts',
      ],
    },
    js.configs.recommended,
    ...compat.extends(
      'plugin:@typescript-eslint/recommended',
      'plugin:import/recommended',
      'plugin:import/typescript',
      'prettier',
    ),
    {
      files: ['**/*.{ts,tsx,js,jsx,mjs,cjs}'],
      languageOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        parser: tsParser,
        globals: {
          ...globals.node,
        },
        parserOptions: {
          projectService: true,
          tsconfigRootDir,
        },
      },
      plugins: {
        '@typescript-eslint': tsPlugin,
        import: importPlugin,
      },
      settings: {
        'import/resolver': {
          typescript: {
            project: tsconfigRootDir,
          },
        },
      },
      rules: {
        'import/no-default-export': 'off',
        'import/order': [
          'error',
          {
            'newlines-between': 'always',
            alphabetize: { order: 'asc', caseInsensitive: true },
          },
        ],
        '@typescript-eslint/consistent-type-imports': [
          'error',
          { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
        ],
      },
    },
  ];
}
