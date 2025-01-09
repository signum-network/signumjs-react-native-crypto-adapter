import {describe, it, expect, test, beforeAll} from 'vitest';

import {Crypto, sha256AsBase64, sha256AsHex} from "@signumjs/crypto";
import {ReactNativeCryptoProvider} from "../ReactNativeCryptoProvider";

describe('sha256', () => {
    beforeAll(() => {
        Crypto.getInstance().setCustomProvider(new ReactNativeCryptoProvider())
    })
    // implicitely tests sha256Raw and sha256Byte
    test('Should be able to generate sha256AsHex', () => {
        const hash = sha256AsHex('Some Text');
        expect(hash).toEqual('a7fd4c665fbf6375d99046ef9c525e8578feb7a4794d119447282db151c12cae');
    });
    test('Should be able to generate sha256AsBase64', () => {
        const hash = sha256AsBase64('Some Text');
        expect(hash).toEqual('p/1MZl+/Y3XZkEbvnFJehXj+t6R5TRGURygtsVHBLK4=');
    });
});
