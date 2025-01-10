import {vi} from "vitest";
import {randomBytes} from "crypto"

vi.mock("expo-crypto", () => ({
        getRandomBytes: (length: number): Uint8Array => {
            return new Uint8Array(randomBytes(length));
        }
    })
)
