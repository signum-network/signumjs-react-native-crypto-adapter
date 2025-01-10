import {CryptoProvider} from '@signumjs/crypto';
import aesJs from 'aes-js';
import {getRandomBytes} from "expo-crypto"
import {sha256} from "js-sha256"

export class ReactNativeExpoCryptoProvider implements CryptoProvider {
    async encryptAes256Cbc(plaintext: Uint8Array, key: Uint8Array): Promise<Uint8Array> {
        const iv = this.getRandomValues(new Uint8Array(16));
        const aesCbc = new aesJs.ModeOfOperation.cbc(key, iv);

        // Pad the plaintext (AES requires 16 byte blocks)
        const padded = this.pkcs7Pad(plaintext);

        // Encrypt
        const encrypted = aesCbc.encrypt(padded);

        // Combine IV + ciphertext
        const result = new Uint8Array(iv.length + encrypted.length);
        result.set(iv);
        result.set(encrypted, iv.length);

        return result;
    }

    async decryptAes256Cbc(ciphertext: Uint8Array, key: Uint8Array): Promise<Uint8Array> {
        // Extract IV (first 16 bytes)
        const iv = ciphertext.slice(0, 16);
        const encrypted = ciphertext.slice(16);

        // Create CBC mode instance
        const aesCbc = new aesJs.ModeOfOperation.cbc(key, iv);

        // Decrypt
        const decrypted = aesCbc.decrypt(encrypted);

        // Remove padding
        return this.pkcs7Unpad(decrypted);
    }

    sha256(data: ArrayBuffer): Uint8Array {
        const hasher = sha256.update(data)
        return new Uint8Array(hasher.arrayBuffer());
    }

    getRandomValues(array: Uint8Array): Uint8Array {
        array.set(getRandomBytes(array.length))
        return array;
    }


    private pkcs7Pad(data: Uint8Array): Uint8Array {
        const padder = 16 - (data.length % 16);
        const result = new Uint8Array(data.length + padder);
        result.set(data);
        for (let i = data.length; i < result.length; i++) {
            result[i] = padder;
        }
        return result;
    }

    private pkcs7Unpad(data: Uint8Array): Uint8Array {
        const padLength = data[data.length - 1];
        return data.slice(0, data.length - padLength);
    }
}
