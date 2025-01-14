const { getDefaultConfig } = require('@expo/metro-config');


const defaultConfig = getDefaultConfig(__dirname);

/**
 * This blocklist is required for @signumjs/crypto to exclude non-used crypto adapters from bundling,
 * thus avoiding compilation errors
 * @type {RegExp[]}
 */
defaultConfig.resolver.blockList = [
    /@signumjs\/crypto\/adapters\/.+$/
];

module.exports = defaultConfig;
