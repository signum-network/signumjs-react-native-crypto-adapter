const { getDefaultConfig } = require('@expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);
defaultConfig.resolver.blockList = [
    /providers\/.+$/
];

module.exports = defaultConfig;
