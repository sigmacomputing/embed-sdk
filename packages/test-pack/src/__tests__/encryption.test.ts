import {
  decrypt,
  encrypt,
  encryptAsync,
  decryptAsync,
} from "@sigmacomputing/node-embed-sdk";

import {
  encrypt as encryptAsync2,
  decrypt as decryptAsync2,
} from "@sigmacomputing/node-embed-sdk/promises";

const EMBED_SECRET = "my fake embed secret";

describe("oauth token encryption", () => {
  it("can encrypt and decrypt using a passphrase", () => {
    const plaintext = "hello, world!";

    // Should be able to encrypt and then immediately decrypt.
    const encryptedToken = encrypt(EMBED_SECRET, plaintext);
    const decryptedToken = decrypt(EMBED_SECRET, encryptedToken);
    expect(decryptedToken).toBe(plaintext);
  });

  it("can encrypt and decrypt using a passphrase (async)", async () => {
    const plaintext = "hello, world!";

    // Should be able to encrypt and then immediately decrypt.
    const encryptedToken = await encryptAsync(EMBED_SECRET, plaintext);
    const decryptedToken = await decryptAsync(EMBED_SECRET, encryptedToken);
    expect(decryptedToken).toBe(plaintext);
  });

  it("can encrypt and decrypt using a passphrase (promises import)", async () => {
    const plaintext = "hello, world!";

    // Should be able to encrypt and then immediately decrypt.
    const encryptedToken = await encryptAsync2(EMBED_SECRET, plaintext);
    const decryptedToken = await decryptAsync2(EMBED_SECRET, encryptedToken);
    expect(decryptedToken).toBe(plaintext);
  });
});
