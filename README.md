# SignumJS Crypto Adapter for React Native EXPO

This is the React Native Expo implementation of the CryptoAdapter for [@signumjs/crypto](https://signum-network.github.io/signumjs/modules/crypto.html)

> Note: this adapter does only work with Expo - not for bare React Native!

For any Crypto operations, like signing transactions, decrypting P2P messages or even hash related operations
you need to install this adapter.

## Installation

1. Install the package in your Expo Project (see [Example](./demo))

```bash
npm install @signumjs/crypto @signumjs/react-native-expo-crypto-adapter
```

2. Create or modify the Expo Apps `metro.config.js` to remove default providers from bundler

```js
// metro.config.js
const { getDefaultConfig } = require('@expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);
defaultConfig.resolver.blockList = [
    /providers\/.+$/
];

module.exports = defaultConfig;

```

3. Initialize the Crypto Module to use the "native" Expo Crypto Adapter

In your entry point of your application, e.g. `./app/_layout.tsx` you have to add the following code:

```ts

/**
 * The next steps are required to initialize signumjs/crypto module for Expo
 */
import {Crypto} from '@signumjs/crypto'
import {ReactNativeExpoCryptoProvider} from "@signumjs/react-native-expo-crypto-adapter"

Crypto.init(new ReactNativeExpoCryptoProvider());
```

# Example

Find a complete example app [here](./demo/README.md)
