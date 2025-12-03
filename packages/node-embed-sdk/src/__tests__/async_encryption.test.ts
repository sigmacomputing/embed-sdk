import { decrypt, encrypt } from "../promises";

const EMBED_SECRET = "my fake embed secret";

describe("oauth token encryption", () => {
  it("can encrypt and decrypt using a passphrase", async () => {
    const plaintext = "hello, world!";

    // Should be able to encrypt and then immediately decrypt.
    const encryptedToken = await encrypt(EMBED_SECRET, plaintext);
    const decryptedToken = await decrypt(EMBED_SECRET, encryptedToken);
    expect(decryptedToken).toBe(plaintext);
  });
});
