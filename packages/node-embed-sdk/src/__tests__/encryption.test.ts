import { decrypt, encrypt } from "../encryption";

const EMBED_SECRET = "my fake embed secret";

describe("oauth token encryption", () => {
  it("can encrypt and decrypt using a passphrase", () => {
    const plaintext = "hello, world!";

    // Should be able to encrypt and then immediately decrypt.
    const encryptedToken = encrypt(EMBED_SECRET, plaintext);
    const decryptedToken = decrypt(EMBED_SECRET, encryptedToken);
    expect(decryptedToken).toBe(plaintext);
  });
});
