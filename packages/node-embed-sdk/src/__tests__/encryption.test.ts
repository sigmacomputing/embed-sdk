import { decrypt, encrypt } from "../index";
import { _testExports } from "../encryption";

const EMBED_SECRET = "my fake embed secret";

describe("oauth token encryption", () => {
  it("can encrypt and decrypt using a passphrase", () => {
    const plaintext = "hello, world!";

    // Should be able to encrypt and then immediately decrypt.
    const encryptedToken = encrypt(EMBED_SECRET, plaintext);
    const decryptedToken = decrypt(EMBED_SECRET, encryptedToken);
    expect(decryptedToken).toBe(plaintext);
  });

  function toEncodedString(
    salt: string,
    iv: string,
    tag: string,
    ciphertext: string,
  ): string {
    return `${salt}.${iv}.${tag}.${ciphertext}`;
  }

  it("only throws error when reading an incorrectly encoded string", () => {
    // Throws for invalid format.
    expect(() => {
      _testExports.asEncodedPassphraseEncryptionOutput("hello, world!");
    }).toThrow();

    // Throws for valid format, but with non-base64 components.
    expect(() => {
      _testExports.asEncodedPassphraseEncryptionOutput(
        toEncodedString("(salt)", "(iv)", "(tag)", "(ciphertext)"),
      );
    }).toThrow();

    // Throws for valid format with base64 components of invalid length.
    expect(() => {
      _testExports.asEncodedPassphraseEncryptionOutput(
        toEncodedString("YQ==", "Yg==", "Yw==", "ZA=="),
      );
    }).toThrow();

    // Does not throw for valid format with base64 components of valid length.
    const salt = Buffer.from(
      "s".repeat(
        _testExports.PBKDF2_HMAC_SHA256_KEY_DERIVATION.SALT_LENGTH_BYTES,
      ),
    ).toString("base64");
    const iv = Buffer.from(
      "i".repeat(_testExports.AES_256_GCM_ENCRYPTION.IV_LENGTH_BYTES),
    ).toString("base64");
    const tag = Buffer.from(
      "t".repeat(_testExports.AES_256_GCM_ENCRYPTION.TAG_LENGTH_BYTES),
    ).toString("base64");
    const ciphertext = Buffer.from(
      "c".repeat(10 /* arbitrary length */),
    ).toString("base64");
    expect(() => {
      _testExports.asEncodedPassphraseEncryptionOutput(
        toEncodedString(salt, iv, tag, ciphertext),
      );
    }).not.toThrow();
  });
});
