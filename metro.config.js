const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

// eslint-disable-next-line no-undef
const config = getDefaultConfig(__dirname);

// TEMP: @tanstack/react-query v4 resolves to its web build via package exports; remove after migrating to v5
config.resolver.unstable_enablePackageExports = false;

module.exports = withNativeWind(config, { input: './src/styles/global.css' });
