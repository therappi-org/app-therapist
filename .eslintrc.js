module.exports = {
  extends: [
    'universe/native',
    'universe/shared/typescript-analysis',
    'plugin:react-hooks/recommended',
    'plugin:@tanstack/eslint-plugin-query/recommended',
  ],
  settings: {
    'import/ignore': [
      // kept from eslint-config-universe, since this list replaces it
      'node_modules[\\\\/]+@?react-native',
      // expo-splash-screen's build output puts `export` after a comment on the same line,
      // which eslint-plugin-import's ESM detection misses (reports "No exported names")
      'node_modules[\\\\/]+expo-splash-screen',
    ],
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.d.ts'],
      parserOptions: {
        project: './tsconfig.json',
      },
    },
  ],
};
