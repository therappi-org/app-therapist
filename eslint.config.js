const { defineConfig } = require('eslint/config');
const universeNative = require('eslint-config-universe/flat/native');

module.exports = defineConfig([
  universeNative,
  {
    rules: {
      // React Compiler rules flag callbacks passed to hooks (e.g. onSuccess) as if they ran during render
      'react-hooks/purity': 'warn',
      'react-hooks/refs': 'warn',
    },
  },
]);
