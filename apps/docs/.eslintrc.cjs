module.exports = {
  root: true,
  extends: ['@nim-ui/eslint-config/next'],
  ignorePatterns: ['next-env.d.ts'],
  settings: {
    'import/resolver': {
      typescript: {
        project: './tsconfig.json',
      },
    },
  },
  rules: {
    '@next/next/no-html-link-for-pages': 'off',
  },
};
